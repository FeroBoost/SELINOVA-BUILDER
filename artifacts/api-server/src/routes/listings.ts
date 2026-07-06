import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  listingsTable,
  categoriesTable,
  subcategoriesTable,
} from "@workspace/db";
import { eq, and, ilike, gte, lte, desc, asc, sql, count } from "drizzle-orm";
import {
  GetListingsQueryParams,
  CreateListingBody,
  UpdateListingBody,
  GetListingParams,
  UpdateListingParams,
  DeleteListingParams,
  GetFeaturedListingsQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

// Helper: join category/subcategory names onto a listing row
async function enrichListing(listing: typeof listingsTable.$inferSelect) {
  const [cat] = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.slug, listing.categorySlug));
  const [sub] = await db
    .select()
    .from(subcategoriesTable)
    .where(eq(subcategoriesTable.slug, listing.subcategorySlug));
  return {
    ...listing,
    price: Number(listing.price),
    categoryName: cat?.name ?? null,
    subcategoryName: sub?.name ?? null,
  };
}

// GET /listings
router.get("/listings", async (req, res) => {
  const parsed = GetListingsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid query parameters" });
    return;
  }
  const { q, category, subcategory, type, minPrice, maxPrice, sort, page, limit } = parsed.data;
  const offset = ((page ?? 1) - 1) * (limit ?? 24);

  const conditions: ReturnType<typeof eq>[] = [];
  if (category) conditions.push(eq(listingsTable.categorySlug, category));
  if (subcategory) conditions.push(eq(listingsTable.subcategorySlug, subcategory));
  if (type) conditions.push(eq(listingsTable.type, type));
  if (minPrice != null) conditions.push(gte(sql`${listingsTable.price}::numeric`, minPrice));
  if (maxPrice != null) conditions.push(lte(sql`${listingsTable.price}::numeric`, maxPrice));
  if (q) conditions.push(ilike(listingsTable.title, `%${q}%`));
  conditions.push(eq(listingsTable.status, "active"));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const orderBy =
    sort === "price_asc"
      ? asc(sql`${listingsTable.price}::numeric`)
      : sort === "price_desc"
        ? desc(sql`${listingsTable.price}::numeric`)
        : sort === "popular"
          ? desc(listingsTable.views)
          : desc(listingsTable.createdAt);

  const [items, [{ value: total }]] = await Promise.all([
    db
      .select()
      .from(listingsTable)
      .where(where)
      .orderBy(orderBy)
      .limit(limit ?? 24)
      .offset(offset),
    db.select({ value: count() }).from(listingsTable).where(where),
  ]);

  const enriched = await Promise.all(items.map(enrichListing));
  res.json({ items: enriched, total: Number(total), page: page ?? 1, limit: limit ?? 24 });
});

// POST /listings
router.post("/listings", async (req, res) => {
  const parsed = CreateListingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const [row] = await db
    .insert(listingsTable)
    .values({
      ...data,
      price: String(data.price),
      techStack: data.techStack ?? [],
      features: data.features ?? [],
      isFeatured: data.isFeatured ?? false,
    })
    .returning();
  res.status(201).json(await enrichListing(row));
});

// GET /listings/featured
router.get("/listings/featured", async (req, res) => {
  const parsed = GetFeaturedListingsQueryParams.safeParse(req.query);
  const limit = parsed.success ? (parsed.data.limit ?? 8) : 8;
  const rows = await db
    .select()
    .from(listingsTable)
    .where(and(eq(listingsTable.isFeatured, true), eq(listingsTable.status, "active")))
    .orderBy(desc(listingsTable.views))
    .limit(limit);
  const enriched = await Promise.all(rows.map(enrichListing));
  res.json(enriched);
});

// GET /listings/stats
router.get("/listings/stats", async (req, res) => {
  const [total, buyCount, rentCount, featuredCount, avgResult] = await Promise.all([
    db.select({ value: count() }).from(listingsTable).where(eq(listingsTable.status, "active")),
    db.select({ value: count() }).from(listingsTable).where(and(eq(listingsTable.type, "buy"), eq(listingsTable.status, "active"))),
    db.select({ value: count() }).from(listingsTable).where(and(eq(listingsTable.type, "rent"), eq(listingsTable.status, "active"))),
    db.select({ value: count() }).from(listingsTable).where(and(eq(listingsTable.isFeatured, true), eq(listingsTable.status, "active"))),
    db.select({ value: sql<string>`AVG(${listingsTable.price}::numeric)` }).from(listingsTable).where(eq(listingsTable.status, "active")),
  ]);
  res.json({
    totalListings: Number(total[0].value),
    totalBuy: Number(buyCount[0].value),
    totalRent: Number(rentCount[0].value),
    totalFeatured: Number(featuredCount[0].value),
    averagePrice: Number(Number(avgResult[0].value ?? 0).toFixed(2)),
  });
});

// GET /listings/:id
router.get("/listings/:id", async (req, res) => {
  const parsed = GetListingParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [row] = await db.select().from(listingsTable).where(eq(listingsTable.id, parsed.data.id));
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  // Increment views
  await db.update(listingsTable).set({ views: row.views + 1 }).where(eq(listingsTable.id, row.id));
  res.json(await enrichListing({ ...row, views: row.views + 1 }));
});

// PATCH /listings/:id
router.patch("/listings/:id", async (req, res) => {
  const idParsed = UpdateListingParams.safeParse({ id: Number(req.params.id) });
  if (!idParsed.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const bodyParsed = UpdateListingBody.safeParse(req.body);
  if (!bodyParsed.success) { res.status(400).json({ error: bodyParsed.error.message }); return; }
  const data = bodyParsed.data;
  type ListingUpdate = Partial<typeof listingsTable.$inferInsert> & { updatedAt: Date };
  const updateData: ListingUpdate = { updatedAt: new Date() };
  if (data.title != null) updateData.title = data.title;
  if (data.description != null) updateData.description = data.description;
  if (data.categorySlug != null) updateData.categorySlug = data.categorySlug;
  if (data.subcategorySlug != null) updateData.subcategorySlug = data.subcategorySlug;
  if (data.type != null) updateData.type = data.type;
  if (data.price != null) updateData.price = String(data.price);
  if (data.pricePeriod != null) updateData.pricePeriod = data.pricePeriod;
  if (data.status != null) updateData.status = data.status;
  if (data.techStack != null) updateData.techStack = data.techStack;
  if (data.features != null) updateData.features = data.features;
  if (data.isFeatured != null) updateData.isFeatured = data.isFeatured;
  const [row] = await db
    .update(listingsTable)
    .set(updateData)
    .where(eq(listingsTable.id, idParsed.data.id))
    .returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(await enrichListing(row));
});

// DELETE /listings/:id
router.delete("/listings/:id", async (req, res) => {
  const parsed = DeleteListingParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(listingsTable).where(eq(listingsTable.id, parsed.data.id));
  res.status(204).send();
});

export default router;

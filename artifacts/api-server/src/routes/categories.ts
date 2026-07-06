import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { categoriesTable, subcategoriesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/categories", async (_req, res) => {
  const [cats, subs] = await Promise.all([
    db.select().from(categoriesTable).orderBy(categoriesTable.id),
    db.select().from(subcategoriesTable).orderBy(subcategoriesTable.id),
  ]);

  const result = cats.map((cat) => ({
    ...cat,
    subcategories: subs.filter((s) => s.categorySlug === cat.slug),
  }));

  res.json(result);
});

export default router;

import { pgTable, serial, text, boolean, integer, decimal, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const listingTypeEnum = pgEnum("listing_type", ["buy", "rent"]);
export const listingStatusEnum = pgEnum("listing_status", ["active", "sold", "rented"]);

export const categoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  icon: text("icon").notNull().default("Globe"),
});

export const subcategoriesTable = pgTable("subcategories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  categorySlug: text("category_slug").notNull().references(() => categoriesTable.slug),
});

export const listingsTable = pgTable("listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  categorySlug: text("category_slug").notNull().references(() => categoriesTable.slug),
  subcategorySlug: text("subcategory_slug").notNull().references(() => subcategoriesTable.slug),
  type: listingTypeEnum("type").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  pricePeriod: text("price_period").notNull().default("einmalig"),
  status: listingStatusEnum("status").notNull().default("active"),
  isFeatured: boolean("is_featured").notNull().default(false),
  views: integer("views").notNull().default(0),
  techStack: text("tech_stack").array().notNull().default([]),
  features: text("features").array().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertListingSchema = createInsertSchema(listingsTable).omit({ id: true, createdAt: true, updatedAt: true, views: true });
export type InsertListing = z.infer<typeof insertListingSchema>;
export type Listing = typeof listingsTable.$inferSelect;
export type Category = typeof categoriesTable.$inferSelect;
export type Subcategory = typeof subcategoriesTable.$inferSelect;

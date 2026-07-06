import React from "react"
import { Link } from "wouter"
import { useGetCategories } from "@workspace/api-client-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Code, ShoppingCart, LayoutTemplate, Smartphone, Blocks, Database, Megaphone, Target } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  ecommerce: ShoppingCart,
  saas: Code,
  blogs: LayoutTemplate,
  apps: Smartphone,
  default: Blocks
}

export function CategoryGrid() {
  const { data: categories, isLoading } = useGetCategories()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    )
  }

  // Use real categories or fallback to a standard list if empty
  const items = categories?.length ? categories : [
    { slug: "ecommerce", name: "E-Commerce", icon: "ecommerce" },
    { slug: "saas", name: "SaaS Plattformen", icon: "saas" },
    { slug: "blogs", name: "Content & Blogs", icon: "blogs" },
    { slug: "apps", name: "Web Apps", icon: "apps" },
    { slug: "corporate", name: "Corporate Sites", icon: "default" },
    { slug: "crm", name: "CRM & Tools", icon: "default" },
    { slug: "landing", name: "Landing Pages", icon: "default" },
    { slug: "portfolio", name: "Portfolios", icon: "default" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((cat, i) => {
        const Icon = iconMap[cat.icon as string] || iconMap.default
        return (
          <Link key={cat.slug || i} href={`/kategorie/${cat.slug}`}>
            <div className="flex flex-col items-center justify-center p-6 bg-white border border-border rounded-xl hover:border-primary hover:shadow-md transition-all cursor-pointer group text-center h-full">
              <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

import React from "react"
import { Navbar } from "./Navbar"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-white border-t py-12 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            &copy; {new Date().getFullYear()} SELINOVA-TECH. Österreichs Marktplatz für professionelle Webseiten.
          </p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">Impressum</a>
            <a href="#" className="hover:text-primary">Datenschutz</a>
            <a href="#" className="hover:text-primary">AGB</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

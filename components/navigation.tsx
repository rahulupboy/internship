"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { href: "/recommendations", label: "Find Internships" },
  { href: "/saved", label: "Saved" },
  { href: "/profile", label: "Profile" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
      <Link href="/" className="text-2xl font-bold text-gray-900">
        InternMatch
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors",
              isActive(item.href) ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="text-xl font-bold text-gray-900" onClick={() => setIsOpen(false)}>
                InternMatch
              </Link>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-2">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg transition-colors py-2",
                    isActive(item.href) ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

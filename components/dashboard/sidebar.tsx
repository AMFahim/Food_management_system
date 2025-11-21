"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Menu, X, Apple, Package, BarChart3, Zap, Upload, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

const menuItems = [
  { label: "Food Items", icon: Apple, href: "/dashboard/food-items" },
  { label: "Inventory", icon: Package, href: "/dashboard/inventory" },
  { label: "Inventory Logs", icon: BarChart3, href: "/dashboard/inventory-logs" },
  { label: "Resources", icon: Zap, href: "/dashboard/resources" },
  { label: "Uploads Summary", icon: Upload, href: "/dashboard/uploads" },
  { label: "Consumption Data", icon: TrendingUp, href: "/dashboard/consumption" },
]

export function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto hidden md:block"
          >
            <div className="p-6 border-b border-sidebar-border">
              <Link href={"/"} className="text-2xl font-bold text-sidebar-primary">FreshKeep</Link>
            </div>
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent",
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </motion.div>
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onToggle}
        className="md:hidden fixed bottom-6 left-6 z-40 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </>
  )
}

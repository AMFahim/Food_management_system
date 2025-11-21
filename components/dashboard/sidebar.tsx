"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Menu,
  X,
  Apple,
  Package,
  BarChart3,
  Zap,
  Upload,
  TrendingUp,
  PieChart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const menuItems = [
  { label: "Food Items", icon: Apple, href: "/dashboard/food-items" },
  { label: "Inventory", icon: Package, href: "/dashboard/inventory" },
  {
    label: "Inventory Logs",
    icon: BarChart3,
    href: "/dashboard/inventory-logs",
  },
  { label: "Resources", icon: Zap, href: "/dashboard/resources" },
  { label: "Uploads Summary", icon: Upload, href: "/dashboard/uploads" },
  {
    label: "Consumption Data",
    icon: TrendingUp,
    href: "/dashboard/consumption",
  },
];

const analysisItems = [
  { label: "Consumption", href: "/dashboard/analysis/consumption" },
  { label: "Meal Optimization", href: "/dashboard/analysis/meal-optimization" },
  { label: "Expiration Risk", href: "/dashboard/analysis/expiration-risk" },
  { label: "Waste Estimation", href: "/dashboard/analysis/waste-estimation" },
  { label: "Nourish Bot", href: "/dashboard/analysis/nourish-bot" },
  { label: "SDG impact scoring", href: "/dashboard/analysis/impact-scoring" },
];

export function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [analysisOpen, setAnalysisOpen] = useState(false);

  const isAnalysisActive = pathname.startsWith("/dashboard/analysis");

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
              <Link
                href={"/"}
                className="text-2xl font-bold text-sidebar-primary"
              >
                FreshKeep
              </Link>
            </div>

            <nav className="p-4 space-y-2">
              {/* Normal menu items */}
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </motion.div>
                  </Link>
                );
              })}

              {/* ⭐ NEW Analysis Parent Item */}
              <div>
                <button
                  onClick={() => setAnalysisOpen(!analysisOpen)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                    isAnalysisActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <PieChart className="w-5 h-5" />
                  <span className="font-medium">Analysis</span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 ml-auto transition-transform",
                      analysisOpen || isAnalysisActive ? "rotate-90" : ""
                    )}
                  />
                </button>

                {/* Submenu */}
                <AnimatePresence>
                  {(analysisOpen || isAnalysisActive) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-10 mt-1 space-y-1"
                    >
                      {analysisItems.map((sub) => {
                        const active = pathname === sub.href;
                        return (
                          <Link key={sub.href} href={sub.href}>
                            <div
                              className={cn(
                                "px-3 py-1.5 rounded-md text-sm transition-colors",
                                active
                                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                  : "text-sidebar-foreground hover:bg-sidebar-accent"
                              )}
                            >
                              {sub.label}
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
  );
}

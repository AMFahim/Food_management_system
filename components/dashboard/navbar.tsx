"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, LogOut, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface DashboardNavbarProps {
  onMenuClick: () => void
}

export function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState("")
  const router = useRouter()

  console.log(userName)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const userObj = JSON.parse(user)
      setUserName(userObj.full_name)
      setUserRole(userObj.role)
    }
  },[])

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-muted rounded-lg">
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex-1" />

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              {userName?.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="font-medium text-sm">{userName}</p>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg"
              >
                <Link href="/dashboard/profile">
                  <div className="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-t-lg transition-colors">
                    <User className="w-4 h-4" />
                    <span className="text-sm">View Profile</span>
                  </div>
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-destructive hover:bg-muted rounded-b-lg transition-colors text-left">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}

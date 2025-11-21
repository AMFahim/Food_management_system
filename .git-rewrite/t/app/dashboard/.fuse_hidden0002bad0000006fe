"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Apple, TrendingUp, AlertCircle } from "lucide-react"

const stats = [
  {
    label: "Total Food Items",
    value: "24",
    icon: Apple,
    color: "bg-green-100 text-green-700",
  },
  {
    label: "In Inventory",
    value: "156",
    icon: Package,
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "Items Expiring Soon",
    value: "8",
    icon: AlertCircle,
    color: "bg-orange-100 text-orange-700",
  },
  {
    label: "Total Saved",
    value: "৳2,450",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-700",
  },
]

const recentActivities = [
  { id: 1, action: "Added Carrot to inventory", time: "2 hours ago" },
  { id: 2, action: "Updated Tomato expiration", time: "5 hours ago" },
  { id: 3, action: "Consumed 2 kg of Rice", time: "1 day ago" },
  { id: 4, action: "Added new Food Item: Broccoli", time: "2 days ago" },
]

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back, Anas Ibn Belal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest actions in FreshKeep</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between pb-4 border-b border-border last:border-0"
                >
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm p-3 bg-green-50 text-green-800 rounded-lg">
              Store vegetables at optimal temperatures
            </div>
            <div className="text-sm p-3 bg-blue-50 text-blue-800 rounded-lg">
              Update inventory regularly for accuracy
            </div>
            <div className="text-sm p-3 bg-orange-50 text-orange-800 rounded-lg">Monitor expiration dates weekly</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

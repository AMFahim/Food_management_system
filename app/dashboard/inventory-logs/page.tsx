"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

interface LogEntry {
  id: number
  action: string
  item: string
  quantity: number
  date: string
  user: string
}

const inventoryLogs: LogEntry[] = [
  {
    id: 1,
    action: "Added",
    item: "Carrot",
    quantity: 3,
    date: "2025-11-21",
    user: "Anas Ibn Belal",
  },
  {
    id: 2,
    action: "Consumed",
    item: "Tomato",
    quantity: 2,
    date: "2025-11-21",
    user: "Anas Ibn Belal",
  },
  {
    id: 3,
    action: "Updated",
    item: "Chicken Breast",
    quantity: 1,
    date: "2025-11-20",
    user: "Anas Ibn Belal",
  },
  {
    id: 4,
    action: "Removed",
    item: "Broccoli",
    quantity: 5,
    date: "2025-11-20",
    user: "Anas Ibn Belal",
  },
  {
    id: 5,
    action: "Added",
    item: "Rice",
    quantity: 10,
    date: "2025-11-19",
    user: "Anas Ibn Belal",
  },
]

const getActionColor = (action: string) => {
  switch (action) {
    case "Added":
      return "bg-green-100 text-green-800"
    case "Consumed":
      return "bg-blue-100 text-blue-800"
    case "Updated":
      return "bg-purple-100 text-purple-800"
    case "Removed":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function InventoryLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inventory Logs</h1>
        <p className="text-muted-foreground mt-2">View all inventory transactions and activities</p>
      </div>

      <div className="grid gap-4">
        {inventoryLogs.length > 0 ? (
          inventoryLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="hidden sm:block">
                        <BarChart3 className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{log.item}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                            {log.action}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Quantity</p>
                            <p className="font-medium">{log.quantity} units</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Date</p>
                            <p className="font-medium">{new Date(log.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">User</p>
                            <p className="font-medium text-xs">{log.user}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Time</p>
                            <p className="font-medium text-xs">14:30 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground">No inventory logs yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

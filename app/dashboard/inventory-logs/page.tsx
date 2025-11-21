"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Loader2 } from "lucide-react"
import axiosInstance from "@/lib/axiosInstance"
import { useState, useEffect } from "react"
import { toast } from "sonner"

interface LogEntry {
  id: number
  action: string
  item: string
  quantity: number
  date: string
  user: string
}

interface ApiResponse {
  success: boolean
  data: {
    logs?: LogEntry[]
    items?: LogEntry[]
    message?: string
  }
}

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
  const [logItems, setLogItems] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLogItems = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const res = await axiosInstance.get<ApiResponse>("/logs")

      console.log("LOGS Response: ", res)
      
      if (res.data.success) {
        // Handle different possible response structures
        if (res.data.data.logs && Array.isArray(res.data.data.logs)) {
          setLogItems(res.data.data.logs)
        } else if (res.data.data.items && Array.isArray(res.data.data.items)) {
          setLogItems(res.data.data.items)
        } else if (Array.isArray(res.data.data)) {
          setLogItems(res.data.data)
        } else {
          throw new Error("Unexpected API response format")
        }
        toast.success("Logs loaded successfully!")
      } else {
        throw new Error(res.data.data?.message || "Failed to fetch logs")
      }
      
    } catch (error) {
      console.error("Error fetching logs:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch inventory logs"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogItems()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Logs</h1>
          <p className="text-muted-foreground mt-2">View all inventory transactions and activities</p>
        </div>
        
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading inventory logs...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Logs</h1>
          <p className="text-muted-foreground mt-2">View all inventory transactions and activities</p>
        </div>
        
        <button
          onClick={fetchLogItems}
          disabled={loading}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : null}
          Refresh Logs
        </button>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive">{error}</p>
        </div>
      )}

      <div className="grid gap-4">
        {logItems.length > 0 ? (
          logItems.map((log, index) => (
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
                            <p className="font-medium text-xs">
                              {new Date(log.date).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
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
              <p className="text-muted-foreground">No inventory logs found</p>
              <button
                onClick={fetchLogItems}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
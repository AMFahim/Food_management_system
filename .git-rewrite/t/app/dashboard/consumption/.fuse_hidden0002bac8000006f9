"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const consumptionData = [
  { month: "Jan", consumed: 45, wasted: 12 },
  { month: "Feb", consumed: 52, wasted: 10 },
  { month: "Mar", consumed: 48, wasted: 15 },
  { month: "Apr", consumed: 61, wasted: 8 },
  { month: "May", consumed: 55, wasted: 11 },
  { month: "Jun", consumed: 67, wasted: 9 },
]

const itemConsumption = [
  { item: "Carrot", amount: 120, units: "kg" },
  { item: "Tomato", amount: 95, units: "kg" },
  { item: "Chicken", amount: 45, units: "kg" },
  { item: "Rice", amount: 180, units: "kg" },
  { item: "Broccoli", amount: 60, units: "kg" },
]

export default function ConsumptionDataPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Consumption Data</h1>
        <p className="text-muted-foreground mt-2">Analyze your food consumption patterns</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Consumed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">523 kg</p>
            <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Food Wasted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">75 kg</p>
            <p className="text-xs text-red-600 mt-2">↓ 8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Waste Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12.5%</p>
            <p className="text-xs text-blue-600 mt-2">Target: 10% or less</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>Consumption Trend</CardTitle>
            <CardDescription>Monthly food consumption vs waste</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={consumptionData}>
                <defs>
                  <linearGradient id="colorConsumed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorWasted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="consumed"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorConsumed)"
                  name="Consumed (kg)"
                />
                <Area
                  type="monotone"
                  dataKey="wasted"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorWasted)"
                  name="Wasted (kg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Top Consumed Items</CardTitle>
            <CardDescription>Your most consumed food items this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={itemConsumption}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="item" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" name="Amount (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

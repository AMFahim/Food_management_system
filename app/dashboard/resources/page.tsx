"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Book, Video, Download } from "lucide-react"

const resources = [
  {
    id: 1,
    title: "Food Storage Guide",
    description: "Best practices for storing different types of food items",
    type: "Guide",
    icon: Book,
  },
  {
    id: 2,
    title: "Meal Planning Tips",
    description: "Learn how to plan meals efficiently with your inventory",
    type: "Article",
    icon: Book,
  },
  {
    id: 3,
    title: "Cooking Video Tutorial",
    description: "Watch step-by-step cooking tutorials using available items",
    type: "Video",
    icon: Video,
  },
  {
    id: 4,
    title: "Sustainability Report",
    description: "Download your food sustainability report and analytics",
    type: "PDF",
    icon: Download,
  },
  {
    id: 5,
    title: "Budget Optimization",
    description: "Learn strategies to optimize your food budget",
    type: "Guide",
    icon: Zap,
  },
]

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Resources</h1>
        <p className="text-muted-foreground mt-2">Access helpful guides and materials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => {
          const Icon = resource.icon
          return (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription className="mt-2">{resource.description}</CardDescription>
                    </div>
                    <div className="p-2 bg-accent/10 rounded-lg ml-4">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {resource.type}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

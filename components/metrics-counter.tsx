"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface MetricsCounterProps {
  value: number
  suffix?: string
  label: string
  delay?: number
}

export function MetricsCounter({ value, suffix = "", label, delay = 0 }: MetricsCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += Math.ceil(value / 50)
        if (start >= value) {
          setCount(value)
          clearInterval(interval)
        } else {
          setCount(start)
        }
      }, 30)
    }, delay * 100)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-text-muted text-sm md:text-base">{label}</p>
    </motion.div>
  )
}

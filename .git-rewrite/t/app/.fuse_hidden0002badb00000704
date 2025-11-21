"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { SectionWrapper } from "@/components/section-wrapper"
import { MetricsCounter } from "@/components/metrics-counter"
import { motion } from "framer-motion"
import { ArrowRight, Leaf, TrendingDown, Clock, BarChart3, Star } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const features = [
    {
      icon: Leaf,
      title: "Waste Reduction",
      description: "Cut food waste by up to 45% with intelligent tracking and expiration alerts.",
    },
    {
      icon: TrendingDown,
      title: "Cost Optimization",
      description: "Reduce inventory costs and optimize purchase orders with smart analytics.",
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Monitor inventory in real-time across multiple locations and departments.",
    },
    {
      icon: BarChart3,
      title: "Data Insights",
      description: "Get actionable insights to make better sustainability decisions.",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Connect Your Inventory",
      description: "Integrate with your existing systems or scan items manually.",
    },
    {
      number: "02",
      title: "Smart Tracking",
      description: "AI-powered system monitors expiry dates and usage patterns.",
    },
    {
      number: "03",
      title: "Optimize & Save",
      description: "Receive recommendations and reduce waste while saving money.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Operations Manager, Green Bistro",
      text: "FreshKeep helped us reduce food waste by 50% in just 3 months. The ROI was incredible.",
      avatar: "👩‍💼",
    },
    {
      name: "James Mitchell",
      role: "Executive Chef, Sustainable Restaurant Group",
      text: "The real-time tracking makes inventory management effortless. Our team loves it.",
      avatar: "👨‍🍳",
    },
    {
      name: "Priya Patel",
      role: "Sustainability Officer, Food Corp",
      text: "Finally, a solution that aligns profit with purpose. Highly recommended.",
      avatar: "👩‍💻",
    },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 md:pt-40 pb-20 overflow-hidden flex items-center">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 10 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&h=900&fit=crop"
            alt="Fresh vegetables and sustainable food"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/60 to-foreground/80" />
        </motion.div>

        {/* Hero Content */}
        <div className="container-custom relative z-10 w-full">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-balance font-bold mb-6"
            >
              Smart Food Inventory for a Sustainable Future
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl mb-8 text-accent-light"
            >
              Reduce waste, optimize costs, and build a more sustainable food system with AI-powered inventory
              management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-accent hover:bg-accent-light text-foreground font-bold">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 bg-transparent">
                Watch Demo
              </Button>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
            />
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <SectionWrapper className="bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <MetricsCounter value={10000} suffix="+" label="Food Items Tracked" />
          <MetricsCounter value={500} suffix="+" label="Active Businesses" delay={1} />
          <MetricsCounter value={45} suffix="%" label="Average Waste Reduction" delay={2} />
          <MetricsCounter value={2} suffix="M+" label="Tons CO₂ Saved" delay={3} />
        </div>
      </SectionWrapper>

      {/* Features Section */}
      <SectionWrapper id="features">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-balance mb-4"
          >
            Powerful Features for Food Management
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-muted max-w-2xl mx-auto"
          >
            Everything you need to optimize inventory, reduce waste, and build a sustainable future.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} hover delay={index * 0.1}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-text-muted text-sm">{feature.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </SectionWrapper>

      {/* How It Works Section */}
      <SectionWrapper className="bg-surface">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-balance mb-4"
          >
            How It Works
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                <p className="text-text-muted">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-primary/30" />
              )}
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper id="testimonials">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-balance mb-4"
          >
            Loved by Businesses Worldwide
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} delay={index * 0.1}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-text-muted mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-text-muted text-xs">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="bg-surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-balance mb-6">Ready to Transform Your Food System?</h2>
          <p className="text-text-muted mb-8 text-lg">
            Join thousands of businesses reducing waste and building a more sustainable future.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary-dark">
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </SectionWrapper>

      <Footer />
    </main>
  )
}

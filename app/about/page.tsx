"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/card"
import { SectionWrapper } from "@/components/section-wrapper"
import { MetricsCounter } from "@/components/metrics-counter"
import { motion } from "framer-motion"
import { Leaf, Globe, Users } from "lucide-react"

export default function About() {
  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      avatar: "👨‍💼",
      bio: "Sustainability entrepreneur with 10+ years in food tech.",
    },
    {
      name: "Maria Garcia",
      role: "Chief Product Officer",
      avatar: "👩‍💻",
      bio: "AI specialist passionate about solving food waste.",
    },
    {
      name: "David Kumar",
      role: "VP Operations",
      avatar: "👨‍🔬",
      bio: "Supply chain expert with Fortune 500 experience.",
    },
    {
      name: "Lisa Chen",
      role: "Head of Sustainability",
      avatar: "👩‍🌾",
      bio: "Environmental scientist driving our impact mission.",
    },
  ]

  const timeline = [
    {
      year: "2021",
      title: "Founded FreshKeep",
      description: "Started with a vision to solve food waste through technology.",
    },
    {
      year: "2022",
      title: "Launched Platform",
      description: "Released AI-powered inventory management system.",
    },
    {
      year: "2023",
      title: "500+ Users",
      description: "Reached 500 active businesses across North America.",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanding to Europe and Asia with localized solutions.",
    },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-balance mb-6">
            About FreshKeep
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted"
          >
            We're on a mission to eliminate food waste and build a more sustainable food system for future generations.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <SectionWrapper className="bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-balance mb-6">Our Mission & Vision</h2>
            <div className="space-y-4 text-text-muted">
              <p>
                At FreshKeep, we believe that technology can be a powerful force for environmental change. Food waste
                represents a critical global challenge—1.3 billion tons wasted annually while 700+ million people face
                hunger.
              </p>
              <p>
                Our mission is to empower businesses of all sizes to reduce waste, optimize resources, and operate
                sustainably.
              </p>
              <p>
                We envision a future where smart inventory management is the standard, waste is minimized, and every
                business contributes to a healthier planet.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-6"
          >
            <Card>
              <div className="flex gap-4">
                <Leaf className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Sustainability First</h3>
                  <p className="text-sm text-text-muted">Every decision prioritizes environmental impact.</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex gap-4">
                <Globe className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Global Impact</h3>
                  <p className="text-sm text-text-muted">Working to create change across industries and continents.</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex gap-4">
                <Users className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Community Driven</h3>
                  <p className="text-sm text-text-muted">Building solutions with and for our users.</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Impact Metrics */}
      <SectionWrapper>
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-balance mb-4"
          >
            Our Impact So Far
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <MetricsCounter value={50000} suffix="+" label="Tons Food Diverted from Landfills" />
          <MetricsCounter value={500} suffix="+" label="Businesses Empowered" delay={1} />
          <MetricsCounter value={100} suffix="M" label="Dollars Saved in Costs" delay={2} />
          <MetricsCounter value={2} suffix="M" label="Lives Impacted Positively" delay={3} />
        </div>
      </SectionWrapper>

      {/* Timeline Section */}
      <SectionWrapper className="bg-surface">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-balance mb-4"
          >
            Our Journey
          </motion.h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pb-12 last:pb-0"
            >
              <div className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  {index < timeline.length - 1 && <div className="w-1 h-20 bg-primary/20 mt-4" />}
                </div>
                <div className="pt-2 flex-1">
                  <p className="text-primary font-semibold mb-1">{item.year}</p>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-text-muted">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Team Section */}
      <SectionWrapper>
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-balance mb-4"
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-muted max-w-2xl mx-auto"
          >
            Passionate experts dedicated to transforming the food industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index} hover delay={index * 0.1}>
              <div className="text-center">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-text-muted text-sm">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Values Section */}
      <SectionWrapper className="bg-surface">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-balance mb-4"
          >
            Our Core Values
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Integrity",
              description: "We operate with transparency and honesty in everything we do.",
            },
            {
              title: "Innovation",
              description: "We continuously push boundaries to create better solutions.",
            },
            {
              title: "Impact",
              description: "We measure success by the positive change we create in the world.",
            },
          ].map((value, index) => (
            <Card key={index} delay={index * 0.1}>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
              <p className="text-text-muted">{value.description}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <Footer />
    </main>
  )
}

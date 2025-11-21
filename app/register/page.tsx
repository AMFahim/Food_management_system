"use client"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/button"
import { motion } from "framer-motion"
import { UserPlus, AlertCircle } from "lucide-react"
import Image from "next/image"

interface RegisterFormInputs {
  full_name: string
  email: string
  password: string
  confirmPassword: string
  role: "Individual" | "Business" | "Organization"
  household_size: number
  location: string
  budget_range: string
  dietary_preferences: string
  terms: boolean
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Individual",
      household_size: 1,
      location: "",
      budget_range: "500",
      dietary_preferences: "Murgi",
      terms: false,
    },
  })

  const password = watch("password")

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          message: "Passwords do not match",
        })
        return
      }

      const payload = {
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        role: data.role,
        household_size: data.household_size,
        location: data.location,
        budget_range: data.budget_range,
        dietary_preferences: {
          preference: data.dietary_preferences,
        },
      }

      console.log("[v0] Registration payload:", payload)
      // Handle successful registration
    } catch (err) {
      setError("root", {
        message: "An error occurred. Please try again.",
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-20 md:pt-32 pb-20 overflow-hidden">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 10 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&h=900&fit=crop"
            alt="Background"
            fill
            quality={85}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/70 to-foreground/90" />
        </motion.div>

        {/* Register Form Container */}
        <div className="container-custom relative z-10 w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-lg backdrop-blur-sm bg-card/95"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4"
              >
                <UserPlus className="w-6 h-6 text-primary" />
              </motion.div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Join FreshKeep</h1>
              <p className="text-text-muted">Create your account and start managing food sustainably</p>
            </div>

            {/* Error Message */}
            {errors.root && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex gap-3"
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{errors.root.message}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                {/* Full Name */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Anas Ibn Belal"
                    {...register("full_name", {
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Full name must be at least 2 characters",
                      },
                    })}
                    className={`w-full px-4 py-2.5 rounded-lg bg-background border text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all ${
                      errors.full_name
                        ? "border-destructive focus:ring-destructive/50"
                        : "border-input focus:ring-primary/50"
                    }`}
                  />
                  {errors.full_name && <p className="text-sm text-destructive mt-1">{errors.full_name.message}</p>}
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full px-4 py-2.5 rounded-lg bg-background border text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-destructive focus:ring-destructive/50"
                        : "border-input focus:ring-primary/50"
                    }`}
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-foreground mb-2">Password *</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className={`w-full px-4 py-2.5 rounded-lg bg-background border text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all ${
                      errors.password
                        ? "border-destructive focus:ring-destructive/50"
                        : "border-input focus:ring-primary/50"
                    }`}
                  />
                  {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
                </motion.div>

                {/* Confirm Password */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) => value === password || "Passwords do not match",
                    })}
                    className={`w-full px-4 py-2.5 rounded-lg bg-background border text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword
                        ? "border-destructive focus:ring-destructive/50"
                        : "border-input focus:ring-primary/50"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>
                  )}
                </motion.div>

                {/* Grid Row: Role & Household Size */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                    <select
                      {...register("role")}
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="Individual">Individual</option>
                      <option value="Business">Business</option>
                      <option value="Organization">Organization</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Household Size</label>
                    <input
                      type="number"
                      min="1"
                      {...register("household_size", {
                        valueAsNumber: true,
                        required: "Household size is required",
                        min: {
                          value: 1,
                          message: "Household size must be at least 1",
                        },
                      })}
                      className={`w-full px-4 py-2.5 rounded-lg bg-background border text-foreground focus:outline-none focus:ring-2 transition-all ${
                        errors.household_size
                          ? "border-destructive focus:ring-destructive/50"
                          : "border-input focus:ring-primary/50"
                      }`}
                    />
                    {errors.household_size && (
                      <p className="text-sm text-destructive mt-1">{errors.household_size.message}</p>
                    )}
                  </div>
                </motion.div>

                {/* Grid Row: Location & Budget */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="Mirpur"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className={`w-full px-4 py-2.5 rounded-lg bg-background border text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all ${
                        errors.location
                          ? "border-destructive focus:ring-destructive/50"
                          : "border-input focus:ring-primary/50"
                      }`}
                    />
                    {errors.location && <p className="text-sm text-destructive mt-1">{errors.location.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
                    <input
                      type="text"
                      placeholder="500"
                      {...register("budget_range", {
                        required: "Budget range is required",
                      })}
                      className={`w-full px-4 py-2.5 rounded-lg bg-background border text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all ${
                        errors.budget_range
                          ? "border-destructive focus:ring-destructive/50"
                          : "border-input focus:ring-primary/50"
                      }`}
                    />
                    {errors.budget_range && (
                      <p className="text-sm text-destructive mt-1">{errors.budget_range.message}</p>
                    )}
                  </div>
                </motion.div>

                {/* Dietary Preferences */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-foreground mb-2">Dietary Preferences</label>
                  <select
                    {...register("dietary_preferences")}
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="Murgi">Murgi (Chicken)</option>
                    <option value="Gosht">Gosht (Meat)</option>
                    <option value="Machli">Machli (Fish)</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </motion.div>

                {/* Terms & Conditions */}
                <motion.div variants={itemVariants} className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("terms", {
                      required: "You must agree to the terms",
                    })}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-text-muted">
                    I agree to the{" "}
                    <Link href="#" className="text-primary hover:text-primary-dark">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary hover:text-primary-dark">
                      Privacy Policy
                    </Link>
                  </label>
                  {errors.terms && <p className="text-sm text-destructive mt-1">{errors.terms.message}</p>}
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold py-2.5"
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </motion.div>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="relative my-6"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-text-muted">Already have an account?</span>
              </div>
            </motion.div>

            {/* Login Link */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
              <Link href="/login">
                <Button variant="outline" className="w-full border-border hover:bg-background bg-transparent">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

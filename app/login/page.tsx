"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/button";
import { motion } from "framer-motion";
import { LogIn, AlertCircle } from "lucide-react";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      if (res.data.success) {
        router.push("/dashboard");
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user) );
      }
    } catch (err) {
      console.log(err);
      setError("root", {
        message: err.response.message,
      });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-[calc(100vh-80px)] pt-20 md:pt-32 pb-20 overflow-hidden flex items-center">
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

        {/* Login Form Container */}
        <div className="container-custom relative z-10 w-full max-w-md mx-auto">
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
                <LogIn className="w-6 h-6 text-primary" />
              </motion.div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-text-muted">
                Sign in to your FreshKeep account
              </p>
            </div>

            {/* Error Message */}
            {errors.root && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex gap-3"
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">
                  {errors.root.message}
                </p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
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
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full px-4 py-2.5 rounded-lg bg-background border text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? "border-destructive focus:ring-destructive/50"
                      : "border-input focus:ring-primary/50"
                  }`}
                />
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.password.message}
                  </p>
                )}
              </motion.div>

              {/* Remember & Forgot */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between text-sm"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("rememberMe")}
                    className="rounded border-input"
                  />
                  <span className="text-text-muted">Remember me</span>
                </label>
                <Link
                  href="#"
                  className="text-primary hover:text-primary-dark transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold py-2.5"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="relative my-6"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-text-muted">
                  New to FreshKeep?
                </span>
              </div>
            </motion.div>

            {/* Register Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/register">
                <Button
                  variant="outline"
                  className="w-full border-border hover:bg-background bg-transparent"
                >
                  Create an Account
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

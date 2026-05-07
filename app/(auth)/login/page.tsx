"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Globe, Mail, User, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition, useEffect } from "react"
import { login } from "@/app/actions/auth"

export default function LoginPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.push("/dashboard")
  }, [router])

  const [error, setError] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    startTransition(() => {
      login({ email, password }).then((data) => {
        if (data?.error) {
          setError(data.error)
        }
      })
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center gap-2 justify-center mb-8 group">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Globe className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent gradient-primary">
            LangLab
          </span>
        </Link>

        <Card className="p-8 shadow-2xl border-none rounded-3xl glass">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Log in to continue your journey</p>
          </div>

          {error && (
            <div className="bg-destructive/15 p-3 rounded-xl flex items-center gap-x-2 text-sm text-destructive mb-6">
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button variant="outline" className="rounded-xl h-12" disabled={isPending}>
              <User className="mr-2 w-5 h-5" />
              Google
            </Button>
            <Button variant="outline" className="rounded-xl h-12" disabled={isPending}>
              <Mail className="mr-2 w-5 h-5" />
              GitHub
            </Button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="name@example.com" 
                className="rounded-xl h-12" 
                disabled={isPending}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-primary hover:underline">Forgot password?</Link>
              </div>
              <Input 
                id="password" 
                name="password"
                type="password" 
                className="rounded-xl h-12" 
                disabled={isPending}
                required
              />
            </div>
            <Button 
              type="submit"
              className="w-full rounded-xl h-12 gradient-primary shadow-lg hover:shadow-primary/20 mt-4"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log In"}
            </Button>
          </form>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  )
}


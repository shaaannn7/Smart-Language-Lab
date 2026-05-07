"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { 
  Mic, 
  MessageSquare, 
  BrainCircuit, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Languages, 
  BarChart3 
} from "lucide-react"
import Link from "next/link"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const features = [
  {
    icon: BrainCircuit,
    title: "AI Language Partner",
    description: "Practice conversations 24/7 with our advanced AI that understands context and provides real-time corrections."
  },
  {
    icon: Mic,
    title: "Speaking Mastery",
    description: "Hone your pronunciation with real-time feedback and waveform visualization for every syllable."
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Detailed insights into your vocabulary growth, grammar accuracy, and speaking confidence."
  }
]

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-4">
        {/* Decorative Background */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm font-medium border-primary/20"
          >
            <Zap className="w-4 h-4 text-primary fill-primary" />
            <span className="bg-clip-text text-transparent gradient-primary">AI-Powered Language Learning</span>
          </motion.div>

          <motion.h1 
            {...fadeIn}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Master Any Language <br />
            <span className="text-gradient">Through Practice</span>
          </motion.h1>

          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Speak fluently, write confidently, and understand deeply. LangLab combines immersive AI coaching with science-backed learning.
          </motion.p>

          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:row items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full px-8 text-lg gradient-primary h-14 shadow-xl hover:shadow-primary/20 transition-all group">
                Start Learning Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 bg-background/50 backdrop-blur-sm">
              Watch Demo
            </Button>
          </motion.div>
        </div>

        {/* Floating Cards (Animated) */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="rounded-2xl border bg-card p-4 shadow-2xl relative z-10 overflow-hidden"
          >
            <div className="aspect-video gradient-primary/5 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Languages className="w-20 h-20 text-primary opacity-20" />
                <p className="font-medium text-muted-foreground">Interactive Dashboard Preview</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 glass p-6 rounded-2xl shadow-xl z-20 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">AI Tutor</p>
                <p className="text-sm text-muted-foreground">Correcting your grammar...</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Supercharge Your Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-8 h-full border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group rounded-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Everything you need to master a language, at your own pace.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic */}
            <Card className="p-8 border rounded-2xl flex flex-col h-full bg-background/50">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {["5 lessons per day", "Daily streaks", "Vocabulary practice"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-xl">Get Started</Button>
            </Card>

            {/* Pro */}
            <Card className="p-8 border-2 border-primary rounded-2xl flex flex-col h-full relative shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">$12</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {[
                  "Unlimited lessons", 
                  "24/7 AI Tutor Access", 
                  "Detailed Analytics", 
                  "Voice practice mode",
                  "Ad-free experience"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full rounded-xl gradient-primary h-12 shadow-lg hover:shadow-primary/20">Go Pro</Button>
            </Card>

            {/* Lifetime */}
            <Card className="p-8 border rounded-2xl flex flex-col h-full bg-background/50">
              <h3 className="text-xl font-bold mb-2">Lifetime</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-muted-foreground">once</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {["All Pro features", "Early access to new tech", "Exclusive webinars"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-xl">One-time payment</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl gradient-primary p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-2xl" />
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10">Ready to speak like a native?</h2>
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto relative z-10">
              Join 100,000+ learners across the globe who are breaking language barriers with LangLab.
            </p>
            <div className="relative z-10">
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full px-12 text-lg bg-white text-primary hover:bg-zinc-50 h-14 font-bold shadow-xl">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

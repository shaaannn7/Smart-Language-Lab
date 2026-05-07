"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  Mic, 
  MessageSquare, 
  BrainCircuit, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  BarChart3,
  Sparkles,
  Cpu,
  ChevronRight,
  Shield,
  Layers
} from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

const features = [
  {
    icon: BrainCircuit,
    title: "Neural Language Engine",
    description: "Proprietary AI architecture that comprehends semantic nuance and cultural context beyond traditional LLMs.",
    color: "from-[#6C63FF]/20 to-[#A855F7]/20"
  },
  {
    icon: Mic,
    title: "Acoustic Precision",
    description: "Real-time phonetic mapping with millisecond latency for hyper-accurate accent calibration.",
    color: "from-[#00D1FF]/20 to-[#6C63FF]/20"
  },
  {
    icon: BarChart3,
    title: "Cognitive Insights",
    description: "Deep analytics on synaptic retention and grammatical agility, visualized through high-fidelity charts.",
    color: "from-[#A855F7]/20 to-[#00D1FF]/20"
  }
]

export default function LandingPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0B1020] text-foreground selection:bg-primary/30 overflow-x-hidden">
      {/* Immersive Background */}
      <div className="fixed inset-0 grid-background opacity-[0.15] pointer-events-none" />
      <div className="fixed inset-0 noise-overlay pointer-events-none" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-secondary/10 rounded-full blur-[150px] -z-10 animate-pulse delay-700" />
      <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] bg-accent/5 rounded-full blur-[100px] -z-10" />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-64 md:pb-48 container mx-auto px-6">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border-white/5 mb-12"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0B1020] bg-zinc-800 flex items-center justify-center text-[8px] font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/70">
              Trusted by <span className="text-primary font-black">50,000+</span> Neural Learners
            </span>
            <ChevronRight className="w-3 h-3 text-white/30" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-black tracking-tight mb-10 leading-[0.85] text-white"
          >
            Redefining the <br />
            <span className="text-gradient-primary">Neural Language Loop.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed font-medium tracking-tight"
          >
            Ditch traditional pedagogy. LangLab leverages generative neuro-linguistics 
            to help you speak with the intuition of a native, powered by AI.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/dashboard">
              <Button size="lg" className="rounded-2xl px-12 text-lg font-black gradient-primary h-20 shadow-[0_20px_40px_rgba(108,99,255,0.3)] hover:shadow-primary/50 transition-all group border-none text-white">
                Start Practicing Free
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="rounded-2xl px-12 text-lg h-20 glass-morphism text-white font-bold hover:bg-white/10 transition-all">
              Watch Intelligence Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview Plate - Immersive Scroll Effect */}
        <motion.div
          initial={{ opacity: 0, y: 150, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 relative max-w-7xl mx-auto perspective-2000 px-4"
        >
          <div className="relative rounded-[3rem] border border-white/10 bg-card/40 backdrop-blur-3xl p-4 shadow-[0_50px_120px_rgba(0,0,0,0.6)] overflow-hidden">
             <div className="aspect-[16/10] lg:aspect-[21/9] bg-[#0B1020]/80 rounded-[2.5rem] overflow-hidden relative flex items-center justify-center group">
                <div className="absolute inset-0 grid-background opacity-[0.05]" />
                
                {/* Simulated UI Content */}
                <div className="flex flex-col items-center gap-10 z-10 text-center px-6">
                  <div className="w-32 h-32 rounded-[3rem] gradient-primary flex items-center justify-center shadow-3xl group-hover:scale-110 transition-transform duration-700 glow-primary">
                    <BrainCircuit className="w-16 h-16 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-black tracking-tight text-white">Interface v4.28</p>
                    <p className="text-sm font-black tracking-[0.4em] text-white/30 uppercase italic">Adaptive Neural Processing</p>
                  </div>
                </div>

                {/* Floating Micro-UI Elements */}
                <motion.div 
                  animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }} 
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-16 left-16 glass-card p-6 rounded-3xl border-white/10 shadow-3xl w-72"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Zap className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest mb-1 italic">Optimization</p>
                      <p className="text-sm font-bold text-white leading-snug">Semantic alignment verified at 99.8% precision.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }} 
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-16 right-16 glass-card p-6 rounded-3xl border-white/10 shadow-3xl w-80"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1 italic">AI Partner</p>
                      <p className="text-sm font-bold text-white leading-snug">"Your phonetic resonance is matching the Madrid locale perfectly."</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Glowing Core Effect */}
                <div className="absolute inset-0 bg-radial-gradient from-primary/5 to-transparent pointer-events-none" />
             </div>
          </div>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="py-48 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
          >
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5" />
                Next-Gen Security
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95]">
                Speak naturally. <br />
                Think instantly.
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                Traditional apps focus on translation. LangLab focus on <span className="text-white italic">internalization</span>. 
                Our platform wires your brain for the target language from day one.
              </p>
              <ul className="space-y-6 pt-4">
                {[
                  "Phonetic blueprinting for perfect accents",
                  "Semantic context simulation engine",
                  "Neural feedback loops for retention"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-bold group">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-125 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square glass rounded-[4rem] relative overflow-hidden group shadow-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Layers className="w-48 h-48 text-white/5 animate-pulse" />
                </div>
              </div>
              {/* Floating Stat Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 glass-card p-8 rounded-3xl shadow-3xl z-20 border-white/10"
              >
                <p className="text-5xl font-black text-white mb-1">10X</p>
                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest leading-tight">Faster Synaptic <br />Retention</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-48 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 text-white">Engineered for Mastery</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium tracking-tight">We combined neuro-linguistic programming with generative AI to create the ultimate language learning loop.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group h-full"
              >
                <Card className="h-full p-12 rounded-[3rem] bg-card/30 border-white/5 hover:border-primary/50 transition-all duration-700 relative overflow-hidden glass shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-700 border border-white/10 glow-primary shadow-2xl">
                      <feature.icon className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-3xl font-black mb-6 tracking-tight text-white">{feature.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed font-medium flex-grow">
                      {feature.description}
                    </p>
                    <div className="pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="text-primary font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2">
                        Initialize Module <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - The Premium Table */}
      <section className="py-48 relative">
        <div className="absolute inset-0 bg-white/[0.02] -skew-y-3" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 text-white leading-[0.9]">Simple, Premium <br />Intelligence Plans.</h2>
            <p className="text-2xl text-muted-foreground font-medium tracking-tight">Zero complexity. Just accelerated learning.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* Basic */}
            <Card className="p-12 rounded-[3.5rem] bg-[#0B1020] border-white/5 flex flex-col h-full hover:border-white/20 transition-all duration-500 shadow-3xl">
              <h3 className="text-lg font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-8 italic">Explorer</h3>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-7xl font-black text-white tracking-tighter">$0</span>
                <span className="text-muted-foreground/50 font-bold uppercase tracking-widest text-xs">/lifetime</span>
              </div>
              <ul className="space-y-6 mb-16 flex-grow">
                {["5 Neural Practices Daily", "Core Syntactic Library", "Basic Progress Visuals"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-muted-foreground font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500/50" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="w-full rounded-2xl h-20 glass-morphism text-white font-black hover:bg-white/10 transition-all text-lg">Initialize Session</Button>
            </Card>

            {/* Pro - The Featured One */}
            <Card className="p-12 rounded-[3.5rem] bg-primary/5 border-2 border-primary/50 flex flex-col h-full relative shadow-[0_40px_100px_rgba(108,99,255,0.2)] scale-105 z-10 glass shadow-2xl">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 gradient-primary text-white text-[10px] font-black uppercase tracking-[0.4em] px-8 py-3 rounded-full shadow-2xl z-20">
                Peak Intelligence
              </div>
              <h3 className="text-lg font-black uppercase tracking-[0.3em] text-primary mb-8 italic">Elite</h3>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-7xl font-black text-white tracking-tighter">$19</span>
                <span className="text-white/40 font-bold uppercase tracking-widest text-xs">/month</span>
              </div>
              <ul className="space-y-6 mb-16 flex-grow">
                {[
                  "Unlimited Neural Compute", 
                  "Real-time Phonetic Analysis", 
                  "Custom Cognitive Paths", 
                  "Hyper-realistic AI Avatars",
                  "Priority Sync Across Nodes"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-bold text-sm">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full rounded-2xl h-20 gradient-primary font-black shadow-2xl hover:shadow-primary/50 border-none transition-all text-lg text-white">Unlock Full Access</Button>
            </Card>

            {/* Lifetime */}
            <Card className="p-12 rounded-[3.5rem] bg-[#0B1020] border-white/5 flex flex-col h-full hover:border-white/20 transition-all duration-500 shadow-3xl">
              <h3 className="text-lg font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-8 italic">Infinity</h3>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-7xl font-black text-white tracking-tighter">$299</span>
                <span className="text-muted-foreground/50 font-bold uppercase tracking-widest text-xs">one-time</span>
              </div>
              <ul className="space-y-6 mb-16 flex-grow">
                {["LIFETIME Elite Protocol", "Private Neural Concierge", "White-Glove Node Setup", "Exclusive Beta Invitations"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-muted-foreground font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500/50" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="w-full rounded-2xl h-20 glass-morphism text-white font-black hover:bg-white/10 transition-all text-lg">Secure Infinite Access</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-64 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-6xl mx-auto rounded-[5rem] gradient-primary p-24 text-center relative overflow-hidden shadow-[0_0_120px_rgba(108,99,255,0.4)]"
          >
            <div className="absolute inset-0 grid-background opacity-20" />
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-white/10 rounded-full -mr-[30vw] -mt-[30vw] blur-[120px]" />
            
            <h2 className="text-6xl md:text-9xl font-black tracking-tight text-white mb-12 relative z-10 leading-[0.8]">
              The end of <br /> language barriers.
            </h2>
            <p className="text-2xl mb-16 text-white/80 max-w-2xl mx-auto font-medium relative z-10 tracking-tight leading-relaxed">
              Join the elite circle of learners who are mastering languages 10x faster with the LangLab protocol.
            </p>
            <div className="relative z-10">
              <Link href="/dashboard">
                <Button size="lg" className="rounded-3xl px-20 text-2xl bg-white text-primary hover:bg-zinc-50 h-24 font-black shadow-3xl hover:scale-110 transition-all border-none">
                  Get Lifetime Access
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-24 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-10 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <Sparkles className="w-8 h-8 text-white" />
            <span className="text-3xl font-black tracking-tighter text-white">LANGLAB</span>
          </div>
          <p className="text-muted-foreground/30 text-[10px] font-black uppercase tracking-[0.5em]">
            Neural Network Protocol © 2026 • Crafted for the future
          </p>
        </div>
      </footer>
    </div>
  )
}

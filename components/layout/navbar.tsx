"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, ArrowRight, BrainCircuit } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between px-8 py-4 rounded-[2rem] transition-all duration-700 ${
          scrolled 
            ? "bg-[#0B1020]/60 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border border-transparent"
        }`}>
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-[0_0_30px_rgba(108,99,255,0.4)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <BrainCircuit className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white leading-none">
                LANG<span className="text-[#6C63FF]">LAB</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 italic">Neural Protocol</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-12">
            {[
              { label: "Architecture", href: "#features" },
              { label: "Intelligence", href: "#intelligence" },
              { label: "Economics", href: "#pricing" },
              { label: "Manifesto", href: "#about" },
            ].map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 hover:text-white transition-all hover:tracking-[0.4em] relative group"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hidden sm:block">
              <Button className="rounded-2xl px-10 h-14 gradient-primary border-none shadow-[0_10px_30px_rgba(108,99,255,0.3)] hover:shadow-primary/50 transition-all font-black text-xs uppercase tracking-[0.2em] group text-white">
                Initialize App
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            
            <div className="lg:hidden">
              <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl text-white hover:bg-white/5 border border-white/5">
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, Search, Menu, Trophy, Flame, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { motion } from "framer-motion"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0B1020] relative">
      {/* Background elements */}
      <div className="fixed inset-0 grid-background opacity-[0.05] pointer-events-none" />
      <div className="fixed inset-0 noise-overlay pointer-events-none" />
      <div className="fixed top-0 left-[20%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Sidebar */}
      <Sidebar 
        mobile 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <div className="flex-grow flex flex-col min-w-0 relative z-10">
        {/* Top Navigation */}
        <header className="h-24 bg-[#0B1020]/40 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-8 md:px-12 sticky top-0 z-40">
          <div className="flex items-center gap-8">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-[1.25rem] w-12 h-12 text-white hover:bg-white/5 border border-white/5"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            
            <div className="relative w-80 lg:w-[450px] hidden sm:block group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4 group-focus-within:text-primary transition-all duration-500" />
              <Input 
                placeholder="Search neural nodes, vocabulary, records..." 
                className="pl-14 pr-6 py-7 rounded-2xl bg-white/[0.03] border-white/5 focus-visible:ring-primary/30 focus-visible:bg-white/[0.08] focus-visible:border-primary/30 transition-all text-white placeholder:text-white/10 text-sm font-medium"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6 md:gap-8">
            {/* Real-time Stats */}
            <div className="hidden lg:flex items-center gap-8 px-8 py-3 rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 group cursor-pointer">
                <Flame className="w-5 h-5 text-orange-400 fill-orange-400 group-hover:scale-125 transition-transform duration-500" />
                <span className="font-black text-white text-sm tracking-tighter">12 CYCLE STREAK</span>
              </div>
              <div className="w-[1px] h-4 bg-white/10" />
              <div className="flex items-center gap-3 group cursor-pointer">
                <Zap className="w-5 h-5 text-primary fill-primary group-hover:scale-125 transition-transform duration-500" />
                <span className="font-black text-white text-sm tracking-tighter">2.4K XP</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
               <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl relative text-white/20 hover:text-white hover:bg-white/5 border border-white/5">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_rgba(108,99,255,1)]" />
               </Button>
            </div>

            <div className="flex items-center gap-5 pl-6 border-l border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-white leading-none mb-1.5 uppercase tracking-tighter">Authored User</p>
                <div className="flex items-center justify-end gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
                  <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] italic">Pro Node Active</p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Avatar className="w-14 h-14 border-2 border-primary/20 ring-4 ring-primary/5 shadow-2xl cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-primary/20 text-primary font-black">AD</AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow p-8 md:p-12 lg:p-16 overflow-y-auto relative">
          {children}
        </main>
      </div>
    </div>
  )
}

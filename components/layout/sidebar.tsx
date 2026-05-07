"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Mic2, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  LucideIcon,
  X,
  Zap,
  Globe,
  Cpu,
  Headphones
} from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export interface SidebarItem {
  icon: LucideIcon
  label: string
  href: string
}

const defaultItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Command Center", href: "/dashboard" },
  { icon: BookOpen, label: "Linguistic Nodes", href: "/lessons" },
  { icon: MessageSquare, label: "Neural Chat", href: "/practice/chat" },
  { icon: Mic2, label: "Vocal Sync", href: "/practice/speak" },
  { icon: Headphones, label: "Neural Listening", href: "/practice/listen" },
]

interface SidebarProps {
  items?: SidebarItem[]
  rootHref?: string
  mobile?: boolean
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ 
  items = defaultItems, 
  rootHref = "/", 
  mobile = false,
  isOpen = false,
  onClose
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (mobile && isOpen && onClose) {
      onClose()
    }
  }, [pathname, mobile, isOpen, onClose])

  const sidebarContent = (
    <motion.aside
      initial={mobile ? { x: -320 } : false}
      animate={mobile ? { x: isOpen ? 0 : -320 } : { width: isCollapsed ? 100 : 320 }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
      className={`${
        mobile 
          ? "fixed inset-y-0 left-0 w-[320px]" 
          : "h-screen sticky top-0 shrink-0"
      } bg-[#0B1020] border-r border-white/5 flex flex-col z-50 overflow-hidden`}
    >
      {/* Sidebar background noise and grid */}
      <div className="absolute inset-0 grid-background opacity-[0.03] pointer-events-none" />
      
      <div className="p-10 flex items-center justify-between relative z-10">
        <AnimatePresence mode="wait">
          {(!isCollapsed || mobile) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <Link href={rootHref} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 glow-primary">
                  <BrainCircuit className="text-white w-7 h-7" />
                </div>
                <div className="flex flex-col">
                   <span className="text-2xl font-black tracking-tighter text-white">LANG<span className="text-primary">LAB</span></span>
                   <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 italic">v4.0 Core</span>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!mobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-8 h-8 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all ${isCollapsed ? "mx-auto" : ""}`}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        )}
      </div>

      <nav className="flex-grow px-6 space-y-3 mt-10 relative z-10">
        <p className={`text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6 px-4 ${isCollapsed && !mobile ? "text-center" : ""}`}>
          {isCollapsed && !mobile ? "---" : "Linguistic Ops"}
        </p>
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`relative flex items-center gap-5 p-4 rounded-2xl transition-all duration-500 group overflow-hidden ${
                  isActive 
                    ? "text-white" 
                    : "text-white/40 hover:text-white"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active-glow"
                    className="absolute inset-0 bg-primary/10 border-l-2 border-primary -z-10"
                    transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                  />
                )}
                <item.icon className={`w-6 h-6 transition-all duration-500 ${isActive ? "text-primary scale-110 drop-shadow-[0_0_8px_rgba(108,99,255,0.8)]" : "group-hover:text-primary/70"}`} />
                {(!isCollapsed || mobile) && (
                  <span className={`font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}`}>
                    {item.label}
                  </span>
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      <div className="p-8 mt-auto relative z-10">
        <div className={`rounded-3xl bg-white/[0.03] border border-white/5 p-6 relative overflow-hidden group ${isCollapsed && !mobile ? "p-4" : ""}`}>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all duration-700">
             <Cpu className="w-12 h-12 text-primary" />
          </div>
          {(!isCollapsed || mobile) ? (
            <>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Neural Tier</p>
              <p className="text-sm font-bold text-white mb-5 leading-tight tracking-tight">Expand cognitive capacity today.</p>
              <Button size="sm" className="w-full rounded-xl h-11 text-[10px] font-black uppercase tracking-[0.2em] gradient-primary border-none shadow-xl hover:shadow-primary/30 text-white transition-all">
                Upgrade Node
              </Button>
            </>
          ) : (
            <div className="flex justify-center">
              <Zap className="w-6 h-6 text-primary fill-primary animate-pulse" />
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-2">
          <Button variant="ghost" className={`w-full justify-start rounded-xl gap-5 text-white/30 hover:text-white hover:bg-white/5 h-12 ${isCollapsed && !mobile ? "justify-center px-0" : "px-4"}`}>
            <Settings className="w-5 h-5" />
            {(!isCollapsed || mobile) && <span className="text-[10px] font-black uppercase tracking-[0.2em]">Config</span>}
          </Button>
          <Button variant="ghost" className={`w-full justify-start rounded-xl gap-5 text-white/30 hover:text-red-400 hover:bg-red-500/5 h-12 ${isCollapsed && !mobile ? "justify-center px-0" : "px-4"}`}>
            <LogOut className="w-5 h-5" />
            {(!isCollapsed || mobile) && <span className="text-[10px] font-black uppercase tracking-[0.2em]">Terminate</span>}
          </Button>
        </div>
      </div>
    </motion.aside>
  )

  if (mobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-[#0B1020]/80 backdrop-blur-xl z-40 md:hidden"
            />
            {sidebarContent}
          </>
        )}
      </AnimatePresence>
    )
  }

  return (
    <div className="hidden md:block">
      {sidebarContent}
    </div>
  )
}

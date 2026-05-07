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
  Globe,
  LucideIcon,
  X
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
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: BookOpen, label: "Lessons", href: "/lessons" },
  { icon: MessageSquare, label: "AI Chat", href: "/practice/chat" },
  { icon: Mic2, label: "Speaking", href: "/practice/speak" },
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

  // Close mobile sidebar on route change
  useEffect(() => {
    if (mobile && isOpen && onClose) {
      onClose()
    }
  }, [pathname, mobile, isOpen, onClose])

  const sidebarContent = (
    <motion.aside
      initial={mobile ? { x: -280 } : false}
      animate={mobile ? { x: isOpen ? 0 : -280 } : { width: isCollapsed ? 80 : 280 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className={`${
        mobile 
          ? "fixed inset-y-0 left-0 w-[280px]" 
          : "h-screen sticky top-0 shrink-0"
      } bg-card border-r flex flex-col z-50 transition-all duration-300 shadow-xl md:shadow-none`}
    >
      <div className="p-6 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {(!isCollapsed || mobile) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Link href={rootHref} className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Globe className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent gradient-primary">
                  LangLab
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        
        {mobile ? (
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
            <X />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-xl hover:bg-primary/10 hover:text-primary"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        )}
      </div>

      <nav className="flex-grow px-4 space-y-2 mt-4">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`flex items-center gap-4 p-3 rounded-2xl transition-all group ${
                  isActive 
                    ? "gradient-primary text-white shadow-lg" 
                    : "hover:bg-primary/5 text-muted-foreground hover:text-primary"
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className={`w-6 h-6 ${isActive ? "text-white" : "group-hover:text-primary"}`} />
                {(!isCollapsed || mobile) && (
                  <span className="font-medium">{item.label}</span>
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t space-y-2">
        <Button variant="ghost" className="w-full justify-start rounded-2xl gap-4 text-muted-foreground hover:text-primary hover:bg-primary/5">
          <Settings className="w-6 h-6" />
          {(!isCollapsed || mobile) && <span>Settings</span>}
        </Button>
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
              className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
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

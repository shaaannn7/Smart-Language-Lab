"use client"

import { Sidebar, SidebarItem } from "@/components/layout/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, Search, Users, BarChart3, ShieldCheck, Settings, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const adminMenuItems: SidebarItem[] = [
  { icon: BarChart3, label: "Analytics", href: "/admin" },
  { icon: Users, label: "User Management", href: "/admin/users" },
  { icon: ShieldCheck, label: "Content Control", href: "/admin/content" },
  { icon: Settings, label: "System Settings", href: "/admin/settings" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Desktop Sidebar */}
      <Sidebar items={adminMenuItems} rootHref="/admin" />
      
      {/* Mobile Sidebar */}
      <Sidebar 
        mobile 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        items={adminMenuItems} 
        rootHref="/admin"
      />

      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="h-20 bg-card border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-xl"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            
            <div className="relative w-64 lg:w-96 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search users, transactions, logs..." 
                className="pl-10 rounded-xl bg-muted/50 border-none focus-visible:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="rounded-xl relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <div className="flex items-center gap-3 pl-2 md:pl-4 border-l">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Admin User</p>
                <p className="text-xs text-primary font-medium">Super Admin</p>
              </div>
              <Avatar className="w-10 h-10 border-2 border-primary/20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

"use client"

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Download, 
  Users, 
  CreditCard, 
  TrendingUp, 
  MoreVertical,
  Filter,
  Sparkles,
  Activity,
  Zap,
  Globe,
  Layers
} from "lucide-react"
import { motion } from "framer-motion"

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", plan: "Elite", status: "Active", joined: "May 1, 2026" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", plan: "Explorer", status: "Inactive", joined: "Apr 28, 2026" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", plan: "Infinity", status: "Active", joined: "Apr 25, 2026" },
  { id: 4, name: "Elena Rodriguez", email: "elena@example.com", plan: "Elite", status: "Active", joined: "Apr 20, 2026" },
  { id: 5, name: "David Chen", email: "david@example.com", plan: "Explorer", status: "Active", joined: "Apr 15, 2026" },
]

export default function AdminPanel() {
  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] font-black uppercase tracking-[0.4em] text-[10px]">
            <Sparkles className="w-4 h-4" />
            Global Control Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight italic">
            Neural <span className="text-gradient-primary">Intelligence Hub.</span>
          </h1>
          <p className="text-muted-foreground font-medium text-xl max-w-2xl leading-relaxed">
            Real-time telemetry and management of the LangLab neural network.
          </p>
        </div>
        <Button className="rounded-[2rem] gradient-primary h-20 px-12 shadow-3xl hover:shadow-primary/50 transition-all font-black text-lg border-none text-white group">
          <Download className="mr-3 w-6 h-6 group-hover:translate-y-1 transition-transform" />
          Export Core Data
        </Button>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { label: "Active Nodes", value: "12,450", icon: Users, delta: "+12%", color: "text-[#6C63FF]" },
          { label: "Neural Revenue", value: "$45,200", icon: CreditCard, delta: "+8%", color: "text-[#00D1FF]" },
          { label: "Engagement Stream", value: "1,280", icon: Activity, delta: "+5%", color: "text-emerald-400" },
        ].map((stat, i) => (
          <Card key={i} className="p-10 border border-white/5 bg-[#131A2E]/50 backdrop-blur-3xl rounded-[3.5rem] relative overflow-hidden group shadow-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg px-3 py-1 font-black text-[10px]">{stat.delta}</Badge>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.3em] mb-2 italic">{stat.label}</p>
              <p className="text-5xl font-black text-white tracking-tighter">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Node Management */}
      <Card className="border border-white/5 bg-[#131A2E]/30 backdrop-blur-2xl rounded-[4rem] overflow-hidden shadow-3xl relative">
        <div className="absolute inset-0 grid-background opacity-[0.02] pointer-events-none" />
        
        <div className="p-12 border-b border-white/5 flex flex-col xl:flex-row items-center justify-between gap-10 relative z-10">
          <div className="relative w-full xl:w-[600px] group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within:text-primary transition-all duration-500" />
            <Input 
              placeholder="Search user nodes by ID, alias or neural hash..." 
              className="pl-16 pr-8 py-8 rounded-[2rem] bg-white/[0.03] border-white/10 focus-visible:bg-white/[0.06] focus-visible:ring-primary/20 transition-all text-white placeholder:text-white/10 text-lg font-medium" 
            />
          </div>
          <div className="flex items-center gap-6 w-full xl:w-auto">
            <Button variant="ghost" className="rounded-2xl h-16 px-10 glass border-white/5 text-white/60 font-black text-xs uppercase tracking-[0.2em] hover:text-white transition-all">
              <Filter className="mr-3 w-4 h-4" />
              Filter Matrix
            </Button>
            <Button variant="ghost" className="rounded-2xl h-16 px-10 glass border-white/5 text-white/60 font-black text-xs uppercase tracking-[0.2em] hover:text-white transition-all">
               Temporal Range
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto relative z-10">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="w-[400px] px-12 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">User Node</TableHead>
                <TableHead className="px-12 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Protocol Tier</TableHead>
                <TableHead className="px-12 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Sync Status</TableHead>
                <TableHead className="px-12 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Initialization</TableHead>
                <TableHead className="text-right px-12 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Ops</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <TableCell className="px-12 py-8">
                    <div className="flex items-center gap-6">
                      <Avatar className="w-14 h-14 border-2 border-white/5 group-hover:border-primary/50 transition-all duration-500 shadow-xl">
                        <AvatarImage src={`https://avatar.vercel.sh/${user.name}.png`} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-black text-white text-xl tracking-tight group-hover:text-primary transition-colors duration-500 italic">{user.name}</p>
                        <p className="text-xs font-medium text-white/20 tracking-tight">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-12 py-8">
                    <Badge className={`rounded-xl px-4 py-1.5 font-black text-[9px] uppercase tracking-[0.3em] italic shadow-2xl ${
                      user.plan === "Elite" ? "bg-[#6C63FF]/20 text-[#6C63FF] border-[#6C63FF]/30" : 
                      user.plan === "Infinity" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                      "bg-white/5 text-white/40 border-white/10"
                    }`}>
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-12 py-8">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_rgba(0,0,0,1)] ${user.status === "Active" ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" : "bg-white/10"}`} />
                      <span className={`text-xs font-black uppercase tracking-widest ${user.status === "Active" ? "text-white" : "text-white/20"}`}>{user.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-12 py-8 text-xs font-black text-white/40 uppercase tracking-widest italic">{user.joined}</TableCell>
                  <TableCell className="text-right px-12 py-8">
                    <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/20 hover:text-white transition-all shadow-xl">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-12 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Visualizing 5 of 12,450 neural nodes</p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="rounded-xl h-12 px-8 glass border-white/5 text-white/40 font-black text-[10px] uppercase tracking-widest" disabled>Prev Cluster</Button>
            <Button variant="ghost" className="rounded-xl h-12 px-8 glass border-white/5 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/5">Next Cluster</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

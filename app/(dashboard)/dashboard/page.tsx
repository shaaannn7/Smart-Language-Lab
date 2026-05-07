import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Flame, 
  Trophy, 
  Target, 
  Clock, 
  PlayCircle, 
  ArrowRight,
  Zap,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  Activity,
  Layers,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { getDashboardStats } from "@/app/actions/learning"
import { auth } from "@/auth"

export default async function StudentDashboard() {
  const session = await auth()
  const statsData = await getDashboardStats()

  const stats = [
    { label: "Daily Streak", value: `${statsData?.streak ?? 0} Days`, icon: Flame, color: "text-orange-400", glow: "shadow-[0_0_40px_rgba(249,115,22,0.15)]" },
    { label: "Neural XP", value: statsData?.xp?.toLocaleString() || "0", icon: Zap, color: "text-[#6C63FF]", glow: "shadow-[0_0_40px_rgba(108,99,255,0.15)]" },
    { label: "Lessons Mastered", value: statsData?.lessonsCompleted?.toString() || "0", icon: Trophy, color: "text-yellow-400", glow: "shadow-[0_0_40px_rgba(234,179,8,0.15)]" },
    { label: "Active Nodes", value: statsData?.timeSpent || "0h", icon: Activity, color: "text-[#00D1FF]", glow: "shadow-[0_0_40px_rgba(0,209,255,0.15)]" },
  ]

  const challenges = [
    { title: "Phonetic Precision", progress: 65, goal: "Maintain 95% accuracy", icon: BrainCircuit },
    { title: "Lexical Synthesis", progress: 40, goal: "Acquire 12 new tokens", icon: Sparkles },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 pt-6">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] font-black uppercase tracking-[0.3em] text-[10px]">
            <Sparkles className="w-3 h-3" />
            Neural Protocol v4.2
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Welcome, <span className="text-gradient-primary">{session?.user?.name?.split(' ')[0] || "Learner"}</span>.
          </h1>
          <p className="text-muted-foreground font-medium text-xl max-w-2xl leading-relaxed">
            Your linguistic internalization is <span className="text-white font-bold">12.4%</span> more efficient than the previous cycle.
          </p>
        </div>
        <Link href="/lessons">
          <Button className="rounded-2xl gradient-primary h-20 px-10 shadow-[0_20px_40px_rgba(108,99,255,0.25)] hover:shadow-primary/50 transition-all group border-none text-lg font-black text-white">
            Resume Protocol
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <Card key={i} className={`p-8 bg-[#131A2E]/50 border-white/5 backdrop-blur-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden relative group hover:bg-[#131A2E] hover:border-white/10 ${stat.glow}`}>
            <div className="flex flex-col items-start gap-6 relative z-10">
               <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-700`}>
                 <stat.icon className={`w-8 h-8 ${stat.color}`} />
               </div>
               <div>
                 <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 italic">{stat.label}</p>
                 <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
               </div>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
               <stat.icon className="w-32 h-32 text-white" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Main Learning Card */}
        <Card className="xl:col-span-2 p-12 border border-white/10 rounded-[4rem] relative overflow-hidden bg-gradient-to-br from-[#6C63FF]/20 via-[#131A2E] to-[#131A2E] backdrop-blur-3xl group shadow-3xl">
          <div className="relative z-10 h-full flex flex-col justify-between min-h-[400px]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">
                Current Node
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9]">
                  Mastering <br /> <span className="text-gradient-primary italic">Complex Nuance.</span>
                </h2>
                <p className="text-muted-foreground font-medium text-xl max-w-xl leading-relaxed">
                  Synthesizing formal honorifics and cultural context through our latest neural simulation module.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-10 mt-16">
              <Link href="/lessons" className="w-full md:w-auto">
                <Button size="lg" className="bg-white text-[#6C63FF] hover:bg-zinc-100 rounded-3xl px-12 font-black h-20 w-full shadow-3xl hover:scale-105 transition-transform border-none text-lg">
                  <PlayCircle className="mr-3 w-8 h-8 fill-[#6C63FF]/10" />
                  Initiate Sync
                </Button>
              </Link>
              <div className="flex-grow w-full space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-[#6C63FF]">
                  <span>Internalization Progress</span>
                  <span>75%</span>
                </div>
                <div className="relative h-4 w-full">
                  <div className="absolute inset-0 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full gradient-primary w-[75%] rounded-full shadow-[0_0_20px_rgba(108,99,255,0.5)]" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 blur-2xl -z-10 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform origin-top translate-x-32 group-hover:translate-x-24 transition-transform duration-[2000ms] ease-out" />
          <BrainCircuit className="absolute -bottom-20 -right-20 w-96 h-96 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-[2000ms] ease-out" />
        </Card>

        {/* Daily Objectives */}
        <div className="h-full">
          <Card className="p-10 bg-[#131A2E]/40 border-white/5 rounded-[3.5rem] backdrop-blur-2xl h-full shadow-3xl border-t-white/10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight italic">Active Quests</h3>
                <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em] mt-2">Cycle #824</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center glow-primary">
                <Target className="text-[#6C63FF] w-7 h-7" />
              </div>
            </div>
            
            <div className="space-y-12">
              {challenges.map((challenge, i) => (
                <div key={i} className="space-y-6 group cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-[1.25rem] bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500">
                      <challenge.icon className="w-7 h-7 text-[#6C63FF]" />
                    </div>
                    <div>
                      <p className="font-black text-white text-lg tracking-tight group-hover:text-[#6C63FF] transition-colors">{challenge.title}</p>
                      <p className="text-xs font-bold text-muted-foreground/60 italic">{challenge.goal}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full gradient-primary rounded-full transition-all duration-1000" style={{ width: `${challenge.progress}%` }} />
                    </div>
                    <div className="flex justify-end">
                       <span className="text-[9px] font-black text-[#6C63FF] uppercase tracking-widest">{challenge.progress}% COMPLETE</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" className="w-full mt-16 rounded-2xl h-20 glass border-dashed border-2 border-white/5 hover:border-[#6C63FF]/30 hover:bg-[#6C63FF]/5 text-muted-foreground hover:text-[#6C63FF] transition-all font-black text-xs uppercase tracking-[0.3em] group">
              View All Quests
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </div>
      </div>

      {/* Activity Analytics */}
      <Card className="p-12 bg-[#131A2E]/30 border-white/5 rounded-[4rem] backdrop-blur-3xl shadow-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <Layers className="w-64 h-64 text-white" />
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] bg-emerald-400/5 px-4 py-1 rounded-full border border-emerald-400/10">
              <TrendingUp className="w-3.5 h-3.5" />
              Engagement velocity: Optimized
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic">Synaptic Activity</h3>
            <p className="text-muted-foreground font-medium text-lg">Neural node utilization over the current temporal cycle.</p>
          </div>
          <div className="flex items-center gap-3 p-1.5 bg-white/5 rounded-[1.5rem] border border-white/10 backdrop-blur-md">
             <Button variant="ghost" size="sm" className="rounded-xl text-[10px] font-black uppercase tracking-[0.3em] px-6 h-10 bg-[#6C63FF] text-white shadow-xl">Weekly</Button>
             <Button variant="ghost" size="sm" className="rounded-xl text-[10px] font-black uppercase tracking-[0.3em] px-6 h-10 text-muted-foreground hover:text-white transition-colors">Monthly</Button>
          </div>
        </div>
        
        <div className="h-80 w-full flex items-end justify-between gap-4 md:gap-8 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#6C63FF]/5 to-transparent pointer-events-none" />
          {[40, 70, 45, 90, 65, 80, 55].map((val, i) => (
            <div key={i} className="flex-grow group relative h-full flex items-end">
              <div
                className="w-full rounded-2xl bg-white/5 relative transition-all duration-700 group-hover:bg-[#6C63FF]/20 cursor-pointer overflow-hidden border border-white/5"
                style={{ height: `${val}%` }}
              >
                <div className="absolute bottom-0 left-0 w-full gradient-primary opacity-40 group-hover:opacity-100 transition-all duration-700" style={{ height: `100%` }} />
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 glass border-white/20 text-white px-4 py-2 rounded-2xl text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-3xl z-30 whitespace-nowrap">
                  NODE #{i+1} • {val * 120} UNITS
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-10 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.5em] px-6">
          {["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta"].map(day => <span key={day}>{day}</span>)}
        </div>
      </Card>
    </div>
  )
}

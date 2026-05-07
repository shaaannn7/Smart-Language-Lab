import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Lock, 
  CheckCircle2, 
  BookOpen,
  Headphones,
  Mic2,
  MessageSquare,
  Sparkles,
  Zap,
  ArrowRight,
  BrainCircuit,
  Globe
} from "lucide-react"
import { getLessons } from "@/app/actions/learning"

const iconMap = {
  VOCABULARY: BookOpen,
  GRAMMAR: MessageSquare,
  SPEAKING: Mic2,
  LISTENING: Headphones
}

export default async function LessonsPage() {
  const lessons = await getLessons()

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-20 pt-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] font-black uppercase tracking-[0.4em] text-[10px]">
            <BrainCircuit className="w-4 h-4" />
            Curriculum Protocol v4.2
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
            Learning <span className="text-gradient-primary italic">Trajectory.</span>
          </h1>
          <p className="text-muted-foreground font-medium text-xl max-w-2xl leading-relaxed">
            Personalized linguistic nodes calibrated for maximum synaptic internalization.
          </p>
        </div>
        <div className="flex items-center gap-4 px-6 py-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
           <div className="text-right">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Active Path</p>
              <p className="text-sm font-black text-white uppercase tracking-widest">Spanish (Spain)</p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Globe className="text-primary w-6 h-6" />
           </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-[#131A2E]/50 p-1.5 rounded-2xl mb-16 border border-white/5 backdrop-blur-2xl inline-flex">
          <TabsTrigger value="all" className="rounded-xl px-10 h-12 text-[10px] font-black uppercase tracking-[0.3em] data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">All Nodes</TabsTrigger>
          <TabsTrigger value="active" className="rounded-xl px-10 h-12 text-[10px] font-black uppercase tracking-[0.3em] data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">In Progress</TabsTrigger>
          <TabsTrigger value="completed" className="rounded-xl px-10 h-12 text-[10px] font-black uppercase tracking-[0.3em] data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">Mastered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 outline-none">
          {lessons.length === 0 && (
            <div className="col-span-full py-40 text-center bg-[#131A2E]/30 rounded-[4rem] border border-white/5 border-dashed relative overflow-hidden group">
              <div className="absolute inset-0 grid-background opacity-[0.03] pointer-events-none" />
              <div className="w-24 h-24 rounded-[2.5rem] bg-white/[0.02] flex items-center justify-center mx-auto mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-700">
                <BookOpen className="w-12 h-12 text-white/10" />
              </div>
              <p className="text-2xl font-black text-white/20 tracking-tighter uppercase italic">Initializing Path...</p>
              <p className="text-xs font-bold text-white/10 mt-4 tracking-[0.4em] uppercase">Checking Neural Database</p>
            </div>
          )}
          {lessons.map((lesson: any) => {
            const Icon = iconMap[lesson.type as keyof typeof iconMap] || BookOpen
            const isLocked = lesson.status === "locked"
            const isCompleted = lesson.status === "completed"
            
            return (
              <Card 
                key={lesson.id} 
                className={`group relative p-10 rounded-[3.5rem] border-white/5 bg-[#131A2E]/40 backdrop-blur-3xl transition-all duration-700 flex flex-col h-full overflow-hidden ${
                  isLocked 
                    ? "opacity-30 grayscale pointer-events-none" 
                    : "hover:bg-[#131A2E] hover:border-primary/40 hover:-translate-y-4 cursor-pointer shadow-3xl"
                }`}
              >
                <div className="absolute inset-0 grid-background opacity-[0.02] pointer-events-none" />
                
                <div className="flex items-start justify-between mb-10 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                    isLocked ? "bg-white/5" : "bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 group-hover:rotate-6 glow-primary shadow-2xl"
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  {isCompleted ? (
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                    </div>
                  ) : isLocked ? (
                    <Lock className="text-white/20 w-7 h-7" />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                       <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                       <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">Active Node</span>
                    </div>
                  )}
                </div>

                <div className="flex-grow space-y-6 relative z-10">
                  <Badge variant="secondary" className="bg-white/5 text-muted-foreground border-white/10 rounded-xl px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.4em] italic">{lesson.type}</Badge>
                  <h3 className="text-3xl font-black text-white tracking-tight leading-tight group-hover:text-primary transition-colors duration-500 italic">{lesson.title}</h3>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed line-clamp-3 group-hover:text-white/70 transition-colors duration-500">{lesson.description}</p>
                </div>

                <div className="mt-12 space-y-8 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                      <span>Internalization</span>
                      <span className={isCompleted ? "text-emerald-500" : "text-primary"}>{lesson.progress}%</span>
                    </div>
                    <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className={`h-full rounded-full transition-all duration-[1.5s] ease-out ${isCompleted ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "gradient-primary shadow-[0_0_15px_rgba(108,99,255,0.5)]"}`} 
                        style={{ width: `${lesson.progress}%` }} 
                      />
                    </div>
                  </div>
                  
                  <Link href={`/lessons/${lesson.id}`} className="block w-full">
                    <Button 
                      disabled={isLocked}
                      className={`w-full rounded-3xl h-16 font-black transition-all border-none text-md tracking-tight ${
                        isCompleted 
                          ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 shadow-none border border-emerald-500/20" 
                          : "gradient-primary shadow-2xl hover:scale-105 text-white" 
                      }`}
                    >
                      {isCompleted ? "Review Node" : "Initiate Unit"}
                      <ArrowRight className={`ml-3 w-6 h-6 transition-transform duration-500 ${isCompleted ? "" : "group-hover:translate-x-2"}`} />
                    </Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}

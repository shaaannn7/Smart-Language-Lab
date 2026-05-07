import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { 
  Flame, 
  Trophy, 
  Target, 
  Clock, 
  PlayCircle, 
  ArrowRight,
  Zap
} from "lucide-react"
import Link from "next/link"
import { getDashboardStats } from "@/app/actions/learning"
import { auth } from "@/auth"

export default async function StudentDashboard() {
  const session = await auth()
  const statsData = await getDashboardStats()

  const stats = [
    { label: "Daily Streak", value: `${statsData?.streak ?? 0} Days`, icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Total XP", value: statsData?.xp?.toLocaleString() || "0", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Lessons Done", value: statsData?.lessonsCompleted?.toString() || "0", icon: Trophy, color: "text-primary", bg: "bg-primary/10" },
    { label: "Time Spent", value: statsData?.timeSpent || "0h", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
  ]

  const challenges = [
    { title: "Speaking Sprint", progress: 65, goal: "Practice for 15 mins", icon: Target },
    { title: "Vocabulary Builder", progress: 40, goal: "Learn 10 new words", icon: Zap },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name || "Learner"}! 👋</h1>
          <p className="text-muted-foreground">You&apos;re doing great! Keep up the momentum to reach your goals.</p>
        </div>
        <Link href="/lessons">
          <Button className="rounded-2xl gradient-primary h-12 px-6 shadow-lg hover:shadow-primary/20 group">
            Continue Learning
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-md hover:shadow-xl transition-all rounded-3xl overflow-hidden relative group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`} />
            <stat.icon className={`w-10 h-10 ${stat.color} mb-4 relative z-10`} />
            <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Learning Card */}
        <Card className="lg:col-span-2 p-8 border-none shadow-md rounded-3xl relative overflow-hidden bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <Badge className="bg-white/20 text-white hover:bg-white/30 border-none mb-4 rounded-lg px-3 py-1">Current Module</Badge>
              <h2 className="text-4xl font-bold mb-4">Intermediate Spanish: <br />Business Negotiations</h2>
              <p className="opacity-90 max-w-md mb-8">Learn how to navigate complex discussions, handle objections, and close deals in Spanish.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/lessons">
                <Button size="lg" className="bg-white text-primary hover:bg-zinc-100 rounded-2xl px-8 font-bold h-14 w-full sm:w-auto">
                  <PlayCircle className="mr-2 w-6 h-6" />
                  Resume Lesson
                </Button>
              </Link>
              <div className="flex-grow w-full">
                <div className="flex items-center justify-between mb-2 text-sm font-medium">
                  <span>Module Progress</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-3 bg-white/20" />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 -skew-x-12 transform origin-top translate-x-20" />
        </Card>

        {/* Daily Challenges */}
        <div className="space-y-6">
          <Card className="p-6 border-none shadow-md rounded-3xl h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Daily Challenges</h3>
              <Target className="text-primary w-5 h-5" />
            </div>
            
            <div className="space-y-6">
              {challenges.map((challenge, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <challenge.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{challenge.title}</p>
                      <p className="text-xs text-muted-foreground">{challenge.goal}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={challenge.progress} className="h-2" />
                    <span className="text-xs font-bold whitespace-nowrap">{challenge.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-8 rounded-xl border-dashed border-2 hover:border-primary hover:text-primary transition-all">
              View All Goals
            </Button>
          </Card>
        </div>
      </div>

      {/* Activity Graph Placeholder */}
      <Card className="p-8 border-none shadow-md rounded-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold">Activity Level</h3>
            <p className="text-sm text-muted-foreground">Your XP gain over the last 7 days</p>
          </div>
          <select className="bg-muted px-3 py-1 rounded-lg text-sm font-medium outline-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
        
        <div className="h-64 w-full flex items-end justify-between gap-2 md:gap-4 px-4">
          {[40, 70, 45, 90, 65, 80, 55].map((val, i) => (
            <div
              key={i}
              className="flex-grow rounded-t-xl gradient-primary relative group cursor-pointer"
              style={{ height: `${val}%` }}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                {val * 10} XP
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs font-medium text-muted-foreground px-4">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </Card>
    </div>
  )
}


import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Lock, 
  Play, 
  CheckCircle2, 
  BookOpen,
  Headphones,
  Mic2,
  MessageSquare
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
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Learning Path</h1>
        <p className="text-muted-foreground">Master Spanish one step at a time with our curated curriculum.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-2xl mb-8">
          <TabsTrigger value="all" className="rounded-xl px-6">All Lessons</TabsTrigger>
          <TabsTrigger value="active" className="rounded-xl px-6">Active</TabsTrigger>
          <TabsTrigger value="completed" className="rounded-xl px-6">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.length === 0 && (
            <div className="col-span-full py-20 text-center opacity-50">
              <BookOpen className="w-12 h-12 mx-auto mb-4" />
              <p>No lessons available yet. Check back soon!</p>
            </div>
          )}
          {lessons.map((lesson: any) => {
            const Icon = iconMap[lesson.type as keyof typeof iconMap] || BookOpen
            return (
              <Card 
                key={lesson.id} 
                className={`p-6 rounded-3xl border-none shadow-md transition-all flex flex-col h-full ${
                  lesson.status === "locked" ? "opacity-60 bg-muted/20" : "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    lesson.status === "locked" ? "bg-zinc-200 dark:bg-zinc-800" : "bg-primary/10 text-primary"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {lesson.status === "completed" && (
                    <CheckCircle2 className="text-green-500 w-6 h-6" />
                  )}
                  {lesson.status === "locked" && (
                    <Lock className="text-muted-foreground w-6 h-6" />
                  )}
                </div>

                <div className="flex-grow">
                  <Badge variant="secondary" className="mb-2 rounded-lg">{lesson.type}</Badge>
                  <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{lesson.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Progress</span>
                    <span>{lesson.progress}%</span>
                  </div>
                  <Progress value={lesson.progress} className="h-2" />
                  
                  <Button 
                    disabled={lesson.status === "locked"}
                    className={`w-full rounded-xl h-12 font-bold ${
                      lesson.status === "completed" 
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                        : lesson.status === "active" 
                        ? "gradient-primary shadow-lg shadow-primary/20" 
                        : ""
                    }`}
                    variant={lesson.status === "locked" ? "secondary" : "default"}
                  >
                    {lesson.status === "completed" ? "Review Lesson" : lesson.status === "active" ? "Continue" : "Locked"}
                    {lesson.status !== "locked" && <Play className="ml-2 w-4 h-4 fill-current" />}
                  </Button>
                </div>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}


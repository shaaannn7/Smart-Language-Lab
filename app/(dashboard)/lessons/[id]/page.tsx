"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BrainCircuit, 
  ChevronLeft,
  XCircle,
  Trophy,
  Zap
} from "lucide-react"
import Link from "next/link"

import { completeLesson } from "@/app/actions/progress"

export default function LessonDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [lesson, setLesson] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  // Mock data for demonstration if DB fetch fails or while loading
  const mockLesson = {
    title: "Greeting & Introductions",
    description: "Learn basic greetings and how to introduce yourself to others.",
    type: "VOCABULARY",
    exercises: [
      { question: "How do you say 'Hello' in Spanish?", answer: "Hola" },
      { question: "How do you say 'Good morning'?", answer: "Buenos días" },
      { question: "Translate 'Thank you'", answer: "Gracias" },
      { question: "How do you say 'Please'?", answer: "Por favor" }
    ]
  }

  useEffect(() => {
    // In a real app, we would fetch the lesson by ID
    // For now, we'll use the mock data
    setLesson(mockLesson)
  }, [params.id])

  useEffect(() => {
    if (isFinished && params.id) {
      const finalScore = Math.round((score / lesson.exercises.length) * 100)
      completeLesson(params.id as string, finalScore)
    }
  }, [isFinished, params.id, score, lesson])

  if (!lesson) return null

  const currentExercise = lesson.exercises[currentStep]
  const progress = ((currentStep) / lesson.exercises.length) * 100

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (showFeedback) return

    const normalizedUserAnswer = userAnswer.trim().toLowerCase()
    const normalizedCorrectAnswer = currentExercise.answer.toLowerCase()

    const correct = normalizedUserAnswer === normalizedCorrectAnswer
    setIsCorrect(correct)
    if (correct) setScore(prev => prev + 1)
    setShowFeedback(true)
  }

  const handleNext = () => {
    setShowFeedback(false)
    setUserAnswer("")
    if (currentStep < lesson.exercises.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  if (isFinished) {
    const finalScore = Math.round((score / lesson.exercises.length) * 100)
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 rounded-[2.5rem] gradient-primary flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(108,99,255,0.4)]"
        >
          <Trophy className="w-16 h-16 text-white" />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tighter text-white">Protocol Complete.</h1>
          <p className="text-xl text-muted-foreground font-medium">Neural synchronization successful at {finalScore}% efficiency.</p>
        </div>

        <Card className="p-10 bg-white/5 border-white/10 rounded-[3rem] backdrop-blur-3xl">
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Internalized</p>
              <p className="text-4xl font-black text-white">{score}/{lesson.exercises.length}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Neural XP</p>
              <p className="text-4xl font-black text-primary">+{finalScore * 10}</p>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-center gap-6">
          <Link href="/lessons">
            <Button variant="ghost" className="rounded-2xl h-16 px-10 text-muted-foreground font-bold hover:text-white hover:bg-white/5">
              Back to Trajectory
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="rounded-2xl h-16 px-12 gradient-primary font-black shadow-xl border-none">
              Command Center
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4">
        <Link href="/lessons">
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl text-muted-foreground hover:text-white hover:bg-white/5">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex-grow max-w-xl px-10">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full gradient-primary shadow-[0_0_15px_rgba(108,99,255,0.5)]" 
            />
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
           <Zap className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Exercise Area */}
      <Card className="p-12 md:p-20 border border-white/10 bg-[#131A2E]/40 backdrop-blur-3xl rounded-[4rem] relative overflow-hidden shadow-3xl">
        <div className="absolute inset-0 grid-background opacity-[0.03] pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12 relative z-10"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                <BrainCircuit className="w-3.5 h-3.5" />
                Vocabulary Sync
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight italic">
                {currentExercise.question}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-0 group-focus-within:opacity-100 transition-all rounded-full -z-10" />
                <input
                  autoFocus
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={showFeedback}
                  placeholder="Type your translation..."
                  className="w-full bg-white/[0.03] border-2 border-white/5 focus:border-primary/50 focus:bg-white/[0.08] rounded-3xl px-10 py-8 text-2xl font-bold text-white placeholder:text-white/10 outline-none transition-all shadow-2xl"
                />
              </div>

              {!showFeedback ? (
                <Button 
                  type="submit" 
                  disabled={!userAnswer.trim()}
                  className="w-full h-20 rounded-3xl gradient-primary font-black text-lg shadow-3xl border-none"
                >
                  Verify Sync
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-10 rounded-[2.5rem] flex items-center justify-between ${
                    isCorrect 
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500" 
                      : "bg-red-500/10 border border-red-500/20 text-red-500"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${
                      isCorrect ? "bg-emerald-500/10 border-emerald-500/30" : "bg-red-500/10 border-red-500/30"
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest mb-1 italic">
                        {isCorrect ? "Perfect Alignment" : "Neural Drift Detected"}
                      </p>
                      <p className="text-xl font-black tracking-tight">
                        {isCorrect ? "Excellent. Move to next node." : `Correction: ${currentExercise.answer}`}
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleNext}
                    className={`h-16 px-10 rounded-2xl font-black border-none text-white ${
                      isCorrect ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  >
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </form>
          </motion.div>
        </AnimatePresence>
      </Card>

      <div className="flex justify-center text-[10px] font-black uppercase tracking-[0.5em] text-white/10 italic">
        Neural Sync Protocol Active • Encrypted Stream
      </div>
    </div>
  )
}

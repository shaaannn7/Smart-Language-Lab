"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Play, RotateCcw, CheckCircle2, AlertCircle, Info, Loader2 } from "lucide-react"
import { Waveform } from "@/components/shared/waveform"

const phrase = "La tecnología está cambiando el mundo rápidamente."
const translation = "Technology is changing the world rapidly."

export default function SpeakingPracticePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecorded, setHasRecorded] = useState(false)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [result, setResult] = useState<{
    score: number;
    accuracy: number;
    fluency: number;
    feedback: string;
    transcription: string;
  } | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        evaluateSpeech(audioBlob)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setHasRecorded(false)
      setResult(null)
    } catch (err) {
      console.error("Error accessing microphone:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setHasRecorded(true)
    }
  }

  const evaluateSpeech = async (audioBlob: Blob) => {
    setIsEvaluating(true)
    try {
      const formData = new FormData()
      formData.append("audio", audioBlob, "speech.wav")
      formData.append("expectedText", phrase)

      const response = await fetch("/api/speech/evaluate", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data)
      }
    } catch (err) {
      console.error("Evaluation failed:", err)
    } finally {
      setIsEvaluating(false)
    }
  }

  const reset = () => {
    setIsRecording(false)
    setHasRecorded(false)
    setResult(null)
    setIsEvaluating(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Speaking Practice</h1>
        <p className="text-muted-foreground">Read the phrase aloud and get instant feedback on your pronunciation.</p>
      </div>

      {/* Phrase Card */}
      <Card className="p-12 text-center rounded-3xl border-none shadow-xl glass relative overflow-hidden">
        <div className="absolute top-4 left-4">
          <Badge variant="outline" className="rounded-lg px-3 py-1 border-primary/20 text-primary">Intermediate</Badge>
        </div>
        
        <div className="space-y-6 relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Read this phrase:</p>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            {phrase}
          </h2>
          <p className="text-xl text-muted-foreground italic font-medium">
            &quot;{translation}&quot;
          </p>
          
          <Button variant="ghost" size="sm" className="rounded-full text-primary hover:bg-primary/5">
            <Play className="mr-2 w-4 h-4 fill-current" />
            Listen to Native Speaker
          </Button>
        </div>

        {/* Feedback Alert */}
        <AnimatePresence>
          {result?.feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-left flex items-start gap-4"
            >
              <Info className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold mb-1">Feedback:</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.feedback}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Interaction Area */}
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0.1 }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-primary rounded-full -z-10"
              />
            )}
          </AnimatePresence>
          
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isEvaluating}
            className={`w-28 h-28 rounded-full shadow-2xl transition-all ${
              isRecording 
                ? "bg-destructive hover:bg-destructive/90 scale-110" 
                : "gradient-primary hover:scale-105"
            }`}
          >
            {isEvaluating ? (
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            ) : (
              <Mic className={`w-12 h-12 text-white ${isRecording ? "animate-pulse" : ""}`} />
            )}
          </Button>
        </div>

        <div className="h-12">
          <Waveform active={isRecording} />
        </div>

        <p className="font-medium text-muted-foreground">
          {isRecording ? "Recording... Click to stop" : isEvaluating ? "AI is analyzing your voice..." : hasRecorded ? "Analysis complete!" : "Click the mic to start speaking"}
        </p>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
            >
              <Card className="p-6 text-center rounded-2xl border-none shadow-md">
                <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
                <p className="text-4xl font-black text-primary">{result.score}%</p>
              </Card>
              <Card className="p-6 text-center rounded-2xl border-none shadow-md">
                <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                  <p className="text-2xl font-bold">{result.accuracy}%</p>
                </div>
              </Card>
              <Card className="p-6 text-center rounded-2xl border-none shadow-md">
                <p className="text-sm text-muted-foreground mb-1">Fluency</p>
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="text-orange-500 w-5 h-5" />
                  <p className="text-2xl font-bold">{result.fluency}%</p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {(hasRecorded && !isEvaluating) && (
          <div className="flex gap-4">
            <Button variant="outline" onClick={reset} className="rounded-xl h-12 px-6">
              <RotateCcw className="mr-2 w-4 h-4" />
              Try Again
            </Button>
            <Button className="rounded-xl h-12 px-8 gradient-primary font-bold">
              Next Phrase
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}


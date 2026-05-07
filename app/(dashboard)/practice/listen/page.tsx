"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Headphones, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Music
} from "lucide-react"

const storyLines = [
  "El sol comenzaba a esconderse tras las montañas de granito.",
  "Un viento fresco soplaba suavemente a través de los pinos.",
  "María caminaba en silencio por el sendero conocido.",
  "De repente, escuchó un sonido extraño cerca del arroyo.",
  "Se detuvo y miró a su alrededor con curiosidad y asombro."
]

export default function ListeningPracticePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeLine, setActiveLine] = useState(-1)
  const [error, setError] = useState<string | null>(null)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const generateAudio = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const fullText = storyLines.join(" ")
      const response = await fetch("/api/speech/generate", {
        method: "POST",
        body: JSON.stringify({ text: fullText, voice: "nova" }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
      } else {
        const msg = await response.text()
        if (msg.includes("OpenAI API Key missing")) {
          setError("Neural Cloud Link offline. Initializing local sync protocol via browser synthesis.")
        } else {
          setError("Acoustic node drift detected. Switching to secondary local synchronization.")
        }
      }
    } catch (err) {
      console.error("Error generating audio:", err)
      setError("Transmission error. Please check your connection.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    generateAudio()
  }, [])

  const togglePlay = () => {
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    } else {
      // Fallback to Web Speech API if OpenAI TTS fails or is missing
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
        return
      }

      const fullText = storyLines.join(" ")
      const utterance = new SpeechSynthesisUtterance(fullText)
      utterance.lang = "es-ES"
      utterance.rate = 0.9

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          // Estimate progress based on character index
          const pct = (event.charIndex / fullText.length) * 100
          setProgress(pct)
          
          // Sync active line
          let charCount = 0
          for (let i = 0; i < storyLines.length; i++) {
            charCount += storyLines[i].length + 1
            if (event.charIndex < charCount) {
              setActiveLine(i)
              break
            }
          }
        }
      }

      utterance.onend = () => {
        setIsPlaying(false)
        setProgress(100)
        setActiveLine(-1)
      }

      window.speechSynthesis.speak(utterance)
      setIsPlaying(true)
      setError(null) // Clear error if we're using fallback
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const current = audioRef.current.currentTime
    const total = audioRef.current.duration
    setCurrentTime(current)
    setProgress((current / total) * 100)

    // Estimate active line based on time (each line roughly 3-4 seconds)
    const lineIndex = Math.floor(current / (total / storyLines.length))
    setActiveLine(lineIndex)
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
    setActiveLine(-1)
  }

  const restart = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setIsPlaying(true)
      setProgress(0)
      setActiveLine(0)
    } else {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      setTimeout(() => togglePlay(), 100)
    }
  }

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-4">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] font-black uppercase tracking-[0.4em] text-[10px]">
            <Headphones className="w-4 h-4" />
            Acoustic Node v1.0
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight italic">
            Neural <span className="text-gradient-primary">Listening Sync.</span>
          </h1>
          <p className="text-muted-foreground font-medium text-xl max-w-2xl leading-relaxed">
            Internalize phonetic structures through high-fidelity AI vocal simulations.
          </p>
        </div>
        <div className="flex items-center gap-4 px-6 py-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
           <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Volume2 className="text-primary w-6 h-6" />
           </div>
           <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Speaker Model</p>
              <p className="text-sm font-black text-white uppercase tracking-widest">Nova • Neural-1</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Playback Control Card */}
        <Card className="lg:col-span-1 p-10 border border-white/10 bg-[#131A2E]/40 backdrop-blur-3xl rounded-[3.5rem] relative overflow-hidden shadow-3xl flex flex-col justify-between min-h-[500px]">
          <div className="absolute inset-0 grid-background opacity-[0.03] pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="w-24 h-24 rounded-[2.5rem] gradient-primary flex items-center justify-center shadow-2xl mx-auto mb-12 glow-primary group">
               {isPlaying ? (
                 <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                   <Music className="w-10 h-10 text-white" />
                 </motion.div>
               ) : (
                 <Headphones className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
               )}
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Sync Status</p>
              <h3 className={`text-3xl font-black tracking-tight leading-none uppercase ${error ? "text-primary/60" : "text-white"}`}>
                {error ? "Local Sync" : isPlaying ? "Transmitting" : "Node Standby"}
              </h3>
              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-bold text-red-400/60 mt-4 leading-relaxed"
                >
                  {error}
                </motion.p>
              )}
            </div>
          </div>

          <div className="relative z-10 space-y-8">
            {/* Audio Timeline */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="relative h-2 w-full bg-white/5 rounded-full cursor-pointer group">
                <div 
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" 
                  onClick={(e) => {
                    if (!audioRef.current) return
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const pct = x / rect.width
                    audioRef.current.currentTime = pct * duration
                  }}
                />
                <motion.div 
                  className="h-full gradient-primary rounded-full relative" 
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform" />
                </motion.div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={restart}
                className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
              <Button 
                onClick={togglePlay}
                disabled={isLoading}
                className="w-24 h-24 rounded-[2rem] gradient-primary shadow-3xl hover:shadow-primary/50 transition-all border-none text-white scale-110"
              >
                {isLoading ? (
                  <Sparkles className="w-10 h-10 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-10 h-10 fill-current" />
                ) : (
                  <Play className="w-10 h-10 fill-current translate-x-1" />
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <Volume2 className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {audioUrl && (
            <audio 
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              className="hidden"
            />
          )}
        </Card>

        {/* Text Area */}
        <Card className="lg:col-span-2 p-12 border border-white/10 bg-[#131A2E]/30 backdrop-blur-2xl rounded-[4rem] relative overflow-hidden shadow-3xl">
          <div className="absolute inset-0 grid-background opacity-[0.02] pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Neural Transcription
               </div>
               <Badge className="rounded-xl bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 font-black text-[9px] uppercase tracking-widest italic">Node ID: SP-824</Badge>
            </div>

            <div className="space-y-6">
              {storyLines.map((line, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: activeLine === i ? 1 : activeLine === -1 ? 0.6 : 0.2,
                    x: activeLine === i ? 10 : 0,
                    scale: activeLine === i ? 1.02 : 1
                  }}
                  className={`p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer ${
                    activeLine === i 
                      ? "bg-primary/10 border-primary/30 shadow-2xl" 
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
                  }`}
                  onClick={() => {
                    if (!audioRef.current) return
                    const total = audioRef.current.duration
                    const timePerLine = total / storyLines.length
                    audioRef.current.currentTime = i * timePerLine
                    if (!isPlaying) {
                      audioRef.current.play()
                      setIsPlaying(true)
                    }
                  }}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-colors ${
                      activeLine === i ? "bg-primary text-white" : "bg-white/5 text-white/20"
                    }`}>
                      {i + 1}
                    </div>
                    <p className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${
                      activeLine === i ? "text-white" : "text-white/40"
                    }`}>
                      {line}
                    </p>
                    {activeLine === i && (
                      <motion.div 
                        layoutId="line-indicator"
                        className="ml-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                         <div className="flex gap-1">
                            {[0, 0.2, 0.4].map(d => (
                              <motion.div 
                                key={d}
                                animate={{ height: [4, 12, 4] }}
                                transition={{ repeat: Infinity, duration: 0.6, delay: d }}
                                className="w-1 bg-primary rounded-full"
                              />
                            ))}
                         </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-12 flex items-center justify-center gap-8">
              <Button className="rounded-3xl h-20 px-12 gradient-primary font-black shadow-3xl hover:scale-105 transition-all border-none text-white group">
                Begin Comprehension Test
                <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-center text-[10px] font-black uppercase tracking-[0.5em] text-white/10 italic">
        Neural Acoustic Analysis Enabled • Frequency Modulated
      </div>
    </div>
  )
}

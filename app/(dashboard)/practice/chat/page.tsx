"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Send, Bot, User, Sparkles, Loader2, BrainCircuit, Globe, Zap, Cpu, History } from "lucide-react"
import { Waveform } from "@/components/shared/waveform"
import { useChat } from "@ai-sdk/react"
import { useState } from "react"

export default function AIChatPage() {
  const { messages, sendMessage, status } = useChat()
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const isLoading = status !== "ready" && status !== "error"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)] flex flex-col gap-10">
      {/* Chat Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 px-4">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2.5rem] gradient-primary flex items-center justify-center shadow-[0_0_50px_rgba(108,99,255,0.3)] border border-white/20 group relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <BrainCircuit className="text-white w-10 h-10 relative z-10" />
          </div>
          <div>
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,1)]" />
              Neural Node Active
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter italic">Linguistic Sync</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-[#6C63FF]/30 transition-all cursor-pointer">
              <Globe className="w-4 h-4 text-[#6C63FF]" />
              <span className="text-xs font-black uppercase tracking-widest text-white/70">Locale: Spanish (ES)</span>
           </div>
           <Button variant="ghost" className="w-12 h-12 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 text-white/40">
              <History className="w-5 h-5" />
           </Button>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-grow border border-white/10 bg-[#131A2E]/40 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] rounded-[4rem] flex flex-col overflow-hidden relative border-t-white/10">
        <div className="absolute inset-0 grid-background opacity-[0.03] pointer-events-none" />
        
        <div className="flex-grow p-12 overflow-y-auto space-y-10 relative scrollbar-hide">
          <AnimatePresence initial={false}>
            {messages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="w-32 h-32 rounded-[3.5rem] bg-white/[0.02] flex items-center justify-center border border-white/5 relative group cursor-pointer">
                  <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Bot className="w-16 h-16 text-white/10 group-hover:text-primary/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-black tracking-tighter text-white/20 uppercase italic">Awaiting Input</p>
                  <p className="text-sm font-medium text-white/10 tracking-widest uppercase">Start the transmission to begin sync.</p>
                </div>
              </motion.div>
            )}
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-6 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center border transition-all duration-500 hover:scale-110 ${
                    msg.role === "assistant" 
                      ? "bg-[#6C63FF]/10 border-[#6C63FF]/20 text-[#6C63FF] shadow-[0_0_20px_rgba(108,99,255,0.2)]" 
                      : "bg-white/5 border-white/10 text-white"
                  }`}>
                    {msg.role === "assistant" ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                  </div>
                  
                  <div className={`space-y-3 flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group transition-all duration-500 ${
                      msg.role === "user" 
                        ? "bg-[#6C63FF] text-white font-bold" 
                        : "bg-white/5 border border-white/10 text-white/90 font-medium backdrop-blur-xl hover:bg-white/[0.08]"
                    }`}>
                      {msg.role === "assistant" && (
                        <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                           <Sparkles className="w-12 h-12 text-white" />
                        </div>
                      )}
                      <div className="text-lg leading-relaxed whitespace-pre-wrap relative z-10">
                        {msg.parts.map((part, i) => (
                          part.type === "text" && <span key={i}>{part.text}</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 px-3 italic">
                      {msg.role === "assistant" ? "Neural Response" : "Auth-User Node"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-3xl shadow-xl">
                <div className="flex gap-2">
                   {[0, 0.2, 0.4].map((delay) => (
                     <motion.div 
                        key={delay}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} 
                        transition={{ repeat: Infinity, duration: 1.5, delay }} 
                        className="w-2 h-2 rounded-full bg-primary" 
                      />
                   ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-10 bg-white/[0.02] border-t border-white/5 relative z-20 backdrop-blur-3xl">
          <form onSubmit={handleSubmit} className="max-w-5xl mx-auto flex items-center gap-6">
            <div className="relative flex-grow group">
              <div className="absolute inset-0 bg-[#6C63FF]/5 blur-3xl opacity-0 group-focus-within:opacity-100 transition-all duration-700 rounded-full -z-10" />
              <Input
                value={input ?? ""}
                onChange={handleInputChange}
                placeholder="Type transmission in Spanish..."
                className="pl-8 pr-28 py-10 rounded-[2.5rem] bg-white/5 border-white/10 focus-visible:bg-white/[0.08] focus-visible:ring-[#6C63FF]/30 focus-visible:border-[#6C63FF]/30 transition-all text-white text-xl font-medium placeholder:text-white/10 shadow-3xl border-2"
                disabled={isLoading}
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 scale-125">
                <Waveform active={isRecording} />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`rounded-3xl w-20 h-20 transition-all duration-700 border-none relative overflow-hidden group ${
                  isRecording 
                    ? "bg-red-500 text-white scale-110 shadow-[0_0_50px_rgba(239,68,68,0.5)]" 
                    : "bg-white/5 hover:bg-white/10 text-white/40 border border-white/10"
                }`}
                variant="ghost"
                disabled={isLoading}
              >
                <div className="relative z-10">
                   <Mic className={`w-8 h-8 ${isRecording ? "animate-pulse" : ""}`} />
                </div>
                {isRecording && <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />}
              </Button>
              
              <Button 
                type="submit"
                disabled={!input?.trim() || isLoading}
                className="rounded-3xl w-20 h-20 gradient-primary shadow-[0_20px_40px_rgba(108,99,255,0.3)] hover:shadow-[#6C63FF]/50 hover:scale-110 transition-all border-none text-white p-0"
              >
                {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Send className="w-8 h-8" />}
              </Button>
            </div>
          </form>
          <div className="flex justify-center gap-8 mt-6">
             <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10 italic">
               Neural encryption enabled
             </p>
             <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10 italic">
               Latency: 14ms
             </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

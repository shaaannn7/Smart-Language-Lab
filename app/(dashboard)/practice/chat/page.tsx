"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Send, Bot, User, MoreHorizontal, Sparkles, Loader2 } from "lucide-react"
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
    <div className="max-w-5xl mx-auto h-[calc(100vh-12rem)] flex flex-col gap-6">
      {/* Chat Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Language Partner</h1>
            <div className="flex items-center gap-2 text-xs font-medium text-green-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Online & Ready to Help
            </div>
          </div>
        </div>
        <Button variant="outline" className="rounded-xl border-dashed">
          <Sparkles className="mr-2 w-4 h-4 text-primary" />
          Improve Grammar
        </Button>
      </div>

      {/* Chat Container */}
      <Card className="flex-grow border-none shadow-xl rounded-3xl flex flex-col overflow-hidden glass">
        <div className="flex-grow p-6 overflow-y-auto space-y-6">
          <AnimatePresence initial={false}>
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                <Bot className="w-12 h-12" />
                <p>Start a conversation in Spanish!</p>
              </div>
            )}
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
                    {msg.role === "assistant" ? (
                      <AvatarFallback>AI</AvatarFallback>
                    ) : (
                      <AvatarFallback>ME</AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className={`p-4 rounded-2xl shadow-sm ${
                      msg.role === "user" 
                        ? "gradient-primary text-white" 
                        : "bg-muted dark:bg-zinc-800"
                    }`}>
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.parts.map((part, i) => (
                          part.type === "text" && <span key={i}>{part.text}</span>
                        ))}
                      </div>
                    </div>
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
              <div className="bg-muted dark:bg-zinc-800 p-4 rounded-2xl">
                <MoreHorizontal className="w-5 h-5 animate-bounce" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-muted/30 border-t">
          <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
            <div className="relative flex-grow">
              <Input
                value={input ?? ""}
                onChange={handleInputChange}
                placeholder="Type your message in Spanish..."
                className="pr-12 py-6 rounded-2xl bg-background border-none shadow-inner text-base"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Waveform active={isRecording} />
              </div>
            </div>
            
            <Button 
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              className={`rounded-2xl w-14 h-14 transition-all ${
                isRecording 
                  ? "bg-destructive text-white scale-110 shadow-lg shadow-destructive/20" 
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
              variant="ghost"
              disabled={isLoading}
            >
              <Mic className="w-6 h-6" />
            </Button>
            
            <Button 
              type="submit"
              disabled={!input?.trim() || isLoading}
              className="rounded-2xl w-14 h-14 gradient-primary shadow-lg shadow-primary/20"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}


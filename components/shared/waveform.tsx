"use client"

import { motion } from "framer-motion"

export function Waveform({ active = false }: { active?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 h-12 px-3">
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          animate={active ? {
            height: [
              6, 
              Math.random() * 32 + 12, 
              Math.random() * 20 + 8, 
              Math.random() * 48 + 16, 
              6
            ],
            opacity: [0.4, 1, 0.6, 1, 0.4],
            backgroundColor: [
              "#6C63FF",
              "#A855F7",
              "#00D1FF",
              "#6C63FF"
            ]
          } : {
            height: 6,
            opacity: 0.1,
            backgroundColor: "#6C63FF"
          }}
          transition={active ? {
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.04,
            ease: "easeInOut"
          } : {
            duration: 0.5
          }}
          className="w-1 rounded-full shadow-[0_0_10px_rgba(108,99,255,0.3)]"
        />
      ))}
    </div>
  )
}

"use client"

import { motion } from "framer-motion"

export function Waveform({ active = false }: { active?: boolean }) {
  return (
    <div className="flex items-center gap-1 h-8">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={active ? {
            height: [8, ((i * 7) % 16) + 12, 8],
          } : {
            height: 8
          }}
          transition={active ? {
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.05
          } : {}}
          className="w-1.5 bg-primary rounded-full"
        />
      ))}
    </div>
  )
}

"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export const completeLesson = async (lessonId: string, score: number) => {
  try {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthorized" }

    const userId = session.user.id

    // Update or create progress
    await prisma.progress.upsert({
      where: {
        userId_lessonId: { userId, lessonId }
      },
      update: {
        completed: true,
        score: score
      },
      create: {
        userId,
        lessonId,
        completed: true,
        score: score
      }
    })

    // Update user XP and Streak
    const xpGain = score * 10
    await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpGain },
        streak: { increment: 1 } // Simple increment for now
      }
    })

    revalidatePath("/dashboard")
    revalidatePath("/lessons")
    
    return { success: true, xpGain }
  } catch (error) {
    console.error("Error in completeLesson:", error)
    return { error: "Failed to update progress" }
  }
}

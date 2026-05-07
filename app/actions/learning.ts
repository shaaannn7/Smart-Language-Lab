"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export const getDashboardStats = async () => {
  try {
    const session = await auth()
    if (!session?.user?.id) return null

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        progress: {
          where: { completed: true }
        },
        audioRecords: true
      }
    })

    if (!user) return null

    const lessonsCompleted = user.progress.length
    
    // Calculate total time spent from audio records (mock calculation for now)
    const timeSpent = user.audioRecords.length > 0 
      ? `${(user.audioRecords.length * 0.1).toFixed(1)}h` 
      : "0h"
    
    return {
      streak: user.streak || 0,
      xp: user.xp || 0,
      lessonsCompleted,
      timeSpent
    }
  } catch (error) {
    console.error("Database error in getDashboardStats:", error)
    return {
      streak: 0,
      xp: 0,
      lessonsCompleted: 0,
      timeSpent: "0h"
    }
  }
}

export const getLessons = async () => {
  try {
    const session = await auth()
    if (!session?.user?.id) return []

    const lessons = await prisma.lesson.findMany({
      include: {
        progress: {
          where: { userId: session.user.id }
        }
      }
    })

    if (lessons.length === 0) {
      // Return mock lessons if DB is empty
      return [
        { id: "1", title: "Basics of Spanish", progress: 100, status: "completed" },
        { id: "2", title: "Common Phrases", progress: 75, status: "active" },
        { id: "3", title: "Travel Vocabulary", progress: 0, status: "active" },
      ]
    }

    return lessons.map(lesson => ({
      ...lesson,
      progress: lesson.progress[0]?.score || 0,
      status: lesson.progress[0]?.completed ? "completed" : "active"
    }))
  } catch (error) {
    console.error("Database error in getLessons:", error)
    return [
      { id: "1", title: "Basics of Spanish", progress: 100, status: "completed" },
      { id: "2", title: "Common Phrases", progress: 75, status: "active" },
      { id: "3", title: "Travel Vocabulary", progress: 0, status: "active" },
    ]
  }
}


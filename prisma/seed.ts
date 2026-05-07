import { PrismaClient, LessonType, Difficulty } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const lessons = [
    {
      title: "Greeting & Introductions",
      description: "Learn basic greetings and how to introduce yourself to others.",
      type: LessonType.VOCABULARY,
      difficulty: Difficulty.BEGINNER,
      content: {
        exercises: [
          { question: "How do you say 'Hello' in Spanish?", answer: "Hola" },
          { question: "How do you say 'Good morning'?", answer: "Buenos días" }
        ]
      }
    },
    {
      title: "Essential Verbs",
      description: "Master the 20 most commonly used verbs in everyday Spanish.",
      type: LessonType.GRAMMAR,
      difficulty: Difficulty.BEGINNER,
      content: {
        exercises: [
          { question: "Translate 'To be' (permanent)", answer: "Ser" },
          { question: "Translate 'To eat'", answer: "Comer" }
        ]
      }
    },
    {
      title: "Business Negotiations",
      description: "Navigate complex discussions and handle objections in a professional setting.",
      type: LessonType.SPEAKING,
      difficulty: Difficulty.INTERMEDIATE,
      content: {
        phrases: [
          "Estoy de acuerdo con su propuesta.",
          "¿Podemos discutir el presupuesto?",
          "Necesito más tiempo para revisar el contrato."
        ]
      }
    }
  ]

  console.log("Seeding lessons...")
  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { id: lesson.title.toLowerCase().replace(/\s+/g, '-') }, // Using slug as id for seed stability
      update: {},
      create: {
        id: lesson.title.toLowerCase().replace(/\s+/g, '-'),
        ...lesson
      }
    })
  }
  console.log("Seeding complete.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

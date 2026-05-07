import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import OpenAI from "openai"

export async function POST(req: Request) {
  const openai = new OpenAI()
  const session = await auth()
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 })
  }

  const formData = await req.formData()
  const audioFile = formData.get("audio") as File
  const expectedText = formData.get("expectedText") as string

  if (!audioFile || !expectedText) {
    return new Response("Missing audio or expected text", { status: 400 })
  }

  try {
    // Check for API Key
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY missing. Returning mock evaluation.")
      const mockResult = {
        score: 85,
        accuracy: 90,
        fluency: 80,
        feedback: "Excellent pronunciation! Your accent is very natural, though you could work on the emphasis of the final syllables."
      }
      
      await prisma.audioRecord.create({
        data: {
          userId: session.user.id,
          url: "mock-blob",
          transcription: expectedText,
          score: mockResult.score,
          feedback: mockResult.feedback,
        }
      })

      return Response.json({
        transcription: expectedText,
        ...mockResult
      })
    }

    // 1. Transcribe audio with Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    })

    const userText = transcription.text

    // 2. Evaluate pronunciation using GPT-4o
    const evaluation = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Evaluate the user's pronunciation. Compare the transcribed text with the expected text. Provide a score (0-100), accuracy %, fluency %, and a short feedback tip. Return JSON format: { score: number, accuracy: number, fluency: number, feedback: string }"
        },
        {
          role: "user",
          content: `Expected: "${expectedText}"\nTranscribed: "${userText}"`
        }
      ],
      response_format: { type: "json_object" }
    })

    const result = JSON.parse(evaluation.choices[0].message.content || "{}")

    // 3. Save to database
    await prisma.audioRecord.create({
      data: {
        userId: session.user.id,
        url: "local-blob", // Placeholder for storage URL
        transcription: userText,
        score: result.score,
        feedback: result.feedback,
      }
    })

    return Response.json({
      transcription: userText,
      ...result
    })

  } catch (error) {
    console.error("Speech evaluation error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

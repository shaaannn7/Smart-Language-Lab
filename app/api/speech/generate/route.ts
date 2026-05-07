import { auth } from "@/auth"
import OpenAI from "openai"

export async function POST(req: Request) {
  const openai = new OpenAI()
  const session = await auth()
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { text, voice = "alloy" } = await req.json()

  if (!text) {
    return new Response("Missing text", { status: 400 })
  }

  try {
    // Check for API Key fallback
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY missing. Returning error for TTS.")
      return new Response("OpenAI API Key missing", { status: 500 })
    }

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice,
      input: text,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())
    
    return new Response(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    })

  } catch (error) {
    console.error("Speech generation error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

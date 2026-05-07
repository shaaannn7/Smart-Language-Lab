import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { auth } from "@/auth"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const session = await auth()
  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Check for API Key
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY missing. Returning mock stream.")
    return new Response(
      "This is a simulated AI response because no OpenAI API key is configured. In a production environment, your linguistic sync would be processed by GPT-4o with millisecond latency.",
      { headers: { "Content-Type": "text/plain" } }
    )
  }

  const { messages } = await req.json()

  const result = await streamText({
    model: openai("gpt-4o"),
    system: "You are a helpful Spanish language tutor. Your goal is to practice Spanish with the user. Provide helpful corrections and encourage conversation.",
    messages,
  })

  return result.toUIMessageStreamResponse()
}

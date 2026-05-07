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

  const { messages } = await req.json()

  const result = await streamText({
    model: openai("gpt-4o"),
    system: "You are a helpful Spanish language tutor. Your goal is to practice Spanish with the user. Provide helpful corrections and encourage conversation.",
    messages,
  })

  return result.toUIMessageStreamResponse()
}

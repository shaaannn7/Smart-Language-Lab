import { type NextAuthResult } from "next-auth"

// Mock user data
const mockUser = {
  id: "mock-user-id",
  name: "Learner",
  email: "learner@example.com",
  role: "USER",
}

// Mock auth function that always returns a session
export const auth = async () => {
  return {
    user: mockUser,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  }
}

// Mock signIn and signOut
export const signIn = async (...args: any[]) => {}
export const signOut = async (...args: any[]) => {}

// Mock handlers for API routes
export const handlers = {
  GET: async () => new Response("Auth disabled"),
  POST: async () => new Response("Auth disabled"),
}

export const { GET, POST } = handlers


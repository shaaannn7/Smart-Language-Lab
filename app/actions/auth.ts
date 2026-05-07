"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
})

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  })

  return { success: "User created!" }
}

export const login = async (values: any) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: "/dashboard",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error
  }
}

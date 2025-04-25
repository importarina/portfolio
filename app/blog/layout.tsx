import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Blog | Arina Momajjed",
  description: "Thoughts and insights on web development, design, and technology.",
}

export default function BlogLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
} 
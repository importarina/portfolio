import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Blog",
  description: "",
}

export default function BlogLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
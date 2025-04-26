import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Photography",
  description: "A collection of my photography through the years.",
}

export default function GalleryLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
} 
import type React from "react"
import { Inter } from "next/font/google"
import { Dock } from "@/components/layout/dock"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"]
})

export const metadata = {
  title: "Arina Momajjed | Software Engineer",
  description: "Personal portfolio of Arina Momajjed, Software Engineer"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          }
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <Dock />
        {children}
        <Footer />
      </body>
    </html>
  )
}

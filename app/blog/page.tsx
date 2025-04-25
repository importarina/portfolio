"use client"

import Link from "next/link"
import { CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import BlogContent from "./BlogContent"

// Simple blog post type
type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

// Empty posts array - will be populated from the processed blog data
const posts: BlogPost[] = []

// Get all unique tags from posts
const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))

export default function BlogPage() {
  return (
    <main className="min-h-screen pb-20 md:pl-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold rainbow-text leading-tight">
            Blog
          </h1>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogContent />
        </Suspense>
      </div>
    </main>
  )
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
} 
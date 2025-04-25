"use client"

import Link from "next/link"
import { CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"

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

export default function BlogContent() {
  const searchParams = useSearchParams()
  const selectedTag = searchParams.get('tag')
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts

  return (
    <>
      {posts.length === 0 ? (
        <div className="py-12">
          <p className="mt-2 text-muted-foreground">Coming soon!</p>
        </div>
      ) : (
        <>
          {/* Tags filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Filter by tag:</span>
              <Link href="/blog">
                <Badge variant={!selectedTag ? "default" : "outline"} className="cursor-pointer">
                  All
                </Badge>
              </Link>
              {allTags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${tag}`}>
                  <Badge variant={selectedTag === tag ? "default" : "outline"} className="cursor-pointer">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="border-b pb-6">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold hover:underline">{post.title}</h2>
                </Link>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${tag}`}>
                      <Badge variant="secondary" className="cursor-pointer">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </>
  )
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
} 
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { CalendarIcon, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Simple blog post type
type BlogPost = {
  slug: string
  title: string
  date: string
  content: string
  tags: string[]
}

// Sample blog posts - you can replace this with your actual data source
const posts: Record<string, BlogPost> = {
  "getting-started-with-nextjs": {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    date: "2024-04-15",
    tags: ["Next.js", "React", "Web Development"],
    content: `
      Next.js is a powerful React framework that enables server-side rendering and static site generation.
      In this post, we'll explore the basics of Next.js and how to get started with building modern web applications.
      
      ## Why Next.js?
      
      Next.js provides several benefits:
      
      - Server-side rendering for better SEO
      - Static site generation for fast loading
      - API routes for backend functionality
      - Built-in routing system
      
      ## Getting Started
      
      To create a new Next.js project, run:
      
      \`\`\`bash
      npx create-next-app@latest my-app
      \`\`\`
      
      This will set up a new Next.js project with all the necessary configurations.
    `,
  },
  "building-a-portfolio": {
    slug: "building-a-portfolio",
    title: "Building a Modern Portfolio",
    date: "2024-04-10",
    tags: ["Design", "Portfolio", "Web Development"],
    content: `
      A portfolio website is essential for showcasing your work and skills. In this post, we'll discuss
      how to create a modern, professional portfolio that stands out.
      
      ## Key Elements
      
      Your portfolio should include:
      
      - A clean, modern design
      - Clear navigation
      - Project showcases
      - Contact information
      - About section
      
      ## Design Tips
      
      - Use a consistent color scheme
      - Ensure mobile responsiveness
      - Keep the layout simple and focused
      - Use high-quality images
    `,
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "Post Not Found" }

  return {
    title: `${post.title} | Arina Momajjed`,
    description: post.content.slice(0, 160),
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <article className="min-h-screen pb-20 md:pl-24">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Blog
        </Link>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog?tag=${tag}`}>
              <Badge variant="secondary" className="cursor-pointer">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
        <div className="prose dark:prose-invert max-w-none">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}

async function getPost(slug: string) {
  // In a real app, this would fetch from an API or database
  return posts[slug]
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
} 
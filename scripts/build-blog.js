/**
 * Build Blog Script
 *
 * Pre-processes Markdown files into HTML at build time
 * for better performance and code block rendering
 */

const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")
const { unified } = require("unified")
const remarkParse = require("remark-parse")
const remarkGfm = require("remark-gfm")
const remarkRehype = require("remark-rehype")
const rehypeHighlight = require("rehype-highlight")
const rehypeStringify = require("rehype-stringify")

// Paths
const BLOG_DIR = path.join(process.cwd(), "content/blog")
const CACHE_DIR = path.join(process.cwd(), ".cache/blog")

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true })
  console.log(`Created cache directory: ${CACHE_DIR}`)
}

// Process a single markdown file
async function processMarkdownFile(filePath, slug) {
  console.log(`Processing: ${slug}`)

  // Read file content
  const fileContent = fs.readFileSync(filePath, "utf8")

  // Parse frontmatter
  const { data, content } = matter(fileContent)

  // Process markdown to HTML with syntax highlighting
  const htmlContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content)

  // Create a processed blog post object
  const processedPost = {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags || [],
    content: String(htmlContent),
    // Calculate read time
    readTime: `${Math.ceil(content.split(/\s+/).length / 200)} min read`,
  }

  // Save to cache
  const cacheFilePath = path.join(CACHE_DIR, `${slug}.json`)
  fs.writeFileSync(cacheFilePath, JSON.stringify(processedPost, null, 2))

  return processedPost
}

// Process all markdown files
async function processBlogPosts() {
  console.log("Pre-processing blog posts...")

  // Get all markdown files
  const files = fs.readdirSync(BLOG_DIR)
  const markdownFiles = files.filter((file) => file.endsWith(".md"))

  console.log(`Found ${markdownFiles.length} markdown files`)

  // Process each file
  const processedPosts = []

  for (const filename of markdownFiles) {
    const filePath = path.join(BLOG_DIR, filename)
    const slug = filename.replace(/\.md$/, "")

    try {
      const processedPost = await processMarkdownFile(filePath, slug)
      processedPosts.push(processedPost)
    } catch (error) {
      console.error(`Error processing ${filename}:`, error)
    }
  }

  // Sort posts by date (newest first)
  processedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Save the index of all posts
  fs.writeFileSync(path.join(CACHE_DIR, "index.json"), JSON.stringify(processedPosts, null, 2))

  console.log(`Successfully processed ${processedPosts.length} blog posts`)
}

// Run the script
processBlogPosts().catch((error) => {
  console.error("Error processing blog posts:", error)
  process.exit(1)
})

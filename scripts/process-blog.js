/**
 * Blog Processing Script
 *
 * This script processes Markdown files in the content/blog directory
 * and validates their frontmatter.
 */

const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

// Path to blog content directory
const BLOG_DIR = path.join(process.cwd(), "content/blog")

// Required frontmatter fields
const REQUIRED_FIELDS = ["title", "date", "excerpt", "tags"]

// Process all blog posts
function processBlogPosts() {
  console.log("Processing blog posts...")

  // Create the blog directory if it doesn't exist
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
    console.log(`Created directory: ${BLOG_DIR}`)
    return
  }

  // Get all files from the blog directory
  const files = fs.readdirSync(BLOG_DIR)

  // Filter for markdown files
  const markdownFiles = files.filter((file) => file.endsWith(".md"))
  console.log(`Found ${markdownFiles.length} markdown files`)

  // Process each file
  let hasErrors = false

  markdownFiles.forEach((filename) => {
    const filePath = path.join(BLOG_DIR, filename)
    const slug = filename.replace(/\.md$/, "")

    try {
      // Read the file content
      const fileContent = fs.readFileSync(filePath, "utf8")

      // Parse the frontmatter
      const { data, content } = matter(fileContent)

      // Validate required fields
      const missingFields = REQUIRED_FIELDS.filter((field) => !data[field])

      if (missingFields.length > 0) {
        console.error(`Error in ${filename}: Missing required fields: ${missingFields.join(", ")}`)
        hasErrors = true
      } else {
        // Validate date format
        const dateObj = new Date(data.date)
        if (isNaN(dateObj.getTime())) {
          console.error(`Error in ${filename}: Invalid date format`)
          hasErrors = true
        }

        // Validate tags is an array
        if (!Array.isArray(data.tags)) {
          console.error(`Error in ${filename}: Tags must be an array`)
          hasErrors = true
        }

        // Check for code blocks to ensure they're properly formatted
        const codeBlockRegex = /```(\w+)?\n[\s\S]*?\n```/g
        const codeBlocks = content.match(codeBlockRegex) || []

        console.log(`✓ ${filename} - Valid (contains ${codeBlocks.length} code blocks)`)
      }
    } catch (error) {
      console.error(`Error processing ${filename}:`, error.message)
      hasErrors = true
    }
  })

  if (hasErrors) {
    console.error("\nErrors found in blog posts. Please fix them before continuing.")
    process.exit(1)
  } else {
    console.log("\nAll blog posts are valid!")
  }
}

// Run the script
processBlogPosts()

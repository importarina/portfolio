/**
 * Blog Processor Runner
 *
 * Processes blog posts from markdown files and generates the necessary data
 */

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

// Paths
const contentDir = path.join(process.cwd(), "content/blog")
const outputDir = path.join(process.cwd(), "public/blog-data")

// Ensure directories exist
console.log("Creating necessary directories...")
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true })
  console.log(`Created content directory: ${contentDir}`)
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
  console.log(`Created output directory: ${outputDir}`)
}

// Check if Python is installed
let pythonCommand = "python3"
try {
  execSync("python3 --version", { stdio: "ignore" })
  console.log("Python 3 is installed.")
} catch (error) {
  try {
    execSync("python --version", { stdio: "ignore" })
    console.log("Python is installed (but not as python3).")
    pythonCommand = "python"
  } catch (error) {
    console.error("Error: Python is not installed. Please install Python to process blog posts.")
    process.exit(1)
  }
}

// Install required packages
console.log("Installing required Python packages...")
try {
  execSync(`${pythonCommand} -m pip install markdown python-frontmatter`, { stdio: "inherit" })
  console.log("Required Python packages installed successfully.")
} catch (error) {
  console.error("Error installing Python packages:", error.message)
  console.log("Continuing anyway, packages might already be installed...")
}

// Process blog posts
console.log("Processing blog posts...")
try {
  // Get all markdown files
  const files = fs.readdirSync(contentDir)
  const markdownFiles = files.filter((file) => file.endsWith(".md"))
  
  if (markdownFiles.length === 0) {
    console.log("No blog posts found. The blog will show 'Coming soon!'.")
  } else {
    console.log(`Found ${markdownFiles.length} blog posts to process.`)
    
    // Process each file
    const posts = []
    markdownFiles.forEach((filename) => {
      const filePath = path.join(contentDir, filename)
      const slug = filename.replace(/\.md$/, "")
      
      try {
        const fileContent = fs.readFileSync(filePath, "utf8")
        const { data } = matter(fileContent)
        
        posts.push({
          slug,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          tags: data.tags || []
        })
        
        console.log(`✓ Processed: ${filename}`)
      } catch (error) {
        console.error(`Error processing ${filename}:`, error.message)
      }
    })
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    // Save the processed data
    fs.writeFileSync(
      path.join(outputDir, "posts.json"),
      JSON.stringify(posts, null, 2)
    )
    
    console.log("Blog posts processed successfully!")
  }
} catch (error) {
  console.error("Error processing blog posts:", error.message)
  process.exit(1)
}

/**
 * This script scans the gallery directory and updates the gallery.json file
 * with metadata for each image.
 *
 * Run with: npx ts-node scripts/update-gallery.ts
 */

import fs from "fs"
import path from "path"

// Define the gallery types
type GalleryPhoto = {
  filename: string
  alt: string
}

type GalleryImage = {
  id: string
  caption: string
  likes: number
  photos: GalleryPhoto[]
  primaryIndex: number
  type?: "single" | "carousel"
}

// Paths
const galleryDir = path.join(process.cwd(), "public", "images", "gallery")
const dataDir = path.join(process.cwd(), "public", "data")
const dataFilePath = path.join(dataDir, "gallery.json")

// Ensure directories exist
if (!fs.existsSync(galleryDir)) {
  console.log(`Creating gallery directory: ${galleryDir}`)
  fs.mkdirSync(galleryDir, { recursive: true })
}

if (!fs.existsSync(dataDir)) {
  console.log(`Creating data directory: ${dataDir}`)
  fs.mkdirSync(dataDir, { recursive: true })
}

// Read existing data if available
let existingData: GalleryImage[] = []
if (fs.existsSync(dataFilePath)) {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8")
    existingData = JSON.parse(data)
    console.log(`Loaded existing data for ${existingData.length} gallery items`)
  } catch (error) {
    console.error("Error reading existing data:", error)
  }
}

// Function to recursively scan directory for images
function scanDirectory(dir: string): { files: string[], subdirs: string[] } {
  const items = fs.readdirSync(dir)
  const files: string[] = []
  const subdirs: string[] = []

  items.forEach(item => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      console.log(`Found subdirectory: ${item}`)
      subdirs.push(item)
    } else if (stat.isFile() && /\.(jpg|jpeg|png|gif)$/i.test(item)) {
      // Store the path relative to the gallery directory
      const relativePath = path.relative(galleryDir, fullPath)
      files.push(relativePath)
    }
  })

  return { files, subdirs }
}

// Scan root directory
const { files: rootFiles, subdirs } = scanDirectory(galleryDir)
console.log(`Found ${rootFiles.length} image files and ${subdirs.length} subdirectories:`)
subdirs.forEach(dir => console.log(` - ${dir}`))

// Process root directory files as individual items
const galleryData: GalleryImage[] = rootFiles.map(file => {
  const fileName = path.parse(file).name
  const baseName = fileName.replace(/-\d+$/, '') // Remove trailing numbers but keep the rest of the name
  const existing = existingData.find(item => item.id === `item-${fileName}`)

  if (existing) {
    return {
      ...existing,
      type: "single",
      photos: [{
        filename: file,
        alt: `${baseName.replace(/-/g, " ")} photo`
      }]
    }
  }

  return {
    id: `item-${fileName}`,
    caption: baseName.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    likes: 0,
    type: "single",
    photos: [{
      filename: file,
      alt: `${baseName.replace(/-/g, " ")} photo`
    }],
    primaryIndex: 0
  }
})

// Process subdirectories as carousels
subdirs.forEach(subdir => {
  const subdirPath = path.join(galleryDir, subdir)
  const { files: carouselFiles } = scanDirectory(subdirPath)
  
  if (carouselFiles.length > 0) {
    console.log(`Processing carousel for ${subdir} with ${carouselFiles.length} images`)
    const existing = existingData.find(item => item.id === `item-${subdir.replace(/ /g, "-")}`)
    const photos = carouselFiles.map(file => ({
      filename: file,
      alt: `${subdir.replace(/-/g, " ")} photo`
    }))

    if (existing) {
      console.log(` - Updating existing carousel: ${subdir}`)
      galleryData.push({
        ...existing,
        type: "carousel",
        photos
      })
    } else {
      console.log(` - Creating new carousel: ${subdir}`)
      galleryData.push({
        id: `item-${subdir.replace(/ /g, "-")}`,
        caption: subdir.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
        likes: 0,
        type: "carousel",
        photos,
        primaryIndex: 0
      })
    }
  } else {
    console.log(`Warning: Empty subdirectory found: ${subdir}`)
  }
})

// Write the updated data
fs.writeFileSync(dataFilePath, JSON.stringify(galleryData, null, 2), "utf8")
const totalPhotos = galleryData.reduce((sum, item) => sum + item.photos.length, 0)
console.log(`Updated gallery data with ${galleryData.length} items containing ${totalPhotos} photos`)
console.log(`Data saved to: ${dataFilePath}`)

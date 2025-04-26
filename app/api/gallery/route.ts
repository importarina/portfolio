/**
 * Gallery API Route
 *
 * This API route provides access to the photography gallery data.
 * It returns a structured array of gallery items with their associated photos.
 *
 * Endpoints:
 * - GET /api/gallery: Returns all gallery items
 */

import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

/**
 * GET handler - return all gallery images
 *
 * @returns JSON response with gallery data
 */
export async function GET() {
  try {
    const dataFilePath = path.join(process.cwd(), "public", "data", "gallery.json")
    
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json([])
    }
    
    const data = fs.readFileSync(dataFilePath, "utf8")
    const galleryData = JSON.parse(data)
    
    // Process the items, adding src paths to photos
    const processedData = galleryData.map((item: any) => ({
      ...item,
      photos: item.photos.map((photo: any) => ({
        ...photo,
        // Use the correct path for Vercel deployment
        src: `/_next/static/images/gallery/${photo.filename}`
      }))
    }))
    
    return NextResponse.json(processedData)
  } catch (error) {
    console.error("Error reading gallery data:", error)
    return NextResponse.json({ error: "Failed to load gallery data" }, { status: 500 })
  }
}

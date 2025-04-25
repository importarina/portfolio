/**
 * Gallery Data Types and Utilities
 *
 * This module defines the data structures and functions for working with
 * the photography gallery. It provides types for gallery items and photos,
 * as well as functions to fetch gallery data from the API or fallback data.
 */

// Single image in a gallery item
export type GalleryPhoto = {
  filename: string
  src: string
  alt: string
}

// Gallery item with multiple photos
export type GalleryImage = {
  id: string
  type: "single" | "carousel" // Type determines how the item is displayed
  photos: GalleryPhoto[]
  primaryIndex: number // Index of the primary photo to show in the feed
}

/**
 * Fetch gallery images from the API
 * Falls back to static data if the API request fails
 *
 * @returns Promise<GalleryImage[]> Array of gallery images
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    console.log("Fetching gallery data...")
    const response = await fetch("/api/gallery")
    console.log("Response status:", response.status)
    if (!response.ok) {
      console.error("Failed to fetch photography images:", response.status)
      return getFallbackGalleryData()
    }
    const data = await response.json()
    console.log("Received gallery data:", data.length, "items")
    return data as GalleryImage[]
  } catch (error) {
    console.error("Error fetching photography images:", error)
    return getFallbackGalleryData()
  }
}

/**
 * Get fallback gallery data for development or when API fails
 * This ensures the gallery always has something to display
 *
 * @returns GalleryImage[] Static gallery data
 */
function getFallbackGalleryData(): GalleryImage[] {
  return [
    {
      id: "fallback-1",
      type: "single",
      photos: [
        {
          filename: "fallback-1.jpg",
          src: "/images/gallery/fallback-1.jpg",
          alt: "Fallback image 1",
        },
      ],
      primaryIndex: 0,
    },
    {
      id: "fallback-2",
      type: "single",
      photos: [
        {
          filename: "fallback-2.jpg",
          src: "/images/gallery/fallback-2.jpg",
          alt: "Fallback image 2",
        },
      ],
      primaryIndex: 0,
    },
  ]
}

/**
 * Photography Component
 *
 * This component displays a responsive masonry grid of photographs with lightbox functionality.
 * It supports both single images and image carousels, and provides a full-screen viewing
 * experience when images are clicked.
 *
 * Features:
 * - Responsive masonry layout
 * - Image carousels for multiple related photos
 * - Lightbox for full-screen viewing
 * - Navigation between all photos in the collection
 * - Loading and error states
 */

"use client"

import { useState, useEffect } from "react"
import Masonry from "react-masonry-css"
import { ImageCarousel } from "@/components/image-carousel"
import { type GalleryImage, getGalleryImages } from "@/lib/gallery"

export function Photography() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true)
        setError(null)
        const galleryImages = await getGalleryImages()
        setImages(galleryImages)
      } catch (err) {
        console.error("Photography component error:", err)
        setError("Failed to load photography images. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadGallery()
  }, [])

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Loading photography...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="py-12 text-center border">
        <p className="text-muted-foreground">No photos found.</p>
      </div>
    )
  }

  const breakpointColumns = {
    default: 3,
    1280: 3,
    1024: 2,
    768: 1
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-4 w-auto"
      columnClassName="pl-4 bg-clip-padding"
    >
      {images.map((item) => (
        <div key={item.id} className="mb-4">
          {item.type === "carousel" ? (
            <ImageCarousel
              images={item.photos}
              inFeed={true}
            />
          ) : (
            <div className="w-full">
              <img
                src={item.photos[0].src}
                alt={item.photos[0].alt}
                className="w-full h-auto object-contain"
              />
            </div>
          )}
        </div>
      ))}
    </Masonry>
  )
}

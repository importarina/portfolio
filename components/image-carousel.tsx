/**
 * Image Carousel Component
 *
 * A reusable carousel component for displaying multiple images with navigation controls.
 * Can be used both in the main feed and in a lightbox context.
 *
 * Features:
 * - Next/previous navigation
 * - Caption display
 * - Image counter
 * - Pagination indicators
 * - Responsive design
 */

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselImage {
  src: string
  alt: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  caption?: string
  onClick?: () => void
  inFeed?: boolean // Flag to indicate if carousel is in main feed
}

export function ImageCarousel({ images, caption, onClick, inFeed = false }: ImageCarouselProps) {
  // Track the current image index
  const [currentIndex, setCurrentIndex] = useState(0)

  /**
   * Navigate to the next image
   * Prevents event propagation to avoid triggering parent onClick
   */
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  /**
   * Navigate to the previous image
   * Prevents event propagation to avoid triggering parent onClick
   */
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Don't render anything if there are no images
  if (images.length === 0) return null

  return (
    <div className="relative group" onClick={onClick}>
      {/* Image container */}
      <div className="overflow-hidden">
        <img
          src={images[currentIndex].src || "/placeholder.svg"}
          alt={images[currentIndex].alt}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Navigation controls - always visible in feed, hover-visible otherwise */}
      <div
        className={`absolute inset-0 ${inFeed ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
      >
        {/* Left arrow */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute left-2 top-1/2 -translate-y-1/2 ${inFeed ? "bg-black/20" : "bg-black/30"} hover:bg-black/50 text-white h-8 w-8 cursor-pointer`}
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Right arrow */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-2 top-1/2 -translate-y-1/2 ${inFeed ? "bg-black/20" : "bg-black/30"} hover:bg-black/50 text-white h-8 w-8 cursor-pointer`}
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Caption overlay - only on hover when not in feed */}
        {caption && !inFeed && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
            <div className="flex justify-between items-center w-full">
              <p className="text-white text-sm">{caption}</p>
              <p className="text-white text-xs">
                {currentIndex + 1}/{images.length}
              </p>
            </div>
          </div>
        )}

        {/* Pagination indicators for feed view */}
        {inFeed && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Caption for feed view - always visible */}
      {caption && inFeed && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-6">
          <div className="flex justify-between items-center w-full">
            <p className="text-white text-sm">{caption}</p>
            <p className="text-white text-xs">
              {currentIndex + 1}/{images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

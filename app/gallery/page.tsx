/**
 * Photography Gallery Page
 *
 * Displays a collection of photographs in a responsive masonry layout.
 * Serves as the container for the Photography component.
 */

import { Photography } from "@/components/features/photography"

export default function GalleryPage() {
  return (
    <main className="min-h-screen pb-20 md:pl-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold rainbow-text leading-tight">Photography</h1>
        </div>

        {/* Photography component handles the gallery display */}
        <Photography />
      </div>
    </main>
  )
}

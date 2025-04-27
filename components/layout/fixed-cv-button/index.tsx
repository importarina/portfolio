"use client"

import { FileText } from "lucide-react"
import { useState, useEffect } from "react"

export function FixedCVButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button only when the header is out of view
  useEffect(() => {
    const handleScroll = () => {
      // Get the position of the profile header
      const profileHeader = document.querySelector(".profile-header")
      if (profileHeader) {
        const rect = profileHeader.getBoundingClientRect()
        // Show button when header is completely out of view
        setIsVisible(rect.bottom < 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-4 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"} right-16 md:right-8 z-30`}
    >
      <div className="relative group">
        <a
          href="/files/ArinaMomajjed-CV-web.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-lg transition-colors"
        >
          <FileText className="h-5 w-5" />
        </a>
        <span className="tooltip">
          View CV
        </span>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ImageIcon, BookOpen, Github, Linkedin, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import "./styles.css"
// import { GoodreadsIcon } from "./icons/goodreads-icon"

type DockItem = {
  name: string
  icon: React.ReactNode
  href: string
  external?: boolean
  color?: string
  onClick?: () => void
}

export function Dock() {
  const pathname = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const navigationItems: DockItem[] = [
    { 
      name: "Home", 
      icon: <Home className="h-5 w-5" />, 
      href: "/",
      color: "text-[var(--color-grey)]"
    },
    { 
      name: "Gallery", 
      icon: <ImageIcon className="h-5 w-5" />, 
      href: "/gallery",
      color: "text-[var(--color-grey)]"
    },
    { 
      name: "Blog", 
      icon: <BookOpen className="h-5 w-5" />, 
      href: "/blog",
      color: "text-[var(--color-grey)]"
    },
  ]

  const socialItems: DockItem[] = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/importarina",
      external: true,
      color: "text-[var(--color-purple)]",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com/in/arinamomajjed",
      external: true,
      color: "text-[var(--color-blue)]",
    },
    // {
    //   name: "Goodreads",
    //   icon: <GoodreadsIcon className="h-5 w-5" />,
    //   href: "https://goodreads.com",
    //   external: true,
    //   color: "text-[#553B08] dark:text-[#E9C46A]",
    // },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("/#")) return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        aria-label={showMobileMenu ? "Close menu" : "Open menu"}
      >
        {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        className={cn("mobile-dock", showMobileMenu ? "mobile-dock-visible" : "mobile-dock-hidden")}
      >
        <div className="mobile-dock-container">
          <div className="mobile-dock-items">
            {navigationItems.map((item) => (
              <DockIcon
                key={item.name}
                item={item}
                active={isActive(item.href)}
                onClick={() => setShowMobileMenu(false)}
              />
            ))}
          </div>
          <div className="mobile-dock-social">
            {socialItems.map((item) => (
              <DockIcon key={item.name} item={item} active={false} onClick={() => setShowMobileMenu(false)} />
            ))}
          </div>
        </div>
      </div>

      <div className="dock">
        <div className="dock-container">
          <div className="dock-items">
            {navigationItems.map((item) => (
              <DockIcon key={item.name} item={item} active={isActive(item.href)} />
            ))}
            <div className="dock-divider" />
            {socialItems.map((item) => (
              <DockIcon key={item.name} item={item} active={false} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function DockIcon({
  item,
  active,
  onClick,
}: {
  item: DockItem
  active: boolean
  onClick?: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <div
      className={cn("dock-icon", "group")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "dock-icon-content",
          item.color || (active ? "dock-icon-active" : "dock-icon-inactive")
        )}
      >
        {item.icon}
      </div>

      {isHovered && (
        <span className="tooltip">
          {item.name}
        </span>
      )}
    </div>
  )

  if (item.onClick) {
    return (
      <button
        className="block"
        onClick={(e) => {
          e.preventDefault()
          item.onClick?.()
          onClick?.()
        }}
      >
        {content}
      </button>
    )
  }

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="block" onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <Link href={item.href} className="block" onClick={onClick}>
      {content}
    </Link>
  )
}

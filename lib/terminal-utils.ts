/**
 * Terminal Utilities
 *
 * Helper functions and constants for the terminal component.
 * Provides path manipulation, file system navigation, and command definitions.
 */

import type React from "react"
import { type FileSystemNode, fileSystem } from "./terminal-fs"

export type CommandResult = {
  command: string
  output: React.ReactNode
}

/**
 * Format a path array into a string, using ~ for home directory
 *
 * @param path - Array of path segments
 * @returns Formatted path string
 */
export function formatPath(path: string[]): string {
  const fullPath = "/" + path.join("/")

  // Replace /home/arina with ~
  if (fullPath.startsWith("/home/arina")) {
    if (fullPath === "/home/arina") {
      return "~"
    }
    return "~" + fullPath.substring(10) // Remove "/home/arina" and replace with "~"
  }

  return fullPath
}

/**
 * Get absolute path from relative path
 *
 * @param currentPath - Current directory path
 * @param path - Target path (can be relative or absolute)
 * @returns Absolute path as array of segments
 */
export function getAbsolutePath(currentPath: string[], path: string): string[] {
  if (path.startsWith("/")) {
    // Absolute path
    const segments = path.split("/").filter(Boolean)
    return segments
  } else {
    // Relative path
    const segments = [...currentPath]
    const parts = path.split("/").filter(Boolean)

    for (const part of parts) {
      if (part === "..") {
        segments.pop()
      } else if (part !== ".") {
        segments.push(part)
      }
    }

    return segments
  }
}

/**
 * Get node at path
 *
 * @param path - Path to the node
 * @returns FileSystemNode or null if not found
 */
export function getNodeAtPath(path: string[]): FileSystemNode | null {
  let current = fileSystem

  for (const segment of path) {
    if (!current.children || !current.children[segment]) {
      return null
    }
    current = current.children[segment]
  }

  return current
}

/**
 * Get the current directory node
 *
 * @param currentPath - Current directory path
 * @returns FileSystemNode for the current directory
 */
export function getCurrentDirectory(currentPath: string[]): FileSystemNode {
  let current = fileSystem
  for (const segment of currentPath) {
    if (current.children && current.children[segment]) {
      current = current.children[segment]
    } else {
      return current
    }
  }
  return current
}

/**
 * Available terminal commands
 * Used for the help command
 */
export const AVAILABLE_COMMANDS = [
  { name: "pwd", description: "Print working directory" },
  { name: "ls", description: "List directory contents" },
  { name: "cd [directory]", description: "Change directory" },
  { name: "cat [file]", description: "Display file contents" },
  { name: "clear", description: "Clear the terminal" },
  { name: "echo [text]", description: "Display text" },
  { name: "whoami", description: "Display current user" },
  { name: "date", description: "Display current date" },
  { name: "help", description: "Show this help message" },
  { name: "open [section]", description: "Navigate to website section" },
]

/**
 * Valid sections for the 'open' command
 * Used to validate section names
 */
export const VALID_SECTIONS = ["about", "experience", "skills", "projects", "education", "gallery", "blog", "contact"]

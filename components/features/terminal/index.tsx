/**
 * Terminal Component
 *
 * An interactive terminal-like interface that allows users to navigate the portfolio
 * using command-line style interactions. Supports various commands like ls, cd, cat,
 * and open to explore content and navigate to different sections.
 *
 * Features:
 * - Command history
 * - Tab completion
 * - Directory navigation
 * - File viewing
 * - Section navigation
 */

"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Folder } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  type CommandResult,
  formatPath,
  getAbsolutePath,
  getNodeAtPath,
  getCurrentDirectory,
  AVAILABLE_COMMANDS,
  VALID_SECTIONS,
} from "@/lib/terminal-utils"

export function Terminal() {
  // State for terminal functionality
  const [currentPath, setCurrentPath] = useState<string[]>(["home", "arina"])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandResult[]>([
    {
      command: "",
      output: (
        <div className="text-green-500">
          <p>Interactive terminal for arina.sh.</p>
          <p>
            Type <span className="font-bold text-yellow-500">help</span> to see available commands.
          </p>
        </div>
      ),
    },
  ])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  // Refs for DOM elements
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Router for navigation
  const router = useRouter()

  /**
   * Execute a command entered by the user
   * Parses the command and arguments, then performs the appropriate action
   *
   * @param cmd - The command string to execute
   */
  const executeCommand = useCallback(
    (cmd: string) => {
      const command = cmd.trim()

      if (command === "") {
        return
      }

      // Add to command history
      setCommandHistory((prev) => [command, ...prev])
      setHistoryIndex(-1)

      // Parse command and arguments
      const parts = command.split(" ")
      const mainCommand = parts[0].toLowerCase()
      const args = parts.slice(1)

      let output: React.ReactNode

      // Process command
      switch (mainCommand) {
        case "help":
          output = (
            <div>
              <p className="font-bold">Available commands:</p>
              <ul className="list-disc pl-5">
                {AVAILABLE_COMMANDS.map((cmd, index) => (
                  <li key={index}>
                    <span className="font-bold">{cmd.name}</span> - {cmd.description}
                  </li>
                ))}
              </ul>
            </div>
          )
          break

        case "pwd":
          output = <p>{formatPath(currentPath)}</p>
          break

        case "ls":
          const targetPath = args.length > 0 ? getAbsolutePath(currentPath, args[0]) : currentPath
          const targetDir = getNodeAtPath(targetPath)

          if (!targetDir) {
            output = <p className="text-red-500">ls: cannot access '{args[0]}': No such directory</p>
          } else if (targetDir.type !== "directory") {
            output = <p className="text-red-500">ls: cannot access '{args[0]}': Not a directory</p>
          } else {
            const items = Object.values(targetDir.children || {})
            output = (
              <div className="grid grid-cols-3 gap-2">
                {items.map((item, i) => (
                  <div key={i} className={`${item.type === "directory" ? "text-blue-500" : ""}`}>
                    {item.name}
                    {item.type === "directory" ? "/" : ""}
                  </div>
                ))}
              </div>
            )
          }
          break

        case "cd":
          if (args.length === 0) {
            // cd with no args goes to home
            setCurrentPath(["home", "arina"])
            output = <p>Changed directory to /home/arina</p>
          } else {
            const newPath = getAbsolutePath(currentPath, args[0])
            const targetDir = getNodeAtPath(newPath)

            if (!targetDir) {
              output = <p className="text-red-500">cd: no such directory: {args[0]}</p>
            } else if (targetDir.type !== "directory") {
              output = <p className="text-red-500">cd: not a directory: {args[0]}</p>
            } else {
              setCurrentPath(newPath)
              output = <p>Changed directory to {formatPath(newPath)}</p>
            }
          }
          break

        case "cat":
          if (args.length === 0) {
            output = <p className="text-red-500">cat: missing file operand</p>
          } else {
            // Get the full path to the file
            const filePath = getAbsolutePath(currentPath, args[0])

            // Try to get the file directly from the path
            const fileNode = getNodeAtPath(filePath)

            if (!fileNode) {
              output = <p className="text-red-500">cat: {args[0]}: No such file or directory</p>
            } else if (fileNode.type !== "file") {
              output = <p className="text-red-500">cat: {args[0]}: Is a directory</p>
            } else {
              output = <pre className="whitespace-pre-wrap">{fileNode.content}</pre>
            }
          }
          break

        case "clear":
          setHistory([])
          setInput("")
          return

        case "echo":
          output = <p>{args.join(" ")}</p>
          break

        case "whoami":
          output = <p>arina</p>
          break

        case "date":
          output = <p>{new Date().toString()}</p>
          break

        case "open":
          if (args.length === 0) {
            output = <p className="text-red-500">open: missing section name</p>
          } else {
            const section = args[0].toLowerCase()

            if (VALID_SECTIONS.includes(section)) {
              output = <p>Opening {section} section...</p>

              // Handle navigation to separate pages
              if (section === "gallery" || section === "blog") {
                setTimeout(() => {
                  router.push(`/${section}`)
                }, 500)
              } else {
                // Navigate to section on home page
                setTimeout(() => {
                  document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
                }, 500)
              }
            } else {
              output = <p className="text-red-500">open: invalid section: {section}</p>
            }
          }
          break

        default:
          output = <p className="text-red-500">Command not found: {mainCommand}. Type 'help' for available commands.</p>
      }

      setHistory((prev) => [...prev, { command, output }])
      setInput("")
    },
    [currentPath, router],
  )

  /**
   * Handle keyboard events for the terminal input
   * Supports Enter (execute), Arrow Up/Down (history), and Tab (completion)
   *
   * @param e - Keyboard event
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        executeCommand(input)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        } else if (historyIndex === 0) {
          setHistoryIndex(-1)
          setInput("")
        }
      } else if (e.key === "Tab") {
        e.preventDefault()
        // Simple tab completion for files and directories
        const parts = input.split(" ")
        if (parts.length > 1) {
          const lastPart = parts[parts.length - 1]
          const currentDir = getCurrentDirectory(currentPath)

          if (currentDir.children) {
            const matches = Object.keys(currentDir.children).filter((name) => name.startsWith(lastPart))

            if (matches.length === 1) {
              parts[parts.length - 1] = matches[0]
              if (currentDir.children[matches[0]].type === "directory") {
                parts[parts.length - 1] += "/"
              }
              setInput(parts.join(" "))
            }
          }
        }
      }
    },
    [commandHistory, executeCommand, currentPath, historyIndex, input],
  )

  // Scroll to bottom when history changes
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [history]);

  return (
    <Card className="border-2 border-gray-200 dark:border-gray-800">
      <CardContent className="p-0">
        {/* Terminal header */}
        <div className="bg-gray-200 dark:bg-gray-800 p-2 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-center flex-1 text-sm font-mono flex items-center justify-center gap-1">
            <Folder className="h-4 w-4" />
            <span>{formatPath(currentPath)}</span>
          </div>
        </div>

        {/* Terminal content area */}
        <ScrollArea className="h-[300px] p-4 font-mono text-sm" ref={scrollAreaRef}>
          {/* Command history */}
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.command && (
                <div className="flex">
                  <span className="text-green-500 mr-2">$</span>
                  <span>{item.command}</span>
                </div>
              )}
              <div className="ml-4">{item.output}</div>
            </div>
          ))}

          {/* Current input line */}
          <div className="flex items-center">
            <span className="text-green-500 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none flex-1 font-mono"
              aria-label="Terminal input"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

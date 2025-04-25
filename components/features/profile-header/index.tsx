import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <Avatar className="w-56 h-56 md:w-64 md:h-64">
          <AvatarImage src="/images/profile/arina.png" alt="Arina Momajjed" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <h1 className="text-5xl md:text-6xl font-bold rainbow-text">Arina Momajjed</h1>
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 h-auto rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              asChild
            >
              <a href="/files/arina-momajjed-cv.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="h-5 w-5 text-gray-500" />
              </a>
            </Button>
            <span className="tooltip">
              View CV
            </span>
          </div>
        </div>

        <p className="text-2xl md:text-3xl text-muted-foreground mt-3">Software Engineer</p>

        <p className="mt-6 max-w-none text-lg md:text-xl">
          <span className="block">Driven software engineer and UofT CS Alumna.</span>
          <span className="block">I love creating impactful, efficient, and scalable software.</span>
          <span className="block">Welcome to my personal website!</span>
        </p>
      </div>
    </div>
  )
}

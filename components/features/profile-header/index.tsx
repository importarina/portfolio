import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <Avatar className="w-40 h-40">
        <AvatarImage src="/images/profile/arina.png" alt="Arina Momajjed" />
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>

      <div className="text-center md:text-left flex-1">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <h1 className="text-4xl font-bold rainbow-text">Arina Momajjed</h1>
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              asChild
            >
              <a href="/files/arina-momajjed-cv.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4 text-gray-500" />
              </a>
            </Button>
            <span className="tooltip">
              View CV
            </span>
          </div>
        </div>

        <p className="text-xl text-muted-foreground mt-1">Software Engineer</p>

        <p className="mt-4 max-w-none">
          <span className="block">Driven software engineer and UofT CS Alumna.</span>
          <span className="block">Specialized in creating impactful, efficient, and scalable software solutions.</span>
          <span className="block">Welcome to my personal website!</span>
        </p>

      </div>
    </div>
  )

}

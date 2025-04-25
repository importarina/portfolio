import { cn } from "@/lib/utils"

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
        className={cn(
            "w-full border-t bg-background pt-0 pb-2 text-center text-sm text-muted-foreground",
            className
        )}
        {...props}
    >
        <div className="container">
            <p>&copy; {new Date().getFullYear()} Arina Momajjed 🦦</p>
        </div>
    </footer>
  )
} 
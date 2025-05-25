"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import Script from "next/script"

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
})

type ContactFormData = z.infer<typeof contactSchema>

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function Contact() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)

  useEffect(() => {
    const initializeRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          console.log("reCAPTCHA is ready")
          console.log("Site key:", process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
          setRecaptchaLoaded(true)
        })
      }
    }

    if (document.readyState === 'complete') {
      initializeRecaptcha()
    } else {
      window.addEventListener('load', initializeRecaptcha)
      return () => window.removeEventListener('load', initializeRecaptcha)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    try {
      contactSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<ContactFormData> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      })
      return
    }

    if (!recaptchaLoaded) {
      toast({
        title: "Error",
        description: "reCAPTCHA is not ready. Please try again.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setIsError(false)

    try {
      // Get reCAPTCHA token
      console.log("Getting reCAPTCHA token...")
      const recaptchaToken = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
        { action: 'submit_contact_form' }
      )
      console.log("reCAPTCHA token received:", recaptchaToken ? "Yes" : "No")

      if (!recaptchaToken) {
        throw new Error("Failed to get reCAPTCHA token")
      }

      console.log("Sending request to backend...")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      })

      console.log("Response status:", response.status)
      const data = await response.json()
      console.log("Response data:", data)

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Only show success if we get a 201 status
      if (response.status === 201) {
        setIsSuccess(true)
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        })

        setFormData({ name: "", email: "", message: "" })
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      } else {
        throw new Error("Unexpected response from server")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log("reCAPTCHA script loaded")
          setRecaptchaLoaded(true)
        }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>arinamomajjed@gmail.com</p>
              </div>
            </div>

            {/* <div className="flex items-center space-x-4">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p>+1 (999) 123-4567</p>
              </div>
            </div> */}

            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p>Toronto, Canada</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className={`resize-none ${errors.message ? "border-red-500" : ""}`}
                  required
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || !recaptchaLoaded} 
                variant="default"
                className={`w-full transition-all duration-300 ${
                  isSuccess 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : isError 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : ''
                }`}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : isSuccess ? (
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Message Sent!
                  </span>
                ) : isError ? (
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a 
                      href="mailto:arinamomajjed@gmail.com" 
                      className="hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Send direct email instead
                    </a>
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This form is protected by reCAPTCHA and the Google{' '}
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Privacy Policy
              </a>
              {' '}and{' '}
              <a 
                href="https://policies.google.com/terms" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Terms of Service
              </a>
              {' '}apply.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

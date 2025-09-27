"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Internship = {
  id: string | number
  title: string
  organization: string
  location: string
  duration?: string
  stipend?: string
  skills?: string[] | string
  sector?: string
  savedDate?: string
}

type SavedInternshipsContextType = {
  savedInternships: Internship[]
  saveInternship: (internship: Internship) => void
  removeInternship: (id: string | number) => void
  isInternshipSaved: (id: string | number) => boolean
}

const SavedInternshipsContext = createContext<SavedInternshipsContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [savedInternships, setSavedInternships] = useState<Internship[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("savedInternships")
      if (stored) {
        try {
          setSavedInternships(JSON.parse(stored))
        } catch (err) {
          console.error("Error parsing saved internships:", err)
          setSavedInternships([])
        }
      }
      setIsLoaded(true)
    }
  }, [])

  // Persist to localStorage when internships change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("savedInternships", JSON.stringify(savedInternships))
    }
  }, [savedInternships, isLoaded])

  const saveInternship = (internship: Internship) => {
    setSavedInternships((prev) => {
      if (prev.some((i) => i.id === internship.id)) return prev
      return [...prev, { ...internship, savedDate: new Date().toISOString() }]
    })
  }

  const removeInternship = (id: string | number) => {
    setSavedInternships((prev) => prev.filter((i) => i.id !== id))
  }

  const isInternshipSaved = (id: string | number) => {
    return savedInternships.some((i) => i.id === id)
  }

  return (
    <SavedInternshipsContext.Provider
      value={{ savedInternships, saveInternship, removeInternship, isInternshipSaved }}
    >
      {children}
    </SavedInternshipsContext.Provider>
  )
}

export function useSavedInternships() {
  const context = useContext(SavedInternshipsContext)
  if (!context) {
    throw new Error("useSavedInternships must be used within an AppProvider")
  }
  return context
}

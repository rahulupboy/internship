"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bookmark, MapPin, Clock, Search } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { useSavedInternships } from "@/lib/store"

const sectors = ["All Sectors", "Technology", "Finance", "Marketing", "Design", "Healthcare", "Education"]

export default function RecommendationsPage() {
  const [skills, setSkills] = useState("")
  const [location, setLocation] = useState("")
  const [sector, setSector] = useState("All Sectors")
  const [isLoading, setIsLoading] = useState(false)
  const [internships, setInternships] = useState<any[]>([])

  const { saveInternship, removeInternship, isInternshipSaved } = useSavedInternships()

  // ✅ Fetch internships (all if no filters)
  const handleSearch = async () => {
    setIsLoading(true)
    try {
      let body: any = {}

      if (skills.trim()) body.skills = skills.trim()
      if (location.trim()) body.location = location.trim()
      if (sector !== "All Sectors") body.sector = sector

      if (Object.keys(body).length === 0) {
        body = { all: true } // ✅ Fetch everything
      }

      const res = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error("Failed to fetch recommendations")

      const data = await res.json()
      setInternships(data)
    } catch (err) {
      console.error("Error fetching recommendations:", err)
      setInternships([])
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ Load all internships on first render
  useEffect(() => {
    handleSearch()
  }, [])

  // ✅ Toggle Save Internship
  const toggleSave = (internship: any) => {
    const internshipWithId = {
      ...internship,
      id:
        internship.id ||
        `${internship.title}-${internship.organization}`.replace(/\s+/g, "-").toLowerCase(),
      savedDate: new Date().toISOString(),
    }

    if (isInternshipSaved(internshipWithId.id)) {
      removeInternship(internshipWithId.id)
    } else {
      saveInternship(internshipWithId)
    }
  }

  const SkeletonCard = () => (
    <Card className="rounded-2xl animate-pulse">
      <CardHeader>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search/Filter Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Your Perfect Internship</h1>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <Input
                placeholder="e.g. React, Python, Marketing"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="rounded-2xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <Input
                placeholder="e.g. San Francisco, Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-2xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSearch} className="w-full md:w-auto px-8 py-3 rounded-2xl" disabled={isLoading}>
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? "Searching..." : "Find Internships"}
          </Button>
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {isLoading ? "Searching..." : `${internships.length} internships found`}
          </h2>
        </div>

        {/* Internship Cards */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : internships.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No internships found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
            <Button
              onClick={() => {
                setSkills("")
                setLocation("")
                setSector("All Sectors")
                handleSearch()
              }}
              variant="outline"
              className="rounded-2xl"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship, index) => (
              <Card key={index} className="rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900 mb-1">{internship.title}</CardTitle>
                      <p className="text-gray-600 font-medium">{internship.organization}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSave(internship)}
                      className="rounded-full p-2"
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          isInternshipSaved(
                            internship.id ||
                              `${internship.title}-${internship.organization}`.replace(/\s+/g, "-").toLowerCase(),
                          )
                            ? "fill-blue-600 text-blue-600"
                            : "text-gray-400"
                        }`}
                      />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{internship.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{internship.duration}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {Array.isArray(internship.skills)
                        ? internship.skills.slice(0, 3).map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="rounded-full text-xs">
                              {skill}
                            </Badge>
                          ))
                        : typeof internship.skills === "string"
                        ? internship.skills
                            .split(",")
                            .slice(0, 3)
                            .map((skill: string) => (
                              <Badge key={skill.trim()} variant="secondary" className="rounded-full text-xs">
                                {skill.trim()}
                              </Badge>
                            ))
                        : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Heart, Trash } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { useSavedInternships } from "@/lib/store"

export default function SavedInternshipsPage() {
  const { savedInternships, removeInternship } = useSavedInternships()

  const EmptyState = () => (
    <div className="text-center py-20">
      <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <Heart className="h-16 w-16 text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">No saved internships yet</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Start exploring internships and save the ones that interest you. They'll appear here for easy access.
      </p>
      <Link href="/recommendations">
        <Button className="rounded-2xl px-6 py-3">Browse Internships</Button>
      </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Internships</h1>
          <p className="text-gray-600">
            {savedInternships.length > 0
              ? `You have ${savedInternships.length} saved internship${savedInternships.length === 1 ? "" : "s"}`
              : "Keep track of internships that interest you"}
          </p>
        </div>

        {/* Saved Internships */}
        {savedInternships.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedInternships.map((internship) => (
              <Card key={internship.id} className="rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900 mb-1">{internship.title}</CardTitle>
                      <p className="text-gray-600 font-medium">{internship.organization}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInternship(internship.id)}
                      className="rounded-full p-2 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4 text-red-500 hover:text-red-700 transition-colors" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Saved on{" "}
                    {internship.savedDate ? new Date(internship.savedDate).toLocaleDateString() : "Unknown date"}
                  </p>
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

                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">{internship.stipend}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {internship.skills &&
                        (Array.isArray(internship.skills)
                          ? internship.skills
                          : internship.skills.split(",") // fallback if string
                        )
                          .slice(0, 3)
                          .map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="rounded-full text-xs">
                              {skill}
                            </Badge>
                          ))}
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <Button className="w-full rounded-2xl" size="sm">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        {savedInternships.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/recommendations">
                <Button variant="outline" className="rounded-2xl bg-transparent">
                  Find More Internships
                </Button>
              </Link>
              <Button
                variant="outline"
                className="rounded-2xl bg-transparent"
                onClick={() => {
                  const data = savedInternships
                    .map((i) => `${i.title} at ${i.organization} - ${i.location}`)
                    .join("\n")
                  navigator.clipboard.writeText(data)
                }}
              >
                Export List
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

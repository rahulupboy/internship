"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, GraduationCap, Plus, X, MapPin, Clock, DollarSign, BookOpen } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { useUserProfile, useSavedInternships } from "@/lib/store"

// Mock user data
const mockUserData = {
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  college: "Stanford University",
  bio: "Computer Science student passionate about software development and AI. Looking for internships in tech companies to gain hands-on experience.",
  skills: ["React", "JavaScript", "Python", "Node.js", "Machine Learning", "SQL"],
  avatar: "/student-avatar.png",
}

// Mock saved internships (smaller version)
const mockSavedInternships = [
  {
    id: 1,
    title: "Software Engineering Intern",
    organization: "TechCorp Inc.",
    location: "San Francisco, CA",
    duration: "3 months",
    stipend: "$2,500/month",
  },
  {
    id: 4,
    title: "UX Design Intern",
    organization: "DesignStudio Pro",
    location: "Seattle, WA",
    duration: "6 months",
    stipend: "$2,200/month",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [newSkill, setNewSkill] = useState("")

  const { userProfile, updateProfile, addSkill, removeSkill } = useUserProfile()
  const { savedInternships } = useSavedInternships()

  const handleSave = () => {
    setIsEditing(false)
    // Profile is automatically saved via global state
  }

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim())
      setNewSkill("")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    updateProfile({ [field]: value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
              <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                {userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{userProfile.name}</h1>
              <p className="text-gray-600 mb-4">{userProfile.college}</p>
              <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
            </div>

            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="rounded-2xl">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-2xl">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="rounded-2xl">
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={userProfile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1 rounded-2xl"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{userProfile.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1 rounded-2xl"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{userProfile.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="college" className="text-sm font-medium text-gray-700">
                  College/University
                </Label>
                {isEditing ? (
                  <Input
                    id="college"
                    value={userProfile.college}
                    onChange={(e) => handleInputChange("college", e.target.value)}
                    className="mt-1 rounded-2xl"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{userProfile.college}</p>
                )}
              </div>

              <div>
                <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                  Bio
                </Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={userProfile.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="mt-1 rounded-2xl"
                    rows={3}
                  />
                ) : (
                  <p className="mt-1 text-gray-900 leading-relaxed">{userProfile.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userProfile.skills.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">Add your skills to get better matches.</p>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                        className="rounded-2xl"
                      />
                      <Button onClick={handleAddSkill} size="sm" className="rounded-2xl">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {userProfile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="rounded-full text-sm py-1 px-3">
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 hover:text-red-500 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                        className="rounded-2xl"
                      />
                      <Button onClick={handleAddSkill} size="sm" className="rounded-2xl">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Saved Internships */}
        <Card className="rounded-2xl mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Saved Internships
              </CardTitle>
              <Link href="/saved">
                <Button variant="outline" size="sm" className="rounded-2xl bg-transparent">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {savedInternships.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-4">You haven't saved any internships yet.</p>
                <Link href="/recommendations">
                  <Button className="rounded-2xl">Browse Internships</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {savedInternships.slice(0, 3).map((internship) => (
                  <div
                    key={internship.id}
                    className="border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{internship.title}</h4>
                        <p className="text-gray-600 text-sm">{internship.organization}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {internship.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {internship.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {internship.stipend}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

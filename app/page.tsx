"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

type Stats = {
  internships: number
  companies: number
  successRate: number
}

export default function LandingPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/stats") // Flask route
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        } else {
          console.error("Failed to fetch stats")
        }
      } catch (err) {
        console.error("Error fetching stats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Find Your Perfect Internship
          </h1>
          <p className="text-xl text-gray-600 mb-12 text-pretty max-w-2xl mx-auto">
            Personalized recommendations based on your skills, location, and interests. Discover opportunities that
            match your career goals.
          </p>

          <Link href="/recommendations">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Matching</h3>
            <p className="text-gray-600">
              Our algorithm matches you with internships based on your skills, interests, and career goals.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Location Flexible</h3>
            <p className="text-gray-600">
              Find opportunities near you or explore remote internships from companies worldwide.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">All Industries</h3>
            <p className="text-gray-600">
              From tech startups to Fortune 500 companies, discover internships across all sectors.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl p-12 mt-24 shadow-sm">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {loading ? "..." : `${stats?.internships.toLocaleString()}+`}
              </div>
              <div className="text-gray-600">Active Internships</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {loading ? "..." : `${stats?.companies.toLocaleString()}+`}
              </div>
              <div className="text-gray-600">Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {loading ? "..." : `${stats?.successRate}%`}
              </div>
              <div className="text-gray-600">Match Success Rate</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 InternMatch. Built for students, by students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

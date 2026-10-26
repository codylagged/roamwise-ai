import React, { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import TripBuilder from "./components/TripBuilder"
import ItineraryViewer from "./components/ItineraryViewer"
import SavedTrips from "./components/SavedTrips"

export default function App() {
  const [activeTab, setActiveTab] = useState("planner")
  const [currentItinerary, setCurrentItinerary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [savedTrips, setSavedTrips] = useState(() => {
    const saved = localStorage.getItem("roamwise_trips")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("roamwise_trips", JSON.stringify(savedTrips))
  }, [savedTrips])

  // Generator engine (local fallback if FastAPI server is not started)
  const generateItinerary = async (formData) => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:8000/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        const data = await res.json()
        setCurrentItinerary(data)
        setLoading(false)
        return
      }
    } catch {
      // Backend not running, use client-side generator
    }

    // Client-side mock generator
    setTimeout(() => {
      const generatedDays = []
      for (let i = 1; i <= formData.days; i++) {
        generatedDays.push({
          day: i,
          theme: i === 1 ? "Arrival & Orientation" : i === 2 ? "Cultural Exploration" : "Hidden Gems & Leisure",
          morning: [
            {
              time: "09:00 AM",
              title: `${formData.destination} Landmark Walking Tour`,
              location: "Historic District",
              estimatedCost: "$15",
              description: `Explore primary sights and historical architecture matching your interest in ${formData.interests[0] || "Culture"}.`
            }
          ],
          afternoon: [
            {
              time: "01:00 PM",
              title: "Artisanal Lunch & Regional Market",
              location: "Old Town Market",
              estimatedCost: "$25",
              description: "Taste authentic local cuisine and browse traditional handicrafts."
            }
          ],
          evening: [
            {
              time: "06:30 PM",
              title: "Scenic Sunset Point & Waterfront Dinner",
              location: "Scenic Promenade",
              estimatedCost: "$40",
              description: "Unwind at a popular sunset vantage point followed by a dinner."
            }
          ]
        })
      }

      const mockPlan = {
        id: "trip_" + Date.now(),
        destination: formData.destination,
        days: generatedDays,
        budget: formData.budget,
        travelers: formData.travelers,
        pace: formData.pace,
        transportGuidance: "Public transit passes available at station; ride-sharing active in city core.",
        estimatedTotal: formData.budget === "Luxury" ? "$800 - $1400" : "$250 - $450"
      }

      setCurrentItinerary(mockPlan)
      setLoading(false)
    }, 700)
  }

  const handleSaveTrip = (itinerary) => {
    if (!savedTrips.some(t => t.id === itinerary.id)) {
      setSavedTrips([itinerary, ...savedTrips])
      alert("Itinerary saved successfully!")
    } else {
      alert("This trip is already in your saved collection.")
    }
  }

  const handleDeleteTrip = (id) => {
    setSavedTrips(savedTrips.filter(t => t.id !== id))
  }

  const handleLoadTrip = (trip) => {
    setCurrentItinerary(trip)
    setActiveTab("planner")
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        savedCount={savedTrips.length} 
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {activeTab === "planner" ? (
          <>
            <TripBuilder onGenerate={generateItinerary} loading={loading} />
            <ItineraryViewer 
              itinerary={currentItinerary} 
              onSave={handleSaveTrip} 
              onUpdateItinerary={setCurrentItinerary} 
            />
          </>
        ) : (
          <SavedTrips 
            trips={savedTrips} 
            onLoadTrip={handleLoadTrip} 
            onDeleteTrip={handleDeleteTrip} 
          />
        )}
      </main>

      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-500 bg-white no-print">
        RoamWise AI &copy; 2026 — Demonstrable College Submission Prototype
      </footer>
    </div>
  )
}

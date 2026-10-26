import React, { useState } from "react"
import { Sparkles, MapPin, Calendar, Users, DollarSign, Gauge, HeartHandshake } from "lucide-react"

export default function TripBuilder({ onGenerate, loading }) {
  const [formData, setFormData] = useState({
    destination: "Goa, India",
    days: 3,
    budget: "Moderate",
    travelers: 2,
    style: "Balanced",
    pace: "Relaxed",
    interests: ["Beaches", "Local Food", "Sunset Spots"]
  })

  const interestOptions = [
    "Historical Sites", "Local Food", "Beaches", "Hiking", 
    "Nightlife", "Museums", "Photography", "Sunset Spots", "Shopping"
  ]

  const toggleInterest = (item) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter(i => i !== item)
        : [...prev.interests, item]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate(formData)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-600" />
          Create Your Travel Itinerary
        </h2>
        <p className="text-sm text-slate-500">Provide your travel preferences and let the planner construct a schedule.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600" /> Destination
            </label>
            <input
              type="text"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-teal-600 font-medium"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              placeholder="e.g. Kyoto, Japan or Paris, France"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-600" /> Duration (Days)
            </label>
            <input
              type="number"
              min="1"
              max="7"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-teal-600 font-medium"
              value={formData.days}
              onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-1.5">
              <DollarSign className="w-3.5 h-3.5 text-teal-600" /> Budget
            </label>
            <select
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-teal-600 font-medium bg-white"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            >
              <option value="Budget-Friendly">Budget-Friendly</option>
              <option value="Moderate">Moderate</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-1.5">
              <Users className="w-3.5 h-3.5 text-teal-600" /> Travelers
            </label>
            <input
              type="number"
              min="1"
              max="20"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-teal-600 font-medium"
              value={formData.travelers}
              onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-1.5">
              <Gauge className="w-3.5 h-3.5 text-teal-600" /> Travel Pace
            </label>
            <select
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-teal-600 font-medium bg-white"
              value={formData.pace}
              onChange={(e) => setFormData({ ...formData, pace: e.target.value })}
            >
              <option value="Relaxed">Relaxed</option>
              <option value="Moderate">Moderate</option>
              <option value="Action-Packed">Action-Packed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-teal-600" /> Interests & Focus
          </label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((item) => {
              const active = formData.interests.includes(item)
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleInterest(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    active
                      ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating Itinerary...
            </span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Smart Itinerary
            </>
          )}
        </button>
      </form>
    </div>
  )
}

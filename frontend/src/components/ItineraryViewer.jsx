import React, { useState } from "react"
import { Printer, Save, Trash2, Plus, Clock, MapPin, DollarSign, AlertCircle } from "lucide-react"

export default function ItineraryViewer({ itinerary, onSave, onUpdateItinerary }) {
  const [activeDayIdx, setActiveDayIdx] = useState(0)

  if (!itinerary || !itinerary.days || itinerary.days.length === 0) {
    return null
  }

  const currentDay = itinerary.days[activeDayIdx] || itinerary.days[0]

  const removeActivity = (periodKey, actIdx) => {
    const updated = JSON.parse(JSON.stringify(itinerary))
    updated.days[activeDayIdx][periodKey].splice(actIdx, 1)
    onUpdateItinerary(updated)
  }

  const addActivity = (periodKey) => {
    const title = prompt("Enter activity title:")
    if (!title) return
    const cost = prompt("Enter estimated cost (e.g. $15 or Free):") || "Free"
    const location = prompt("Enter location/venue:") || itinerary.destination

    const updated = JSON.parse(JSON.stringify(itinerary))
    updated.days[activeDayIdx][periodKey].push({
      title,
      time: periodKey === "morning" ? "09:30 AM" : periodKey === "afternoon" ? "02:00 PM" : "07:30 PM",
      location,
      estimatedCost: cost,
      description: "Custom user-added activity."
    })
    onUpdateItinerary(updated)
  }

  return (
    <div className="mt-8 max-w-5xl mx-auto space-y-6">
      {/* Top Banner & Actions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-800">
              Trip Itinerary
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs font-semibold text-slate-500">{itinerary.budget}</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-1">{itinerary.destination}</h2>
          <p className="text-sm text-slate-500">
            {itinerary.days.length} Days • {itinerary.travelers} Traveler(s) • {itinerary.pace} Pace
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <Printer className="w-4 h-4" /> Print / PDF
          </button>
          <button
            onClick={() => onSave(itinerary)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
          >
            <Save className="w-4 h-4" /> Save Trip
          </button>
        </div>
      </div>

      {/* Demo / Cost notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-amber-800">
        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
        <span>Demonstration mode: Estimated costs and suggestions are computed based on travel parameters.</span>
      </div>

      {/* Day Selector Navigation */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 no-print overflow-x-auto">
        {itinerary.days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => setActiveDayIdx(idx)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition ${
              activeDayIdx === idx
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Day {day.day}: {day.theme || `Day ${idx + 1}`}
          </button>
        ))}
      </div>

      {/* Schedule for Current Day */}
      <div className="space-y-4">
        {["morning", "afternoon", "evening"].map((period) => (
          <div key={period} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  period === "morning" ? "bg-amber-400" : period === "afternoon" ? "bg-orange-500" : "bg-indigo-600"
                }`}></span>
                {period}
              </h3>
              <button
                onClick={() => addActivity(period)}
                className="no-print text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {currentDay[period]?.length === 0 && (
                <p className="text-xs text-slate-400 italic">No events scheduled. Click &quot;Add Item&quot; to plan one.</p>
              )}
              {currentDay[period]?.map((act, actIdx) => (
                <div 
                  key={actIdx} 
                  className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded">
                        {act.time}
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm">{act.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500">{act.description}</p>
                    <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {act.location}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-slate-600">
                        <DollarSign className="w-3 h-3 text-emerald-600" /> {act.estimatedCost}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeActivity(period, actIdx)}
                    className="no-print p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Remove activity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Practical Tips & Summary */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-teal-400">Practical Travel Guidance</h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Local transportation options: {itinerary.transportGuidance || "Metro, licensed taxis, and ride-shares."}
          </p>
        </div>
        <div className="text-right sm:border-l sm:border-slate-700 sm:pl-6">
          <span className="text-xs text-slate-400 block">Total Est. Cost</span>
          <span className="text-lg font-black text-emerald-400">{itinerary.estimatedTotal || "$350 - $550"}</span>
        </div>
      </div>
    </div>
  )
}

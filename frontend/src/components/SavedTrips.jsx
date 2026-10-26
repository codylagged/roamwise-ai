import React from "react"
import { Calendar, MapPin, Trash2, Eye } from "lucide-react"

export default function SavedTrips({ trips, onLoadTrip, onDeleteTrip }) {
  if (trips.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center bg-white border border-slate-200 rounded-2xl shadow-xs">
        <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">No Saved Trips Yet</h3>
        <p className="text-sm text-slate-500 mt-1">
          Generate an itinerary in the planner tab and click &quot;Save Trip&quot; to preserve it here.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Saved Travel Itineraries ({trips.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {trip.budget}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {trip.days?.length} Days
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mt-2">{trip.destination}</h3>
              <p className="text-xs text-slate-500 mt-1">
                Travelers: {trip.travelers} • Pace: {trip.pace}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => onDeleteTrip(trip.id)}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                title="Delete Trip"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onLoadTrip(trip)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
              >
                <Eye className="w-3.5 h-3.5" /> View Itinerary
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

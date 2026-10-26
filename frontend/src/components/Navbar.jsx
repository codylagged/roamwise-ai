import React from "react"
import { Compass, Sparkles, BookmarkCheck } from "lucide-react"

export default function Navbar({ activeTab, setActiveTab, savedCount }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          onClick={() => setActiveTab("planner")}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">RoamWise</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">AI</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium -mt-1">Smart Travel Planner</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("planner")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === "planner" 
                ? "bg-teal-600 text-white shadow-sm" 
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Plan Trip</span>
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === "saved" 
                ? "bg-teal-600 text-white shadow-sm" 
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Saved Trips</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-xs font-bold bg-teal-100 text-teal-900">
                {savedCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}

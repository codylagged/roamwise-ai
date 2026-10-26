from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="RoamWise AI Itinerary API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PlanRequest(BaseModel):
    destination: str
    days: int
    budget: str
    travelers: int
    pace: str
    interests: List[str]

@app.get("/")
def read_root():
    return {"status": "online", "service": "RoamWise AI Backend"}

@app.post("/api/plan")
def create_itinerary(req: PlanRequest):
    generated_days = []
    for d in range(1, req.days + 1):
        generated_days.append({
            "day": d,
            "theme": f"Day {d} Exploration",
            "morning": [{
                "time": "09:30 AM",
                "title": f"{req.destination} City Discovery",
                "location": "City Center",
                "estimatedCost": "$15",
                "description": f"Exploring key landmarks tailored for {req.travelers} traveler(s)."
            }],
            "afternoon": [{
                "time": "01:30 PM",
                "title": "Local Culinary Experience",
                "location": "Old Market Quarter",
                "estimatedCost": "$20",
                "description": "Authentic regional lunch and neighborhood stroll."
            }],
            "evening": [{
                "time": "07:00 PM",
                "title": "Night Vista & Promenade",
                "location": "Riverfront Walk",
                "estimatedCost": "$35",
                "description": "Scenic evening walk and dinner."
            }]
        })
    
    return {
        "id": f"trip_backend_{req.days}_{req.budget}",
        "destination": req.destination,
        "days": generated_days,
        "budget": req.budget,
        "travelers": req.travelers,
        "pace": req.pace,
        "transportGuidance": "Local metro passes and ride-hailing services recommended.",
        "estimatedTotal": "$300 - $600 (Backend Computed)"
    }


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, detection, alerts

app = FastAPI(
    title="Crimson Defense API",
    description="Local Backend for Mobile Intrusion Detection System",
    version="1.0.0"
)

# CORS Configuration
# Allowing all origins for local development to prevent 'Failed to fetch' errors
# caused by port mismatches or strict origin policies.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(detection.router, prefix="/api/v1/detect", tags=["Detection Modules"])
app.include_router(alerts.router, prefix="/api/v1/alerts", tags=["Alerts"])

@app.get("/")
def root():
    return {"message": "Crimson Defense Backend is Online", "docs": "/docs"}

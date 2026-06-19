from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.session import engine, Base
from app.core.config import settings

# API Routers
from app.api.auth import router as auth_router
from app.api.analysis import router as analysis_router
from app.api.analytics import router as analytics_router
from app.api.monitoring import router as monitoring_router
from app.api.reports import router as reports_router

# Ensure tables are created (Using Alembic is better for prod, but this is safe for prototyping)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for SentinelAI Sentiment Monitoring Agent.",
    version="1.0.0"
)

# Configure CORS for React integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, specify proper React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Root
@app.get("/")
def root():
    return {"message": "SentinelAI Backend System Online", "docs": "/docs"}

# Include Routers
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(analysis_router, prefix=f"{settings.API_V1_STR}", tags=["AI Analysis"])
app.include_router(analytics_router, prefix=f"{settings.API_V1_STR}/analytics", tags=["Analytics Module"])
app.include_router(monitoring_router, prefix=f"{settings.API_V1_STR}/monitoring", tags=["Monitoring Module"])
app.include_router(reports_router, prefix=f"{settings.API_V1_STR}/reports", tags=["Report Generation"])


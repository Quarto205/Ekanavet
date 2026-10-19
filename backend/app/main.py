from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.api import api_router
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API for EkanaVet wholesale veterinary platform",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:5173",  # React Frontend default
    "http://localhost:5174",  # React Frontend alternative
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"message": "Welcome to EkanaVet API", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

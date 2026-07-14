from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routes import router
from app.core.config import settings
from app.models.model_loader import model_loader


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="FastAPI backend for AI-powered image super-resolution using Real-ESRGAN.",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

output_directory = Path(settings.OUTPUT_DIRECTORY)
output_directory.mkdir(parents=True, exist_ok=True)

app.mount(
    "/outputs",
    StaticFiles(directory=output_directory),
    name="outputs",
)

app.include_router(
    router,
    prefix=settings.API_PREFIX,
    tags=["Image Enhancement"],
)


@app.on_event("startup")
async def startup_event():
    print("=" * 60)
    print(f"{settings.APP_NAME} v{settings.APP_VERSION}")
    print("=" * 60)
    print(f"Device            : {model_loader.device.upper()}")
    print(f"Models Loaded     : {model_loader.available_models()}")
    print(f"Upload Directory  : {settings.UPLOAD_DIRECTORY}")
    print(f"Output Directory  : {settings.OUTPUT_DIRECTORY}")
    print("Backend started successfully.")
    print("=" * 60)


@app.get("/", tags=["System"])
async def root():
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "documentation": "/docs",
        "api": settings.API_PREFIX,
    }


@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "device": model_loader.device,
        "available_models": model_loader.available_models(),
    }
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    APP_NAME: str = "ImageEnhancer AI Backend"
    APP_VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"

    HOST: str = "0.0.0.0"
    PORT: int = 8000

    DEBUG: bool = True

    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    MODEL_DIRECTORY: Path = BASE_DIR / "models"
    UPLOAD_DIRECTORY: Path = BASE_DIR / "uploads"
    OUTPUT_DIRECTORY: Path = BASE_DIR / "outputs"

    MAX_UPLOAD_SIZE_MB: int = 20

    ALLOWED_IMAGE_TYPES: list[str] = [
        "image/png",
        "image/jpeg",
        "image/webp",
    ]

    DEFAULT_MODEL: str = "RealESRGAN_x4plus"
    DEFAULT_OUTPUT_FORMAT: str = "png"

    USE_GPU: bool = True

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()

settings.MODEL_DIRECTORY.mkdir(parents=True, exist_ok=True)
settings.UPLOAD_DIRECTORY.mkdir(parents=True, exist_ok=True)
settings.OUTPUT_DIRECTORY.mkdir(parents=True, exist_ok=True)
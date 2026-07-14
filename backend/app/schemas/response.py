from enum import Enum
from pydantic import BaseModel, Field


class ModelType(str, Enum):
    X2 = "RealESRGAN_x2plus"
    X4 = "RealESRGAN_x4plus"


class OutputFormat(str, Enum):
    PNG = "png"
    JPG = "jpg"
    JPEG = "jpeg"
    WEBP = "webp"


class EnhanceImageResponse(BaseModel):
    success: bool = Field(
        ...,
        description="Whether the enhancement was completed successfully."
    )

    image_url: str = Field(
        ...,
        description="URL of the enhanced image."
    )

    model: ModelType = Field(
        ...,
        description="Real-ESRGAN model used for enhancement."
    )

    input_resolution: str = Field(
        ...,
        example="800x600"
    )

    output_resolution: str = Field(
        ...,
        example="3200x2400"
    )

    processing_time: float = Field(
        ...,
        description="Inference time in seconds."
    )

    output_size: str = Field(
        ...,
        example="4.82 MB"
    )

    format: OutputFormat = Field(
        ...,
        description="Output image format."
    )

    message: str = Field(
        ...,
        example="Image enhanced successfully."
    )

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "success": True,
                "image_url": "/outputs/enhanced_8b91f9a2.png",
                "model": "RealESRGAN_x4plus",
                "input_resolution": "800x600",
                "output_resolution": "3200x2400",
                "processing_time": 2.31,
                "output_size": "4.82 MB",
                "format": "png",
                "message": "Image enhanced successfully."
            }
        }


class ErrorResponse(BaseModel):
    success: bool = False

    message: str = Field(
        ...,
        example="Unsupported image format."
    )

    detail: str | None = Field(
        default=None,
        example="Only PNG, JPG, JPEG and WEBP files are supported."
    )

    class Config:
        json_schema_extra = {
            "example": {
                "success": False,
                "message": "Unsupported image format.",
                "detail": "Only PNG, JPG, JPEG and WEBP files are supported."
            }
        }
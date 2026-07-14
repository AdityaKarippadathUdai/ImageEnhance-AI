from pathlib import Path

from fastapi import (
    APIRouter,
    File,
    Form,
    HTTPException,
    UploadFile,
    status,
)
from fastapi.responses import JSONResponse

from app.schemas.response import (
    EnhanceImageResponse,
    ErrorResponse,
)
from app.services.realesrgan_service import realesrgan_service
from app.utils.file_utils import file_utils


router = APIRouter()


SUPPORTED_MODELS = [
    "RealESRGAN_x2plus",
    "RealESRGAN_x4plus",
]

SUPPORTED_FORMATS = [
    "png",
    "jpg",
    "jpeg",
    "webp",
]


@router.get("/models")
async def available_models():
    return {
        "models": SUPPORTED_MODELS
    }


@router.post(
    "/enhance",
    response_model=EnhanceImageResponse,
    responses={
        400: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    },
)
async def enhance_image(
    image: UploadFile = File(...),
    model: str = Form("RealESRGAN_x4plus"),
    output_format: str = Form("png"),
):
    uploaded_file = None

    try:

        if not file_utils.validate_extension(image.filename):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported image extension.",
            )

        if not file_utils.validate_content_type(image.content_type):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported image content type.",
            )

        if model not in SUPPORTED_MODELS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported model '{model}'.",
            )

        output_format = output_format.lower()

        if output_format not in SUPPORTED_FORMATS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported output format.",
            )

        uploaded_file = file_utils.save_upload(image)

        result = realesrgan_service.enhance_image(
            image_path=str(uploaded_file),
            model_name=model,
            output_format=output_format,
        )

        file_utils.delete_if_exists(uploaded_file)

        return result

    except HTTPException:
        if uploaded_file:
            file_utils.delete_if_exists(uploaded_file)
        raise

    except Exception as e:

        if uploaded_file:
            file_utils.delete_if_exists(uploaded_file)

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )


@router.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "Real-ESRGAN",
    }


@router.get("/")
async def api_root():
    return {
        "message": "ImageEnhancer AI API",
        "version": "1.0.0",
        "endpoints": {
            "enhance": "/api/enhance",
            "models": "/api/models",
            "health": "/api/health",
            "docs": "/docs",
        },
    }
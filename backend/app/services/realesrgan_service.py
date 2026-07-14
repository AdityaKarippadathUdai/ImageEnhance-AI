from pathlib import Path
from uuid import uuid4
import time
import cv2
import os

from app.models.model_loader import model_loader
from app.schemas.response import EnhanceImageResponse, ModelType, OutputFormat
from app.core.config import settings


class RealESRGANService:
    def __init__(self):
        self.output_dir = Path(settings.OUTPUT_DIRECTORY)
        self.output_dir.mkdir(parents=True, exist_ok=True)

    @staticmethod
    def _human_readable_size(size: int) -> str:
        units = ["B", "KB", "MB", "GB"]

        for unit in units:
            if size < 1024:
                return f"{size:.2f} {unit}"
            size /= 1024

        return f"{size:.2f} TB"

    @staticmethod
    def _get_extension(fmt: str) -> str:
        fmt = fmt.lower()

        if fmt == "jpeg":
            return ".jpg"

        return f".{fmt}"

    def enhance_image(
        self,
        image_path: str,
        model_name: str,
        output_format: str = "png",
    ) -> EnhanceImageResponse:

        start = time.perf_counter()

        image = cv2.imread(image_path, cv2.IMREAD_COLOR)

        if image is None:
            raise ValueError("Unable to read uploaded image.")

        input_height, input_width = image.shape[:2]

        enhancer = model_loader.get_model(model_name)

        enhanced_image, _ = enhancer.enhance(
            image,
            outscale=2 if model_name == "RealESRGAN_x2plus" else 4,
        )

        output_height, output_width = enhanced_image.shape[:2]

        extension = self._get_extension(output_format)

        output_filename = f"enhanced_{uuid4().hex}{extension}"

        output_path = self.output_dir / output_filename

        success = cv2.imwrite(str(output_path), enhanced_image)

        if not success:
            raise RuntimeError("Failed to save enhanced image.")

        processing_time = round(time.perf_counter() - start, 2)

        output_size = os.path.getsize(output_path)

        return EnhanceImageResponse(
            success=True,
            image_url=f"/outputs/{output_filename}",
            model=ModelType(model_name),
            input_resolution=f"{input_width}x{input_height}",
            output_resolution=f"{output_width}x{output_height}",
            processing_time=processing_time,
            output_size=self._human_readable_size(output_size),
            format=OutputFormat(output_format.lower()),
            message="Image enhanced successfully."
        )


realesrgan_service = RealESRGANService()
from pathlib import Path
from typing import Tuple

import cv2
import numpy as np
from PIL import Image


class ImageUtils:

    @staticmethod
    def load_image(image_path: str | Path) -> np.ndarray:
        image = cv2.imread(str(image_path), cv2.IMREAD_COLOR)

        if image is None:
            raise ValueError(f"Unable to load image: {image_path}")

        return image

    @staticmethod
    def save_image(image: np.ndarray, output_path: str | Path) -> None:
        success = cv2.imwrite(str(output_path), image)

        if not success:
            raise RuntimeError(f"Failed to save image: {output_path}")

    @staticmethod
    def image_dimensions(image: np.ndarray) -> Tuple[int, int]:
        height, width = image.shape[:2]
        return width, height

    @staticmethod
    def image_resolution_string(image: np.ndarray) -> str:
        width, height = ImageUtils.image_dimensions(image)
        return f"{width}x{height}"

    @staticmethod
    def aspect_ratio(image: np.ndarray) -> float:
        width, height = ImageUtils.image_dimensions(image)
        return round(width / height, 4)

    @staticmethod
    def channels(image: np.ndarray) -> int:
        if len(image.shape) == 2:
            return 1

        return image.shape[2]

    @staticmethod
    def color_mode(image: np.ndarray) -> str:
        channels = ImageUtils.channels(image)

        if channels == 1:
            return "Grayscale"

        if channels == 3:
            return "RGB"

        if channels == 4:
            return "RGBA"

        return "Unknown"

    @staticmethod
    def resize(image: np.ndarray, width: int, height: int) -> np.ndarray:
        return cv2.resize(
            image,
            (width, height),
            interpolation=cv2.INTER_LINEAR
        )

    @staticmethod
    def resize_by_scale(image: np.ndarray, scale: int) -> np.ndarray:
        width, height = ImageUtils.image_dimensions(image)

        return ImageUtils.resize(
            image,
            width * scale,
            height * scale,
        )

    @staticmethod
    def to_rgb(image: np.ndarray) -> np.ndarray:
        return cv2.cvtColor(
            image,
            cv2.COLOR_BGR2RGB,
        )

    @staticmethod
    def to_bgr(image: np.ndarray) -> np.ndarray:
        return cv2.cvtColor(
            image,
            cv2.COLOR_RGB2BGR,
        )

    @staticmethod
    def is_valid_image(image_path: str | Path) -> bool:
        try:
            image = cv2.imread(str(image_path))

            return image is not None

        except Exception:
            return False

    @staticmethod
    def estimate_output_resolution(
        width: int,
        height: int,
        model_name: str,
    ) -> Tuple[int, int]:

        scale = 2 if "x2" in model_name.lower() else 4

        return (
            width * scale,
            height * scale,
        )

    @staticmethod
    def estimate_output_size(
        input_size: int,
        model_name: str,
    ) -> int:

        if "x2" in model_name.lower():
            multiplier = 3.2
        else:
            multiplier = 11.5

        return int(input_size * multiplier)

    @staticmethod
    def format_resolution(width: int, height: int) -> str:
        return f"{width}x{height}"

    @staticmethod
    def read_with_pillow(image_path: str | Path) -> Image.Image:
        return Image.open(image_path)

    @staticmethod
    def supported_formats():
        return [
            "png",
            "jpg",
            "jpeg",
            "webp",
        ]


image_utils = ImageUtils()
from pathlib import Path
from uuid import uuid4
import shutil
import os

from fastapi import UploadFile

from app.core.config import settings


ALLOWED_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
}


class FileUtils:

    @staticmethod
    def ensure_directories() -> None:
        Path(settings.UPLOAD_DIRECTORY).mkdir(
            parents=True,
            exist_ok=True
        )

        Path(settings.OUTPUT_DIRECTORY).mkdir(
            parents=True,
            exist_ok=True
        )

    @staticmethod
    def get_extension(filename: str) -> str:
        return Path(filename).suffix.lower()

    @staticmethod
    def validate_extension(filename: str) -> bool:
        return FileUtils.get_extension(filename) in ALLOWED_EXTENSIONS

    @staticmethod
    def validate_content_type(content_type: str) -> bool:
        return content_type in settings.ALLOWED_IMAGE_TYPES

    @staticmethod
    def generate_filename(extension: str) -> str:
        return f"{uuid4().hex}{extension}"

    @staticmethod
    def save_upload(upload_file: UploadFile) -> Path:

        extension = FileUtils.get_extension(upload_file.filename)

        filename = FileUtils.generate_filename(extension)

        destination = (
            Path(settings.UPLOAD_DIRECTORY)
            / filename
        )

        with destination.open("wb") as buffer:
            shutil.copyfileobj(upload_file.file, buffer)

        return destination

    @staticmethod
    def output_path(extension: str) -> Path:

        filename = f"enhanced_{uuid4().hex}{extension}"

        return (
            Path(settings.OUTPUT_DIRECTORY)
            / filename
        )

    @staticmethod
    def delete_file(file_path: Path) -> None:

        if file_path.exists():
            file_path.unlink()

    @staticmethod
    def delete_if_exists(file_path: Path) -> None:

        try:
            if file_path.exists():
                file_path.unlink()
        except Exception:
            pass

    @staticmethod
    def file_size(file_path: Path) -> int:

        return os.path.getsize(file_path)

    @staticmethod
    def human_readable_size(size: int) -> str:

        units = ["B", "KB", "MB", "GB"]

        value = float(size)

        for unit in units:

            if value < 1024:
                return f"{value:.2f} {unit}"

            value /= 1024

        return f"{value:.2f} TB"

    @staticmethod
    def cleanup_uploads() -> None:

        upload_dir = Path(settings.UPLOAD_DIRECTORY)

        for file in upload_dir.iterdir():

            if file.is_file():

                try:
                    file.unlink()
                except Exception:
                    pass

    @staticmethod
    def cleanup_outputs() -> None:

        output_dir = Path(settings.OUTPUT_DIRECTORY)

        for file in output_dir.iterdir():

            if file.is_file():

                try:
                    file.unlink()
                except Exception:
                    pass


file_utils = FileUtils()

file_utils.ensure_directories()
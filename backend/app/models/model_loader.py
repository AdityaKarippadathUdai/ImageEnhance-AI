from pathlib import Path
import torch
from basicsr.archs.rrdbnet_arch import RRDBNet
from realesrgan import RealESRGANer


BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_DIR = BASE_DIR / "models"


class ModelLoader:
    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

        self.models = {}

        self._load_models()

    def _create_x2_model(self):
        return RRDBNet(
            num_in_ch=3,
            num_out_ch=3,
            num_feat=64,
            num_block=23,
            num_grow_ch=32,
            scale=2,
        )

    def _create_x4_model(self):
        return RRDBNet(
            num_in_ch=3,
            num_out_ch=3,
            num_feat=64,
            num_block=23,
            num_grow_ch=32,
            scale=4,
        )

    def _load_models(self):
        x2_path = MODEL_DIR / "RealESRGAN_x2plus.pth"
        x4_path = MODEL_DIR / "RealESRGAN_x4plus.pth"

        if not x2_path.exists():
            raise FileNotFoundError(f"Model not found: {x2_path}")

        if not x4_path.exists():
            raise FileNotFoundError(f"Model not found: {x4_path}")

        x2_model = self._create_x2_model()
        x4_model = self._create_x4_model()

        self.models["RealESRGAN_x2plus"] = RealESRGANer(
            scale=2,
            model_path=str(x2_path),
            model=x2_model,
            tile=0,
            tile_pad=10,
            pre_pad=0,
            half=self.device == "cuda",
            gpu_id=0 if self.device == "cuda" else None,
        )

        self.models["RealESRGAN_x4plus"] = RealESRGANer(
            scale=4,
            model_path=str(x4_path),
            model=x4_model,
            tile=0,
            tile_pad=10,
            pre_pad=0,
            half=self.device == "cuda",
            gpu_id=0 if self.device == "cuda" else None,
        )

        print(f"Loaded Real-ESRGAN models on {self.device.upper()}")

    def get_model(self, model_name: str) -> RealESRGANer:
        if model_name not in self.models:
            raise ValueError(
                f"Unsupported model '{model_name}'. "
                f"Available models: {list(self.models.keys())}"
            )

        return self.models[model_name]

    def available_models(self):
        return list(self.models.keys())


model_loader = ModelLoader()
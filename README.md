# 🚀 PixelBoost AI — High-Fidelity AI Image Super-Resolution Playground

**PixelBoost AI** is a premium, developer-centric, and visually stunning SaaS web application designed for neural image super-resolution. Built using a high-performance stack of **React 19**, **TypeScript**, **Vite 6**, **Tailwind CSS v4**, and **Motion**, PixelBoost AI provides a sandbox to experience, configure, and integrate state-of-the-art Generative Adversarial Networks (specifically **Real-ESRGAN**) for image reconstruction and upscaling.

---

## 🎨 Design Concept & Visual Identity

PixelBoost AI is crafted around a modern **SaaS Slate Theme** that balances high-density technical telemetry with premium editorial elegance:
*   **Space Grotesk** and **Inter** font families combine to convey a tech-forward, futuristic feel.
*   **Deep Charcoal and Midnight Blues** form a dark, low-fatigue background.
*   **Emerald, Cyan, and Royal Blue Gradients** highlight active states, progress indicators, and telemetry statistics.
*   **Micro-interactions and Physics-Like Motion** (powered by `motion/react`) guide user attention smoothly during multi-stage model loading and tile processing.

---

## ✨ Features

### 1. Super-Resolution Upscaling Sandbox
*   **Drag-and-Drop Uploader**: Seamlessly upload high-resolution local images (PNG, JPG, WebP) or click to choose files. Supports touch-targets and keyboard navigation.
*   **Preset Templates**: Instant-on demo images (e.g., *Misty Alpine Ridge*) to test the pipeline without uploading assets.
*   **Real-time Image Comparison Slider**: Interactive split-screen slider to swipe and compare the low-resolution input against the high-frequency super-resolved output in high-definition.

### 2. High-Fidelity Model Parameter Controls
*   **Real-ESRGAN x2+ (`RealESRGAN_x2plus`)**: Tailored for speed and minimal VRAM footprints, optimized for general-purpose photographs and low-latency rendering.
*   **Real-ESRGAN x4+ (`RealESRGAN_x4plus`)**: Demands full residual dense blocks for maximum texture synthesis, ultra-sharp edge reconstruction, and extreme high-frequency details.
*   **Face Restoration Pipeline**: Integrates toggle controls for auxiliary facial reconstruction networks (such as CodeFormer/GFPGAN) to repair compression artifacts on human portraits.
*   **Custom Output Selectors**: Choose between lossy compressed `JPG` or lossless alpha-supporting `PNG` image formats.

### 3. Dynamic Telemetry & Metadata Analytics
*   **Source Statistics**: Extract and display input image resolution, file sizes, color profiles, and file types instantly.
*   **GPU Estimation**: Monitors mock tensor initialization, tiling borders, and multi-pass convolutions, providing realistic feedback loops.
*   **Performance Reporting**: Displays detailed, expandable terminal-style logs showing the sub-pixel reconstruction and tile synthesis steps.

### 4. Interactive API & Developer Playground
*   **Live Console**: Tweak parameters and instantly witness changes in JSON request payloads and simulated API responses.
*   **Multi-Language Integration Snippets**: Ready-to-copy code blocks for:
    *   `cURL` (Terminal HTTP client)
    *   `Python` (using `requests` and `Pillow`)
    *   `Node.js` (using modern `fetch` and `FormData`)
*   **FastAPI Compatibility**: Built pre-mapped to easily bridge with a Python FastAPI server running the official PyTorch Real-ESRGAN model pipeline.

---

## 🗂️ Project Directory Structure

```text
├── src/
│   ├── components/
│   │   ├── UpscalePlayground.tsx       # Core playground with parameters drawer & comparison slider
│   │   ├── ApiPlayground.tsx           # Interactive developer console & multi-language code templates
│   │   ├── ImageMetadataPanel.tsx      # telemetry reporting of image and file metrics
│   │   ├── EnhancedImageSummary.tsx    # Processing analytics, latency reports, and actions suite
│   │   ├── BentoFeatures.tsx           # Modern Bento-Grid visual layout showcasing core tech features
│   │   ├── FAQSection.tsx              # Beautiful accordion displaying technical FAQs
│   │   ├── DocumentationPage.tsx       # Embedded neural-network documentation and math concepts
│   │   ├── PricingTable.tsx            # SaaS-inspired pricing tiers and feature columns
│   │   ├── Header.tsx                  # Responsive global navigation bar
│   │   └── Footer.tsx                  # Information footer
│   ├── services/
│   │   └── api.ts                      # Clean API integration service prepped for FastAPI routing
│   ├── main.tsx                        # Global React mounting entrypoint
│   ├── index.css                       # Tailwind CSS v4 directives & custom theme variables
│   └── types.ts                        # Shared type definitions and strict interface structures
├── package.json                        # Project dependencies (React 19, Motion, Lucide)
├── vite.config.ts                      # Optimized Vite build compilation parameters
└── README.md                           # Documentation you are reading right now!
```

---

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18.0.0 or higher is recommended).

### 1. Clone & Install Dependencies
Navigate to the root workspace and install all pre-requisites:
```bash
npm install
```

### 2. Run the Development Server
Fire up the local development server on the default port:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### 3. Build & Compile for Production
Compile a production-optimized version of the static assets inside the `/dist` directory:
```bash
npm run build
```

---

## 🐍 Connecting a Real Python FastAPI Backend

PixelBoost AI is architected to seamlessly transition from high-fidelity simulations to a live production machine learning environment. 

### Backend Requirements
To run a compatible backend, build an API endpoint in Python using FastAPI and the PyTorch implementation of Real-ESRGAN.

#### Example Python FastAPI Server (`main.py`):
```python
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()

# Allow CORS for React Frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/enhance")
async def enhance_image(
    image: UploadFile = File(...),
    model: str = Form("RealESRGAN_x4plus"),
    output_format: str = Form("JPG"),
    face_restore: str = Form("false")
):
    start_time = time.time()
    
    # -------------------------------------------------------------
    # 1. Load the respective Real-ESRGAN model based on 'model'
    # 2. Run torch inference, tile-processing, and super-resolution
    # 3. If 'face_restore' is true, run GFPGAN / CodeFormer
    # 4. Save file out to S3 or local static folder
    # -------------------------------------------------------------
    
    # Simple Mock Processing Latency Representation
    time.sleep(2.0) 
    
    processing_duration = round(time.time() - start_time, 2)
    
    return {
        "success": True,
        "enhancedImageUrl": "https://your-bucket-assets.s3.amazonaws.com/output_highres.jpg",
        "selectedModelName": model,
        "inputResolution": "800 × 600 px",
        "outputResolution": "3200 × 2400 px" if "x4" in model else "1600 × 1200 px",
        "processingTime": processing_duration,
        "outputFileSize": 1824510,
        "outputFormat": output_format,
        "statusMessage": "Inference completed successfully using PyTorch CUDA acceleration."
    }
```

### Routing Frontend Requests to your Backend
1. Create a `.env` file at the root of the project:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```
2. Un-comment the standard `fetch` block inside `src/services/api.ts` to direct standard form data payloads to your local URL instead of resolving the simulation promise.

---

## 🔬 Deep Tech Overview: Inside the Neural Pipeline

### Generative Adversarial Networks (GANs) for Super Resolution
Traditional interpolation techniques (such as Bilinear or Bicubic upscaling) calculate missing pixels by averaging neighbors. This leads to blurry edges and smooth, unnatural textures.

**Real-ESRGAN** (Enhanced Super-Resolution Generative Adversarial Networks) utilizes:
*   **Residual-in-Residual Dense Blocks (RRDB)**: Bypasses layer boundaries, passing features dynamically through deep layers without vanishing gradient bottlenecks.
*   **Realistic Degradation Modeling**: Rather than upscaling standard blurry photos, Real-ESRGAN mimics synthetic degradation (combining blur, noise, compression artifacts, and resizing) to better synthesize real-world high-frequency details.
*   **U-Net Discriminators**: Ensures output textures conform to realistic structures, preventing visual hallucinatory artifacts.

---

## 🔒 Security & Privacy Notes

*   **Offline-Ready Playground**: No image is ever saved, indexed, or shared without explicit connection to a proprietary FastAPI backend. All uploads in sandbox mode are parsed in-browser via standard client-side `FileReader` streams.
*   **Zero-Telemetry Layout**: PixelBoost AI values crisp clean user design—completely devoid of unsolicited marketing tracking scripts, performance telemetry popups, or custom bloat.

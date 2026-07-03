import { ImageExample, PricingPlan, CodeSnippet } from './types';

export const SHOWCASE_EXAMPLES: ImageExample[] = [
  {
    id: '1',
    title: 'Cyberpunk Portrait',
    category: 'portrait',
    originalUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    upscaledUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1600',
    description: 'FaceRestore Pro enhances facial geometry, reduces grain, and sharpens eyes while keeping skin textures ultra-realistic.',
    resolutionBefore: '512 × 768 px',
    resolutionAfter: '2048 × 3072 px (4x)',
  },
  {
    id: '2',
    title: 'Misty Alpine Ridge',
    category: 'nature',
    originalUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    upscaledUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600',
    description: 'PixelBoost Ultra synthesizes micro-details like pine needles, rock fissures, and water ripples from low-fidelity textures.',
    resolutionBefore: '600 × 400 px',
    resolutionAfter: '2400 × 1600 px (4x)',
  },
  {
    id: '3',
    title: 'Geometric Illustration',
    category: 'illustration',
    originalUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    upscaledUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
    description: 'Anime-Sharper eliminates staircase aliasing, deblocks compression artifacts, and produces perfectly smooth vector-like lines.',
    resolutionBefore: '512 × 512 px',
    resolutionAfter: '4096 × 4096 px (8x)',
  },
  {
    id: '4',
    title: 'Vintage Neon Sign',
    category: 'text',
    originalUrl: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&q=80&w=800',
    upscaledUrl: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&q=80&w=1600',
    description: 'TextRefine AI runs context-aware OCR edge extraction, turning fuzzy retro glowing text into crisp high-contrast outlines.',
    resolutionBefore: '640 × 426 px',
    resolutionAfter: '2560 × 1704 px (4x)',
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Hobbyist',
    priceMonthly: 0,
    priceYearly: 0,
    description: 'Perfect for exploring high-fidelity AI upscaling.',
    features: [
      '15 free credits per month',
      'Up to 2x upscale output',
      'Access to PixelBoost Standard model',
      'Max file size 5MB',
      'Standard processing queue'
    ],
    ctaText: 'Start for Free'
  },
  {
    name: 'Pro Designer',
    priceMonthly: 19,
    priceYearly: 15,
    description: 'Our most popular plan for digital artists and professionals.',
    features: [
      '300 premium credits per month',
      'Up to 8x ultra-upscale output',
      'Access to all AI Models (FaceRestore, Anime-Sharper)',
      'Max file size 25MB',
      'Priority GPU processing (3x faster)',
      'Parallel processing (up to 5 images)',
      'Commercial usage license'
    ],
    isPopular: true,
    ctaText: 'Upgrade to Pro'
  },
  {
    name: 'API Scale',
    priceMonthly: 89,
    priceYearly: 71,
    description: 'High-performance upscaling integrated directly into your pipeline.',
    features: [
      '5,000 API requests per month',
      'Full API & SDK access',
      'Custom webhook notifications',
      'Dedicated warm GPU container',
      'Max file size 50MB',
      'Custom fine-tuned weights support',
      'Enterprise-grade SLA & 24/7 support'
    ],
    ctaText: 'Contact Sales / Get Key'
  }
];

export const API_CODE_SNIPPETS: CodeSnippet[] = [
  {
    language: 'curl',
    code: `curl -X POST "https://api.pixelboost.ai/v1/upscale" \\
  -H "Authorization: Bearer pb_live_8f3d8..." \\
  -F "image=@photo.jpg" \\
  -F "scale=4" \\
  -F "model=pixelboost-ultra" \\
  -F "face_enhance=true"`
  },
  {
    language: 'javascript',
    code: `const response = await fetch("https://api.pixelboost.ai/v1/upscale", {
  method: "POST",
  headers: {
    "Authorization": "Bearer pb_live_8f3d8..."
  },
  body: JSON.stringify({
    image_url: "https://example.com/photo.jpg",
    scale: 4,
    model: "pixelboost-ultra",
    face_enhance: true
  })
});

const data = await response.json();
console.log("Upscaled image URL:", data.upscaled_url);`
  },
  {
    language: 'python',
    code: `import requests

url = "https://api.pixelboost.ai/v1/upscale"
headers = {
    "Authorization": "Bearer pb_live_8f3d8..."
}
payload = {
    "image_url": "https://example.com/photo.jpg",
    "scale": 4,
    "model": "pixelboost-ultra",
    "face_enhance": True
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
print("Upscaled URL:", data["upscaled_url"])`
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How does PixelBoost AI upscale images without losing quality?',
    answer: 'Unlike traditional interpolation methods (like Bilinear or Bicubic) which simply stretch and blur pixels, PixelBoost AI uses advanced Convolutional Neural Networks (CNNs). These networks are trained on millions of high-resolution images to recognize textures, edges, and geometries, allowing them to synthesize realistic details and remove compression artifacts.'
  },
  {
    question: 'What is the difference between the upscale models?',
    answer: 'Each model is optimized for specific tasks. "PixelBoost Ultra" is our generalist model, perfect for landscapes and textures. "FaceRestore Pro" targets human portraits, repairing low-res skin, hair, and eyes. "Anime-Sharper" preserves sharp clean borders and solid colors in vector art/illustrations. "TextRefine" is designed specifically to clarify signs, printed documents, and logos.'
  },
  {
    question: 'Can I use PixelBoost AI output commercially?',
    answer: 'Yes! Images upscaled on the Pro Designer or API Scale plans include full commercial licensing. You retain 100% of the rights to any upscaled asset for printing, gaming, advertising, or web distribution.'
  },
  {
    question: 'How do credits work and do they roll over?',
    answer: '1 credit is consumed for every 2x upscale. 4x consumes 2 credits, and 8x consumes 4 credits. Credits reset at the start of your billing cycle and do not roll over. If you run out, you can top up anytime inside your billing settings.'
  }
];

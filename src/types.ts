export interface ImageExample {
  id: string;
  title: string;
  category: 'portrait' | 'nature' | 'illustration' | 'text';
  originalUrl: string;
  upscaledUrl: string;
  description: string;
  resolutionBefore: string;
  resolutionAfter: string;
}

export interface ProcessingStep {
  id: string;
  label: string;
  duration: number; // in milliseconds
  status: 'idle' | 'running' | 'completed';
}

export interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface CodeSnippet {
  language: string;
  code: string;
}

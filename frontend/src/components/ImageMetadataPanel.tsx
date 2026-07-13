import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Maximize2, 
  Database, 
  Layers, 
  Crop, 
  Palette, 
  ArrowUpRight, 
  FileImage, 
  Sliders 
} from 'lucide-react';

interface ImageMetadataPanelProps {
  fileName: string | null;
  width: number | null;
  height: number | null;
  fileSize: number | null; // in bytes
  fileFormat: string | null;
  colorMode: string | null;
  model: 'RealESRGAN_x2plus' | 'RealESRGAN_x4plus';
}

export default function ImageMetadataPanel({
  fileName,
  width,
  height,
  fileSize,
  fileFormat,
  colorMode,
  model
}: ImageMetadataPanelProps) {
  const isUploaded = !!fileName;
  const scaleFactor = model === 'RealESRGAN_x2plus' ? 2 : 4;

  // Formatting helpers
  const formatFileSize = (bytes: number | null): string => {
    if (bytes === null) return '—';
    if (bytes > 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const getAspectRatio = (w: number | null, h: number | null): string => {
    if (!w || !h) return '—';
    const ratio = w / h;
    const tolerances = [
      { name: '16:9', val: 16 / 9 },
      { name: '4:3', val: 4 / 3 },
      { name: '3:2', val: 3 / 2 },
      { name: '1:1', val: 1 / 1 },
      { name: '21:9', val: 21 / 9 },
      { name: '9:16', val: 9 / 16 },
      { name: '16:10', val: 16 / 10 },
      { name: '5:4', val: 5 / 4 }
    ];
    for (const t of tolerances) {
      if (Math.abs(ratio - t.val) < 0.02) {
        return t.name;
      }
    }
    
    // Simplified fraction fallback
    const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
    const divisor = gcd(w, h);
    const rw = w / divisor;
    const rh = h / divisor;
    if (rw < 30 && rh < 30) {
      return `${rw}:${rh}`;
    }
    return `${ratio.toFixed(2)}:1`;
  };

  const getEstimatedOutputSize = (bytes: number | null, scale: number): string => {
    if (!bytes) return '—';
    // Deep residual models introduce details, and higher resolutions compress differently.
    // 2x upscaling (4x pixels) increases raw detail density.
    // 4x upscaling (16x pixels) adds rich textures.
    const multiplier = scale === 2 ? 3.2 : 11.5;
    const estimatedBytes = bytes * multiplier;
    return formatFileSize(estimatedBytes);
  };

  const metadataItems = [
    {
      id: 'filename',
      label: 'Filename',
      value: fileName ? (fileName.length > 22 ? `${fileName.substring(0, 19)}...` : fileName) : '—',
      icon: FileText,
      gradient: 'from-blue-500/10 to-indigo-500/10 text-blue-500 dark:text-blue-400 border-blue-500/10',
      tooltip: fileName || 'No image uploaded'
    },
    {
      id: 'resolution',
      label: 'Image Resolution',
      value: width && height ? `${width} × ${height} px` : '—',
      icon: Maximize2,
      gradient: 'from-cyan-500/10 to-blue-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/10',
      tooltip: width && height ? `Width: ${width}px | Height: ${height}px` : undefined
    },
    {
      id: 'filesize',
      label: 'File Size',
      value: formatFileSize(fileSize),
      icon: Database,
      gradient: 'from-teal-500/10 to-cyan-500/10 text-teal-600 dark:text-teal-400 border-teal-500/10',
    },
    {
      id: 'format',
      label: 'Image Format',
      value: fileFormat || '—',
      icon: Layers,
      gradient: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10',
    },
    {
      id: 'aspectratio',
      label: 'Aspect Ratio',
      value: getAspectRatio(width, height),
      icon: Crop,
      gradient: 'from-purple-500/10 to-indigo-500/10 text-purple-600 dark:text-purple-400 border-purple-500/10',
    },
    {
      id: 'colormode',
      label: 'Color Mode',
      value: colorMode || '—',
      icon: Palette,
      gradient: 'from-pink-500/10 to-rose-500/10 text-pink-600 dark:text-pink-400 border-pink-500/10',
    },
    {
      id: 'est_resolution',
      label: 'Estimated Output Res',
      value: width && height ? `${width * scaleFactor} × ${height * scaleFactor} px` : '—',
      icon: ArrowUpRight,
      gradient: 'from-amber-500/10 to-yellow-500/10 text-amber-600 dark:text-amber-400 border-amber-500/10',
      highlight: isUploaded
    },
    {
      id: 'est_filesize',
      label: 'Est. Output File Size',
      value: getEstimatedOutputSize(fileSize, scaleFactor),
      icon: FileImage,
      gradient: 'from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-450 border-indigo-500/10',
      highlight: isUploaded
    },
    {
      id: 'scale',
      label: 'Selected AI Model',
      value: isUploaded ? (model === 'RealESRGAN_x2plus' ? 'RealESRGAN x2+' : 'RealESRGAN x4+') : '—',
      icon: Sliders,
      gradient: 'from-violet-500/10 to-fuchsia-500/10 text-violet-600 dark:text-violet-400 border-violet-500/10',
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative w-full rounded-3xl p-6 backdrop-blur-xl bg-white/40 dark:bg-[#090d16]/40 border border-slate-200 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.03)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] overflow-hidden"
    >
      {/* Dynamic top gradient indicator */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 opacity-80" />
      
      {/* Decorative ambient background orb */}
      <div className="absolute top-[-40px] right-[-40px] w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-40px] left-[-40px] w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/10 pb-4 mb-5">
        <div className="text-left">
          <h3 className="text-sm font-bold font-sans tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-[#2563EB] dark:text-blue-400 border border-blue-500/15">
              <FileImage className="w-4 h-4" />
            </span>
            Asset Metadata & Metrics
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-sans font-medium">
            {isUploaded 
              ? 'Real-time analysis of selected source file & neural upscaling properties.' 
              : 'Awaiting source file upload to run deep resolution analysis.'}
          </p>
        </div>
        
        {/* Status Badge */}
        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase border ${
          isUploaded 
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
            : 'bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500 border-slate-200 dark:border-white/5'
        }`}>
          {isUploaded ? 'Loaded' : 'No Asset'}
        </span>
      </div>

      {/* Two-column responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left">
        {metadataItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              title={item.tooltip}
              className={`group flex items-center gap-3 bg-white/60 dark:bg-[#111827]/40 border rounded-xl p-3 hover:scale-[1.015] hover:shadow-sm dark:hover:bg-[#111827]/60 transition-all duration-200 ${
                item.highlight 
                  ? 'border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/[0.01]' 
                  : 'border-slate-150 dark:border-white/5'
              }`}
            >
              {/* Icon Container with Gradient */}
              <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center bg-gradient-to-br ${item.gradient} border group-hover:scale-105 transition-transform duration-200`}>
                <IconComponent className="w-4.5 h-4.5" />
              </div>

              {/* Text metadata */}
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-sans truncate">
                  {item.label}
                </span>
                <span className={`text-xs font-bold block font-mono truncate mt-0.5 ${
                  !isUploaded 
                    ? 'text-slate-400 dark:text-slate-600' 
                    : item.highlight 
                      ? 'text-teal-600 dark:text-[#14B8A6]' 
                      : 'text-slate-850 dark:text-slate-200'
                }`}>
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

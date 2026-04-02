"use client";
import { useState, useRef } from "react";

interface Props {
  originalUrl: string;
  resultUrl: string;
  bgColor: string;
}

export default function ResultPreview({ originalUrl, resultUrl, bgColor }: Props) {
  const [sliderX, setSliderX] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setSliderX(pct);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Original */}
      <div className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
        <div className="px-4 py-2 border-b border-gray-800 text-xs text-gray-500 font-medium">原图</div>
        <div className="p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={originalUrl} alt="原图" className="w-full h-64 object-contain rounded-lg" />
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
        <div className="px-4 py-2 border-b border-gray-800 text-xs text-gray-500 font-medium">处理结果</div>
        <div className="p-3">
          <div
            className="w-full h-64 rounded-lg overflow-hidden relative"
            style={{ backgroundColor: bgColor === "transparent" ? undefined : bgColor }}
          >
            {bgColor === "transparent" && <div className="absolute inset-0 checkerboard" />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resultUrl}
              alt="处理结果"
              className="w-full h-full object-contain relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

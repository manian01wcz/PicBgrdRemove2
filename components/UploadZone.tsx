"use client";
import { useCallback, useState } from "react";

export default function UploadZone({ onFile }: { onFile: (f: File) => void }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useCallback((el: HTMLInputElement | null) => { if (el) el.value = ""; }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-input")?.click()}
      className={`
        w-full max-w-lg h-64 rounded-2xl border-2 border-dashed cursor-pointer
        flex flex-col items-center justify-center gap-4 transition-all duration-200
        ${dragging
          ? "border-violet-400 bg-violet-950/30 scale-[1.02]"
          : "border-gray-700 bg-gray-900/50 hover:border-violet-600 hover:bg-gray-900"
        }
      `}
    >
      <div className="text-5xl">🖼️</div>
      <div className="text-center">
        <p className="text-white font-medium">拖拽图片到这里</p>
        <p className="text-gray-500 text-sm mt-1">或点击选择文件</p>
      </div>
      <p className="text-gray-600 text-xs">支持 JPG、PNG、WebP · 最大 10MB</p>
      <input
        id="file-input"
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
      />
    </div>
  );
}

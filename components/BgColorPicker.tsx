"use client";

const PRESETS = [
  { label: "透明", value: "transparent" },
  { label: "白色", value: "#ffffff" },
  { label: "黑色", value: "#000000" },
  { label: "灰色", value: "#f3f4f6" },
  { label: "蓝色", value: "#3b82f6" },
  { label: "红色", value: "#ef4444" },
  { label: "绿色", value: "#22c55e" },
];

export default function BgColorPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-gray-400 text-sm">背景色：</span>
      {PRESETS.map((p) => (
        <button
          key={p.value}
          title={p.label}
          onClick={() => onChange(p.value)}
          className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
            value === p.value ? "border-violet-400 scale-110" : "border-gray-600"
          }`}
          style={{
            backgroundColor: p.value === "transparent" ? "#1f2937" : p.value,
            backgroundImage: p.value === "transparent"
              ? "linear-gradient(45deg, #374151 25%, transparent 25%), linear-gradient(-45deg, #374151 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #374151 75%), linear-gradient(-45deg, transparent 75%, #374151 75%)"
              : undefined,
            backgroundSize: p.value === "transparent" ? "8px 8px" : undefined,
            backgroundPosition: p.value === "transparent" ? "0 0, 0 4px, 4px -4px, -4px 0px" : undefined,
          } as React.CSSProperties}
        />
      ))}
      <input
        type="color"
        value={value === "transparent" ? "#ffffff" : value}
        onChange={(e) => onChange(e.target.value)}
        className="w-7 h-7 rounded-full cursor-pointer border-2 border-gray-600 bg-transparent"
        title="自定义颜色"
      />
    </div>
  );
}

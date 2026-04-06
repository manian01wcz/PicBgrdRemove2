"use client";
import { useState, useCallback } from "react";
import UploadZone from "@/components/UploadZone";
import ResultPreview from "@/components/ResultPreview";
import BgColorPicker from "@/components/BgColorPicker";
import AuthButton from "@/components/AuthButton";
import { useAuth } from "@/components/useAuth";

export type ProcessState = "idle" | "processing" | "done" | "error";

export default function Home() {
  const [state, setState] = useState<ProcessState>("idle");
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [resultUrl, setResultUrl] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("transparent");
  const [fileName, setFileName] = useState<string>("");
  const { user, signOut } = useAuth();

  const handleFile = useCallback(async (file: File) => {
    if (!user) {
      setErrorMsg("请先登录后再使用");
      setState("error");
      return;
    }
    if (!file.type.match(/image\/(jpeg|png|webp)/)) {
      setErrorMsg("仅支持 JPG、PNG、WebP 格式");
      setState("error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("文件大小不能超过 10MB");
      setState("error");
      return;
    }

    setFileName(file.name);
    setOriginalUrl(URL.createObjectURL(file));
    setResultUrl("");
    setState("processing");
    setErrorMsg("");

    try {
      const token = localStorage.getItem("user_token") || "";
      const form = new FormData();
      form.append("image_file", file);
      const res = await fetch("/api/remove-bg", {
        method: "POST",
        body: form,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || `请求失败 (${res.status})`);
      }

      const blob = await res.blob();
      setResultUrl(URL.createObjectURL(blob));
      setState("done");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "处理失败，请重试");
      setState("error");
    }
  }, [user]);

  const handleReset = () => {
    setState("idle");
    setOriginalUrl("");
    setResultUrl("");
    setErrorMsg("");
    setFileName("");
  };

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold">
            ✂
          </div>
          <span className="font-semibold text-white text-lg">背景移除工具 2.0</span>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
              <span className="text-gray-300 text-sm hidden sm:block">{user.name}</span>
              <button
                onClick={signOut}
                className="text-xs text-gray-500 hover:text-gray-300 transition px-2 py-1 rounded border border-gray-700 hover:border-gray-500"
              >
                退出
              </button>
            </>
          ) : (
            <AuthButton />
          )}
        </div>
      </header>

      {/* Hero */}
      {state === "idle" && (
        <section className="flex flex-col items-center justify-center flex-1 px-4 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            一键移除图片背景
          </h1>
          <p className="text-gray-400 text-center mb-12 max-w-md">
            上传图片，AI 自动识别并移除背景，支持人像、商品、动物等各类场景
          </p>
          {user ? (
            <UploadZone onFile={handleFile} />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-500 text-sm">请先登录后使用</p>
              <AuthButton />
            </div>
          )}
        </section>
      )}

      {/* Processing */}
      {state === "processing" && (
        <section className="flex flex-col items-center justify-center flex-1 gap-6">
          <div className="w-16 h-16 rounded-full border-4 border-violet-500 border-t-transparent animate-spin" />
          <p className="text-gray-300 text-lg">AI 正在处理中...</p>
          <p className="text-gray-500 text-sm">{fileName}</p>
        </section>
      )}

      {/* Error */}
      {state === "error" && (
        <section className="flex flex-col items-center justify-center flex-1 gap-4">
          <div className="text-5xl">⚠️</div>
          <p className="text-red-400 text-lg font-medium">{errorMsg}</p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 transition text-white font-medium"
            >
              重新上传
            </button>
            {!user && <AuthButton />}
          </div>
        </section>
      )}

      {/* Result */}
      {state === "done" && (
        <section className="flex flex-col flex-1 px-4 py-8 max-w-6xl mx-auto w-full gap-6">
          <ResultPreview originalUrl={originalUrl} resultUrl={resultUrl} bgColor={bgColor} />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900 rounded-2xl p-4 border border-gray-800">
            <BgColorPicker value={bgColor} onChange={setBgColor} />
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white transition text-sm font-medium"
              >
                重新上传
              </button>
              <DownloadButton resultUrl={resultUrl} bgColor={bgColor} fileName={fileName} />
            </div>
          </div>
        </section>
      )}

      <footer className="text-center text-gray-700 text-xs py-4">
        图片仅在内存中处理，不存储在任何服务器
      </footer>
    </main>
  );
}

function DownloadButton({ resultUrl, bgColor, fileName }: { resultUrl: string; bgColor: string; fileName: string }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    if (bgColor === "transparent") {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = fileName.replace(/\.[^.]+$/, "") + "_nobg.png";
      a.click();
    } else {
      const img = new Image();
      img.src = resultUrl;
      await new Promise((r) => (img.onload = r));
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = fileName.replace(/\.[^.]+$/, "") + "_bg.png";
      a.click();
    }
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-violet-900/30"
    >
      {downloaded ? "✓ 已下载" : "⬇ 下载 PNG"}
    </button>
  );
}

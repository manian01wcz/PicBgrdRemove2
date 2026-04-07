import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "背景移除工具 2.0",
  description: "AI 一键移除图片背景，快速、美观、免费",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="+rBMZIpyFb3JlYAPzDKBRg" async></script>
      </head>
      <body className="min-h-screen bg-gray-950 antialiased">{children}</body>
    </html>
  );
}

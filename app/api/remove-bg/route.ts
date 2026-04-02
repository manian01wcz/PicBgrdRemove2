import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image_file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "未收到图片文件" }, { status: 400 });
    }

    const apiKey = process.env.REMOVE_BG_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      return NextResponse.json({ error: "未配置 REMOVE_BG_API_KEY" }, { status: 500 });
    }

    const bgForm = new FormData();
    bgForm.append("image_file", file);
    bgForm.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body: bgForm,
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `remove.bg 错误 (${response.status})`, detail: errText },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "未知错误";
    return NextResponse.json({ error: "服务器内部错误", detail: msg }, { status: 500 });
  }
}

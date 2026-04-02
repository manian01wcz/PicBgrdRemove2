# 背景移除工具 2.0

AI 一键移除图片背景，基于 remove.bg API，部署在 Cloudflare。

## 技术栈

- Next.js 15 + TypeScript
- Tailwind CSS
- remove.bg API
- Cloudflare Pages 部署

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 配置 API Key
cp .env.local.example .env.local
# 编辑 .env.local，填入你的 remove.bg API Key

# 3. 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 部署到 Cloudflare Pages

1. 将代码推送到 GitHub
2. 在 Cloudflare Pages 连接仓库
3. 构建命令：`npm run build`，输出目录：`.next`
4. 在 Pages 环境变量中添加 `REMOVE_BG_API_KEY`

## 环境变量

| 变量名 | 说明 |
|--------|------|
| `REMOVE_BG_API_KEY` | remove.bg API Key，在 https://www.remove.bg/api 获取 |

## 功能

- ✅ 拖拽/点击上传图片
- ✅ AI 自动移除背景
- ✅ 原图与结果对比预览
- ✅ 背景色替换（透明/纯色/自定义）
- ✅ 一键下载 PNG
- ✅ 移动端响应式

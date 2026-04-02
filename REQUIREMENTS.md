# 背景移除工具 2.0 — MVP 需求文档

> 版本：v1.0 | 状态：草稿 | 日期：2026-04-03
> 飞书原文：https://feishu.cn/docx/N1XMdbym1o2RKBxCU2Icossen5g

## 1. 产品概述

一款面向个人用户和小型团队的在线背景移除工具，主打**极简操作、即时出图、美观体验**。

**技术架构：**
```
用户浏览器
  └─ Cloudflare Pages（静态前端 index.html）
       └─ Cloudflare Worker（API 代理，保护 Key）
            └─ remove.bg API（AI 抠图能力）
```

- 无后端服务器，无数据库，无文件存储
- 图片仅在内存中处理，不落盘
- 全部部署在 Cloudflare，零运维

## 2. 功能需求

### P0 核心功能
- 拖拽/点击上传图片（JPG/PNG/WebP，≤10MB）
- 调用 remove.bg API 移除背景
- 左右分屏对比预览（原图 vs 结果）
- 一键下载透明背景 PNG

### P1 功能
- 纯色背景替换（颜色面板 + 预设色）
- 移动端响应式适配

### P2（MVP 后迭代）
- 批量处理
- 自定义背景图片
- 历史记录

## 3. 技术规格

| 项目 | 说明 |
|------|------|
| 前端 | 纯静态 HTML + Tailwind CSS（CDN） |
| Worker | Cloudflare Worker，转发 remove.bg API |
| API Key | 存储在 Worker 环境变量 `REMOVE_BG_API_KEY` |
| 部署 | Cloudflare Pages + Workers |

## 4. 交付物

| 文件 | 说明 |
|------|------|
| `index.html` | 完整前端页面 |
| `worker.js` | Cloudflare Worker 代理脚本 |
| `README.md` | 部署步骤说明 |

## 5. 里程碑

| 阶段 | 内容 | 预计时间 |
|------|------|---------|
| M1 | Worker 代理 + 基础上传抠图下载 | Day 1 |
| M2 | UI 美化 + 对比预览 + 背景色替换 | Day 2 |
| M3 | 移动端适配 + 错误处理 | Day 3 |
| M4 | 部署上线 + 测试验收 | Day 4 |

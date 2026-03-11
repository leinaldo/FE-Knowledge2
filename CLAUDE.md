# FE-Knowledge2 项目说明

## 项目概览

**FE-Knowledge2** 是一个基于 VitePress 构建的前端知识文档站点，托管在 GitHub Pages。涵盖前端开发全栈知识，包括 JavaScript、Vue、React、CSS、算法、设计模式、计算机网络等。

**线上地址**：https://leinaldo.github.io/FE-Knowledge2/

## 技术栈

- **文档框架**：VitePress 1.5.0
- **前端框架**：Vue 3.5.11 + TypeScript
- **样式**：Tailwind CSS 3.4.13 + PostCSS
- **搜索**：Algolia DocSearch（中文本地化）
- **评论**：Giscus（基于 GitHub Discussions）
- **PWA**：@vite-pwa/vitepress + Workbox
- **Demo 预览**：@vitepress-demo-preview（Vue SFC 实时预览）
- **包管理**：Yarn
- **部署**：GitHub Actions → GitHub Pages
- **容器化**：Docker（Captain 平台）

## 目录结构

```
FE-Knowledge2/
├── docs/                    # 主文档内容 + VitePress 配置
│   ├── .vitepress/          # VitePress 配置（config.ts、主题）
│   ├── JS基础/              # JavaScript 基础与进阶
│   ├── Vue/                 # Vue 2/3 框架
│   ├── React/               # React 框架与面试题
│   ├── TS/                  # TypeScript
│   ├── CSS基础/             # CSS 基础与特效
│   ├── 动效/                # CSS/Web 动画效果
│   ├── 算法/                # 数据结构与算法
│   ├── 设计模式/            # 设计模式
│   ├── 计算机网络相关/       # HTTP、TCP 等网络知识
│   ├── 浏览器/              # 浏览器原理
│   ├── 前后端通信/          # REST、GraphQL、gRPC、SSE
│   ├── 工程化/              # 前端工程化与工具链
│   ├── 性能优化/            # 性能优化
│   ├── 手写/                # 高频手写代码
│   ├── 服务端/              # Node.js、服务端知识
│   └── ...                  # 更多分类
├── demos/                   # Vue 组件交互 Demo
├── scripts/                 # 构建与工具脚本
├── types/                   # TypeScript 类型定义
└── .github/workflows/       # CI/CD 自动部署
```

## 常用命令

```bash
yarn docs:dev      # 本地开发服务器
yarn docs:build    # 生产构建
yarn docs:serve    # 预览构建产物
```

## 开发规范

- 文档用 **Markdown** 编写，放在 `docs/` 对应分类目录下
- 侧边栏由 VitePress 配置自动生成（`docs/.vitepress/config.ts`）
- Vue 组件 Demo 放在 `demos/` 目录，可在 Markdown 中通过 `@vitepress-demo-preview` 引入
- 推送到 `main` 分支后 GitHub Actions 自动构建并部署到 `gh-pages`

## 内容分类（28+ 分类，80+ 文档）

| 分类 | 文档数 | 说明 |
|------|--------|------|
| 计算机网络相关 | 11 | HTTP/TCP/网络协议 |
| JS基础 | 9 | JavaScript 核心概念 |
| 动效 | 7 | CSS/Web 动画 |
| 手写 | 6 | 面试高频手写代码 |
| 浏览器 | 5 | 浏览器原理与渲染 |
| Vue | 5 | Vue 2/3 全面解析 |
| 前后端通信 | 4 | REST/GraphQL/gRPC/SSE |
| 算法 | 3 | 数据结构与算法 |
| TS | 3 | TypeScript |
| CSS基础 | 3 | CSS 基础与布局 |
| React | 2 | React 框架 |
| 工程化 | 2 | 构建工具与工程实践 |
| 服务端 | 2 | Node.js/服务端 |

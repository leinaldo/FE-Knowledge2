# FE-Knowledge2 · 前端知识整理

> 一个基于 VitePress 构建的前端知识文档站点，系统整理前端开发全栈知识体系。

**线上地址**：[https://leinaldo.github.io/FE-Knowledge2/](https://leinaldo.github.io/FE-Knowledge2/)

---

## 内容涵盖

| 分类 | 内容 |
|------|------|
| **JS 基础** | 原型链、闭包、异步、ES6+、手写实现 |
| **Vue** | Vue 2/3 响应式原理、Composition API、状态管理 |
| **React** | 框架核心、Hooks、常见面试题 |
| **TypeScript** | 类型系统、泛型、工程实践 |
| **CSS 基础** | 布局、选择器、动效、CSS 特效 |
| **算法** | 排序、线段树、并查集、动态规划 |
| **设计模式** | 常见设计模式及前端应用场景 |
| **计算机网络** | HTTP/HTTPS、TCP/UDP、DNS、WebSocket |
| **浏览器原理** | 渲染流程、Event Loop、缓存、安全 |
| **前后端通信** | REST、GraphQL、gRPC、tRPC、SSE 流式输出 |
| **工程化** | Webpack、Vite、构建优化、模块化 |
| **性能优化** | 加载性能、运行时性能、监控 |
| **服务端** | Node.js、服务端渲染 |

---

## 功能特性

- **文档搜索**：集成 Algolia DocSearch，支持中文全文检索
- **留言评论**：基于 GitHub Discussions 的 Giscus 评论系统
- **PWA 支持**：可安装为本地应用，支持离线访问
- **Vue SFC 预览**：内嵌 Vue 单文件组件实时预览与演示
- **自动部署**：推送 main 分支后 GitHub Actions 自动构建并发布

---

## 本地运行

```bash
# 安装依赖
yarn install

# 启动开发服务器
yarn docs:dev

# 构建生产版本
yarn docs:build

# 预览构建产物
yarn docs:serve
```

**环境要求**：Node.js 18+，Yarn

---

## 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Vue 3](https://vuejs.org/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) - 样式
- [Algolia](https://www.algolia.com/) - 文档搜索
- [Giscus](https://giscus.app/) - 评论系统

---

---

## License

[MIT](./LICENSE)

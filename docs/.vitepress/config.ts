import * as fs from "fs";
import * as path from "path";
import * as process from "process";
import { DefaultTheme, defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

const ignoreList = [
  ".vitepress",
  "README.md",
  "public",
  "index.md",
  ".DS_Store",
  "dev-dist",
];

function buildChildren(path, parentName = "") {
  const files = fs
    .readdirSync(path)
    .filter((file) => !ignoreList.includes(file));
  return files.map((file) => {
    let current = { text: file } as DefaultTheme.SidebarItem;
    const subPath = `${path}/${file}`;
    if (fs.statSync(subPath).isDirectory()) {
      let res = buildChildren(subPath, `${parentName}/${file}`);
      current.items = res;
      current.collapsed = true;
      current.text += `  (${res.length})`;
    } else {
      current.link = `${parentName}/${file.slice(0, -3)}`;
      current.text = `${file.slice(0, -3)}`;
    }
    return current;
  });
}

const workPath = path.join(process.cwd() + "/docs");
const sidebar = buildChildren(workPath);

export default withPwa(
  defineConfig({
    vite: {
      logLevel: "info",
      define: {
        __DATE__: `'${new Date().toISOString()}'`,
      },
    },
    title: "前端知识整理",
    head: [
      ["meta", { name: "referrer", content: "never" }], //会出现在html的head里，用来绕过语雀的图片防盗链
      ["link", { href: "./logo/klee.ico", rel: "SHORTCUT ICON" }],
    ],
    base: "/FE-Knowledge2/",
    lastUpdated: true,
    themeConfig: {
      logo: "/logo/book.png",
      nav: [{ text: "首页", link: "/" }],
      sidebar,
      socialLinks: [
        {
          icon: "github",
          link: "https://github.com/Leinaldo/FE-Knowledge2",
        },
      ],
      footer: {
        message: "MIT Licensed",
        copyright: "Copyright © 2021-present Leinaldo",
      },
      algolia: {
        appId: "F84THJ1DR1",
        apiKey: "7811d185eeb9a69f4972c25e4169ca58",
        indexName: "fe-knowledge2",
        locales: {
          zh: {
            placeholder: "搜索文档",
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "清除查询条件",
                  resetButtonAriaLabel: "清除查询条件",
                  cancelButtonText: "取消",
                  cancelButtonAriaLabel: "取消",
                },
                startScreen: {
                  recentSearchesTitle: "搜索历史",
                  noRecentSearchesText: "没有搜索历史",
                  saveRecentSearchButtonTitle: "保存至搜索历史",
                  removeRecentSearchButtonTitle: "从搜索历史中移除",
                  favoriteSearchesTitle: "收藏",
                  removeFavoriteSearchButtonTitle: "从收藏中移除",
                },
                errorScreen: {
                  titleText: "无法获取结果",
                  helpText: "你可能需要检查你的网络连接",
                },
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                  searchByText: "搜索提供者",
                },
                noResultsScreen: {
                  noResultsText: "无法找到相关结果",
                  suggestedQueryText: "你可以尝试查询",
                  reportMissingResultsText: "你认为该查询应该有结果？",
                  reportMissingResultsLinkText: "点击反馈",
                },
              },
            },
          },
        },
      },
    },
    pwa: {
      mode: "development",
      base: "/FE-Knowledge2/",
      scope: "/FE-Knowledge2/",
      registerType: "autoUpdate",
      // injectRegister: 'inline',
      // includeAssets: ['favicon.svg'],
      manifest: {
        name: "FE-Knowledge",
        short_name: "FEKnowledge",
        theme_color: "#ffffff",
        icons: [
          {
            src: "colagirl-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "colagirl-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "colagirl-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
      },
      devOptions: {
        enabled: true,
        navigateFallback: "/",
      },
    },
    markdown: {
      config(md) {
        md.use(containerPreview);
        md.use(componentPreview);
      },
    },
  })
);

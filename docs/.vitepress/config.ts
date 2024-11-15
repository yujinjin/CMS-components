/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-09 14:58:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-15 17:18:06
 * @项目的路径: \CMS-components\docs\.vitepress\config.ts
 * @描述: vitepress 配置
 */
import { defineConfig } from "vitepress";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";
import plugins from "./plugins/index";

export default defineConfig({
    titleTemplate: "CMS components",
    lang: "cn-ZH",
    lastUpdated: true,
    base: "/pages",
    outDir: "../dist/docs",
    markdown: {
        theme: "material-theme-palenight",
        lineNumbers: false,
        config: markdown => plugins(markdown)
    },
    // 自定义目录 <-> URL 映射
    rewrites: {
        "pages/:name.md": ":name.md",
        "pages/:path/:name.md": ":path/:name.md"
    },
    themeConfig: {
        siteTitle: "CMS components",
        logo: "/vue-logo.svg",
        editLink: {
            pattern: "https://github.com/yujinjin/CMS-components/edit/main/pages/:path"
        },
        socialLinks: [{ icon: "github", link: "https://github.com/yujinjin/CMS-components" }],
        lastUpdated: {
            text: "上次更新",
            formatOptions: {
                dateStyle: "full",
                timeStyle: "medium"
            }
        },
        nav: [
            { text: "指南", link: "/guide/installation", activeMatch: "/guide/" },
            { text: "组件", link: "/components/svg-icon", activeMatch: "/components/" }
        ],
        sidebar: {
            "/guide/": [
                {
                    text: "更新日志",
                    link: "/guide/changelog"
                },
                {
                    text: "安装",
                    link: "/guide/installation"
                },
                {
                    text: "快速开始",
                    link: "/guide/quickstart"
                }
            ],
            "/components/": [
                {
                    text: "svg-icon 图标",
                    link: "/components/svg-icon"
                },
                {
                    text: "check-select 下拉复选框",
                    link: "/components/check-select"
                }
            ]
        },
        footer: {
            message: "Released under the MIT License.",
            copyright: "Copyright © 2024-present Jack Yu"
        }
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: { api: "modern-compiler" }
            }
        },
        plugins: [
            createSvgSpritePlugin({
                symbolId: "icon-[name]"
            })
        ]
    }
});

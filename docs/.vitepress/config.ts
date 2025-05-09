/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-09 14:58:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-21 10:52:59
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
    base: process.env.NODE_ENV === "production" ? "/cms-components/docs" : "/",
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
        nav: [
            { text: "指南", link: "/guide/installation", activeMatch: "/guide/" },
            { text: "组件", link: "/components/svg-icon", activeMatch: "/components/" }
        ],
        outline: {
            label: "页面导航",
            level: [2, 4]
        },
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
                },
                {
                    text: "web-editor 富文本编辑器",
                    link: "/components/web-editor"
                },
                {
                    text: "img-upload 图片上传",
                    link: "/components/img-upload"
                },
                {
                    text: "action-bar 操作栏",
                    link: "/components/action-bar"
                },
                {
                    text: "input-field 输入字段",
                    link: "/components/input-field"
                },
                {
                    text: "search-field 搜索字段",
                    link: "/components/search-field"
                },
                {
                    text: "data-table 数据表格",
                    link: "/components/data-table"
                },
                {
                    text: "input-form 表单",
                    link: "/components/input-form"
                },
                {
                    text: "search-form 搜索表单",
                    link: "/components/search-form"
                },
                {
                    text: "dialog-form 弹窗表单",
                    link: "/components/dialog-form"
                },
                {
                    text: "search-page 搜索页面",
                    link: "/components/search-page"
                }
            ]
        },
        docFooter: {
            prev: "上一页",
            next: "下一页"
        },
        editLink: {
            pattern: "https://github.com/yujinjin/CMS-components/edit/main/docs/:path",
            text: "在 GitHub 上编辑此页面"
        },
        socialLinks: [{ icon: "github", link: "https://github.com/yujinjin/CMS-components" }],
        lastUpdated: {
            text: "上次更新",
            formatOptions: {
                dateStyle: "full",
                timeStyle: "medium"
            }
        },
        footer: {
            message: "基于 MIT 许可发布",
            copyright: `版权所有 © 2024-${new Date().getFullYear()} jack yu`
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
        ],
        resolve: {
            alias: {
                // 由于docs:build模式情况下，web-editor依赖的quill插件使用了document对象，在Node.js 环境构建会提示：“ReferenceError: document is not defined”问题
                // 这里只能折中一下使用动态导入 quill的方式
                // 本来是打算web-editor全写成动态导入 quill的方式，但这种情况下不支持umd build了，提示错误：Error: UMD and IIFE output formats are not supported for code-splitting builds
                // 所以不得已采取了两者并存的方案来解决
                "./src/web-editor.vue": "./src/web-editor-async.vue"
                // "@yujinjin/cms-components-main": "@yujinjin/cms-components-main/index"
            }
        }
    }
});

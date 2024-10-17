/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-09 14:58:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-17 15:20:58
 * @项目的路径: \CMS-components\docs\.vitepress\config.ts
 * @描述: vitepress 配置
 */
import { defineConfig } from "vitepress";
import plugins from "./plugins/index";

export default defineConfig({
    base: "/",
    title: "CMS components UI",
    description: "基于 vite vue3 element-plus 组件库",
    lang: "cn-ZH",
    lastUpdated: true,
    markdown: {
        theme: "material-theme-palenight",
        lineNumbers: false,
        config: markdown => plugins(markdown)
    },
    themeConfig: {
        lastUpdatedText: "上次更新",
        nav: [
            { text: "主页", link: "/pages/" },
            { text: "测试", link: "/pages/test" }
        ]
    }
});

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-10 17:24:14
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-25 16:32:19
 * @项目的路径: \CMS-components\docs\.vitepress\theme\index.ts
 * @描述: 扩展默认主题
 */
import DefaultTheme from "vitepress/theme";
import { type Theme } from "vitepress";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import CMSComponents from "@yujinjin/cms-components/index";
import Demo from "./components/demo/index.vue";
import Tooltip from "./components/tooltip/index.vue";
import "./style/index.scss";
import "../../../packages/style/index.scss";

export default {
    ...DefaultTheme,
    async enhanceApp({ app }) {
        app.component("VpDemo", Demo);
        app.component("VpTooltip", Tooltip);
        app.use(ElementPlus, { locale: zhCn });
        app.use(CMSComponents, {});
        // console.info("................enhanceApp");
        // if (typeof document === "undefined") {
        //     // 创建一个包含必要属性的模拟 Document 对象
        //     const mockDocument = {
        //         URL: "",
        //         alinkColor: "",
        //         all: [],
        //         anchors: [],
        //         createElement: () => ({}),
        //         querySelector: () => null,
        //         querySelectorAll: () => [],
        //         getElementsByTagName: () => [],
        //         getElementById: () => null
        //     };
        //     // 使用类型断言将模拟对象转换为 unknown，再转换为 Document
        //     // eslint-disable-next-line no-global-assign
        //     document = mockDocument as unknown as Document;
        // }
        // if (!import.meta.env.SSR) {
        //     const plugin = await import("@yujinjin/cms-components/index");
        //     app.use(plugin.default, {});
        // }
    }
} as Theme;

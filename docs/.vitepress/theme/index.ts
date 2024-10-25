/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-10 17:24:14
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-24 17:15:12
 * @项目的路径: \CMS-components\docs\.vitepress\theme\index.ts
 * @描述: 扩展默认主题
 */
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import CMSComponents from "@yujinjin/cms-components/index";
import Demo from "./components/demo/index.vue";
import Tooltip from "./components/tooltip/index.vue";
import "./style/index.scss";
import "../../../packages/style/index.scss";

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component("VpDemo", Demo);
        app.component("VpTooltip", Tooltip);
        app.use(ElementPlus, { locale: zhCn });
        app.use(CMSComponents, {});
    }
} as Theme;

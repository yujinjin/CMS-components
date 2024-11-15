/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-23 14:18:33
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-25 16:33:16
 * @项目的路径: \CMS-components\docs\.vitepress\plugins\index.ts
 * @描述: vitepress的插件
 */
import MarkdownItContainer from "markdown-it-container";
import { type MarkdownRenderer } from "vitepress";
import tooltip from "./tooltip";
import tableWrapper from "./table-wrapper";
import createDemoContainer from "./demo";

export default function (markdownRenderer: MarkdownRenderer) {
    markdownRenderer.use(tooltip);
    markdownRenderer.use(tableWrapper);
    markdownRenderer.use(MarkdownItContainer, "demo", createDemoContainer(markdownRenderer));
}

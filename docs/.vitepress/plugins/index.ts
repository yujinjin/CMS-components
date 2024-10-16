/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-23 14:18:33
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-09-12 16:46:15
 * @项目的路径: \CMS-components\docs\.vitepress\plugins\index.ts
 * @描述: vitepress的插件
 */
import type MarkdownIt from "markdown-it";
import MarkdownItContainer from "markdown-it-container";
import tooltip from "./tooltip";
import tableWrapper from "./table-wrapper";
import demo from "./demo";

export default function (markdown: MarkdownIt) {
    markdown.use(tooltip);
    markdown.use(tableWrapper);
    markdown.use(MarkdownItContainer, "demo", demo);
}

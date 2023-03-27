/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-23 14:18:33
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-03-23 14:37:42
 * @项目的路径: \CMS-components\docs\.vitepress\plugins\index.ts
 * @描述: vitepress的插件
 */
import MarkdownIt from "markdown-it";
import MarkdownItContainer from "markdown-it-container";
import demo from "./demo";
import tooltip from "./tooltip";

export default function (markdown: MarkdownIt) {
    markdown.use(tooltip);
    markdown.use(MarkdownItContainer, "demo", demo);
}

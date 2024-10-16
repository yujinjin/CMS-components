/* eslint-disable camelcase */
/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-06-24 15:30:35
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-09-12 17:15:34
 * @项目的路径: \CMS-components\docs\.vitepress\plugins\table-wrapper.ts
 * @描述: table内容添加样式
 */
import type MarkdownIt from "markdown-it";

export default (md: MarkdownIt): void => {
    md.renderer.rules.table_open = () => `<div class="vp-table"><table>`;
    md.renderer.rules.table_close = () => "</table></div>";
};

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-23 14:19:34
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-07 16:35:46
 * @项目的路径: \CMS-components\docs\.vitepress\plugins\tooltip.ts
 * @描述: markdown 的提示插件
 */
import { type MarkdownRenderer } from "vitepress";

export default (md: MarkdownRenderer): void => {
    md.renderer.rules.tooltip = (tokens, idx) => {
        const token = tokens[idx];

        return `<vp-tooltip type="${token.content}" details="${token.info}" />`;
    };

    md.inline.ruler.before("emphasis", "tooltip", (state, silent) => {
        const tooltipRegExp = /^\^\[([^\]]*)\](`[^`]*`)?/;
        const str = state.src.slice(state.pos, state.posMax);

        if (!tooltipRegExp.test(str)) return false;
        if (silent) return true;

        const result = str.match(tooltipRegExp);

        if (!result) return false;

        const token = state.push("tooltip", "tooltip", 0);
        token.content = result[1].replace(/\\\|/g, "|");
        token.info = (result[2] || "").replace(/^`(.*)`$/, "$1");
        token.level = state.level;
        state.pos += result[0].length;

        return true;
    });
};

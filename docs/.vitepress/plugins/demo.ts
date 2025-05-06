/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-23 14:19:07
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-25 16:32:53
 * @项目的路径: \CMS-components\docs\.vitepress\plugins\demo.ts
 * @描述: markdown 的demo 示例插件
 */
import path from "path";
import fs from "fs";
import { type MarkdownRenderer } from "vitepress";

export default function (markdownRenderer: MarkdownRenderer) {
    return {
        validate(params) {
            return !!params.trim().match(/^demo\s*(.*)$/);
        },

        render(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
            /* means the tag is opening */
            if (tokens[idx].nesting === 1) {
                const description = m && m.length > 1 ? m[1] : "";
                const sourceFileToken = tokens[idx + 2];
                // 源码路径文件列表
                const sourceFilePathList: string[] = [];
                // 文件路径，还有其他文件时放入"()"内，比如：action-bar/index(action-bar/config.js|action-bar/config2.js)
                let sourceFileContent = sourceFileToken.children?.[0].content ?? "";
                // 是否显示playground，如果内容带有"[hide-playground]"表示就不去演练场了
                const isShowPlayground = sourceFileContent.indexOf("[hide-playground]") === -1;
                if (!isShowPlayground) {
                    sourceFileContent = sourceFileContent.replace("[hide-playground]", "");
                }
                if (sourceFileToken.type === "inline") {
                    const startBracketsIndex = sourceFileContent.indexOf("(");
                    const endBracketsIndex = sourceFileContent.indexOf(")");
                    if (startBracketsIndex === -1) {
                        sourceFilePathList.push(sourceFileContent);
                    } else if (endBracketsIndex > 0) {
                        sourceFilePathList.push(sourceFileContent.substring(0, startBracketsIndex));
                        sourceFilePathList.push(...sourceFileContent.substring(startBracketsIndex + 1, endBracketsIndex).split("|"));
                    }
                }
                if (sourceFilePathList.length === 0) throw new Error(`Incorrect source file: ${sourceFileContent}`);
                const sourceFiles = sourceFilePathList.map(item => {
                    const suffixNameIndex = item.indexOf(".");
                    let suffixName;
                    if (suffixNameIndex === -1) {
                        // 没有就认为是vue文件
                        suffixName = "vue";
                        item = item + ".vue";
                    } else {
                        suffixName = item.substring(suffixNameIndex + 1);
                    }
                    const source = fs.readFileSync(path.resolve("examples", item), "utf-8");
                    if (!source) {
                        throw new Error(`Incorrect source file: ${item}`);
                    }
                    return {
                        path: item,
                        source: source,
                        suffixName,
                        highlightSourceHtml: markdownRenderer.render(`\`\`\` ${suffixName}\n${source}\`\`\``)
                    };
                });
                return `<vp-demo sources="${encodeURIComponent(JSON.stringify(sourceFiles))}" mainVueFilePath="${encodeURIComponent(sourceFiles[0].path)}" description="${encodeURIComponent(
                    markdownRenderer.render(description)
                )}" isShowPlayground="${isShowPlayground}">`;
            }
            return "</vp-demo>";
        }
    };
}

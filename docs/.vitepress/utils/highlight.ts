/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-10 16:49:27
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-09-12 16:53:41
 * @项目的路径: \CMS-components\docs\.vitepress\utils\highlight.ts
 * @描述: 代码高亮
 */
// ref https://github.com/vuejs/vitepress/blob/main/src/node/markdown/plugins/highlight.ts
import chalk from "chalk";
import escapeHtml from "escape-html";
import prism from "prismjs";
import consola from "consola";
import loadLanguages from "prismjs/components/index";

// required to make embedded highlighting work...
loadLanguages(["markup", "css", "javascript"]);

function wrap(code: string, lang: string): string {
    if (lang === "text") {
        code = escapeHtml(code);
    }
    return `<pre v-pre><code>${code}</code></pre>`;
}

export const highlight = (str: string, lang: string) => {
    if (!lang) {
        return wrap(str, "text");
    }
    lang = lang.toLowerCase();
    const rawLang = lang;
    if (lang === "vue" || lang === "html") {
        lang = "markup";
    }
    if (lang === "md") {
        lang = "markdown";
    }
    if (lang === "ts") {
        // TODO: 针对TS引入更优雅的UI
        lang = "typescript";
    }
    if (lang === "py") {
        lang = "python";
    }
    if (!prism.languages[lang]) {
        try {
            loadLanguages([lang]);
        } catch {
            consola.warn(chalk.yellow(`[vitepress] Syntax highlight for language "${lang}" is not supported.`));
        }
    }
    if (prism.languages[lang]) {
        const code = prism.highlight(str, prism.languages[lang], lang);
        return wrap(code, rawLang);
    }
    return wrap(str, "text");
};

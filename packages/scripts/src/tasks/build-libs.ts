/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-07-30 16:08:36
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-31 20:05:47
 * @项目的路径: \CMS-components\packages\scripts\src\tasks\build-libs.ts
 * @描述: 合并打包 esm模块和umd模块
 */
import { resolve } from "path";
import fs from "fs-extra";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild, { minify as minifyPlugin } from "rollup-plugin-esbuild";
import console from "../utils/console";
import { COMPONENTS_MAIN_ROOT, BUILD_DIST_ROOT, BUILD_ROOT, PACEKAGE_CAMELCASE_NAME } from "../utils/constants";

/**
 * 异步构建库函数，用于打包 esm 和 umd 模块。
 * @param minify {boolean} 是否进行代码压缩。
 * @param banner {string} 编译后的JS横幅内容，包含库名和版本号
 */
const buildLib = async function (minify: boolean, banner: string) {
    console.info("  开始-----合并打包" + (minify ? +" 压缩" : " 非压缩") + "esm模块和umd模块");

    const packageJson = JSON.parse(fs.readFileSync(resolve(BUILD_ROOT, "package.json"), "utf8"));
    // 插件
    const plugins = [
        vue(),
        vueJsx(),
        nodeResolve({
            extensions: [".mjs", ".js", ".json", ".ts"]
        }),
        commonjs(),
        esbuild({
            exclude: [],
            sourceMap: minify,
            target: "es2018",
            loaders: {
                ".vue": "ts"
            },
            define: {
                "process.env.NODE_ENV": JSON.stringify("production")
            },
            treeShaking: true,
            legalComments: "eof"
        })
    ];

    if (minify) {
        plugins.push(
            minifyPlugin({
                target: "es2018",
                sourceMap: true
            })
        );
    }

    const bundle = await rollup({
        input: resolve(COMPONENTS_MAIN_ROOT, "index.ts"),
        plugins,
        // 如果你觉得第三方依赖体积很大，也可以用 external 拆出来，让调用方提供对应依赖，此时要配合 globals 一起用
        external: Object.keys(packageJson.devDependencies),
        treeshake: true
    });

    await Promise.all([
        bundle.write({
            format: "umd",
            file: resolve(BUILD_DIST_ROOT, `index.full${minify ? ".min" : ""}.js`),
            exports: "named",
            name: PACEKAGE_CAMELCASE_NAME,
            globals: {
                "vue": "Vue",
                "element-plus": "ElementPlus",
                "@element-plus/icons-vue": "ElementPlusIconsVue"
            },
            sourcemap: minify,
            banner
        }),
        bundle.write({
            format: "esm",
            file: resolve(BUILD_DIST_ROOT, `index.full${minify ? ".min" : ""}.mjs`),
            sourcemap: minify,
            banner
        })
    ]);
    console.success("  完成-----合并打包" + (minify ? " 压缩" : " 非压缩") + "esm模块和umd模块");
};

/**
 * 合并打包 esm模块和umd模块
 * @param banner {string} 编译后的JS横幅内容，包含库名和版本号
 */
export default async function () {
    console.info("开始-----打包lib");
    const packageJson = JSON.parse(fs.readFileSync(resolve(BUILD_ROOT, "package.json"), "utf8"));
    const banner = `/*! ${packageJson.name} v${packageJson.version} */\n`;
    await Promise.all([buildLib(false, banner), buildLib(true, banner)]);
    console.success("完成-----打包lib");
}

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-07-30 15:49:35
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-31 20:18:34
 * @项目的路径: \CMS-components\packages\scripts\src\tasks\build-modules.ts
 * @描述: 单个组件打包 esm模块和cjs模块
 */
import { resolve } from "path";
import fastGlob from "fast-glob";
import fs from "fs-extra";
import { rollup } from "rollup";
import { type OutputOptions } from "rollup";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import console from "../utils/console";
import { BUILD_ES_ROOT, BUILD_ROOT, BUILD_LIB_ROOT, PACKAGES_ROOT, COMPONENTS_MAIN_ROOT } from "../utils/constants";
export default async function () {
    console.info("开始-------------单个组件打包 esm模块和cjs模块");

    const packageJson = JSON.parse(fs.readFileSync(resolve(BUILD_ROOT, "package.json"), "utf8"));

    const getInputs = async function (rootDir: string, ignore: string[] = []) {
        const files: string[] = await fastGlob("**/*.{js,ts,vue}", {
            cwd: rootDir,
            absolute: true,
            onlyFiles: true,
            ignore: ["**/node_modules/**/*"].concat(ignore)
        });

        // 添加main目录下的文件
        return files;
    };

    // 构建函数
    const build = async function (inputFiles: string[], options: OutputOptions) {
        console.info("  开始-----------" + (options.preserveModulesRoot === PACKAGES_ROOT ? "components" : "main") + "目录" + options.format + "打包");
        const bundle = await rollup({
            input: inputFiles,
            plugins: [
                vue({
                    isProduction: true
                }),
                vueJsx(),
                nodeResolve({
                    extensions: [".mjs", ".js", ".json", ".ts"]
                }),
                commonjs(),
                esbuild({
                    sourceMap: true,
                    target: "es2018"
                })
            ],
            // 忽略打包文件（如果你觉得第三方依赖体积很大，也可以用 external 拆出来，让调用方提供对应依赖，此时要配合 globals 一起用）,例如：[/^vue(\/.+|$)/]
            external: [...Object.keys(packageJson.devDependencies), ...Object.keys(packageJson.dependencies)],
            treeshake: false
        });
        return bundle.write(options).then(() => {
            console.success("  完成-----------" + (options.preserveModulesRoot === PACKAGES_ROOT ? "components" : "main") + "目录" + options.format + "打包");
        });
    };

    // 获取components和main文件夹下的所有的js,ts,vue文件
    console.info("  开始-----------获取components和main文件夹下的所有的js,ts,vue文件");
    const [componentsInputFiles, componentsMainInputFiles] = await Promise.all([
        getInputs(PACKAGES_ROOT, ["main/**/*", "scripts/**/*", "**/vitest.config.ts", "**/__tests__/**/*"]),
        getInputs(COMPONENTS_MAIN_ROOT)
    ]);
    console.success("  完成-----------获取components和main文件夹下的所有的js,ts,vue文件");

    await Promise.all([
        // 打包组件es模块
        build(componentsInputFiles, {
            format: "esm",
            dir: BUILD_ES_ROOT,
            // 与原始模块创建相同的文件
            preserveModules: true,
            // 原来库的代码是存在 src/lib 目录下的。如果要保持原有的目录结构输出到 es 目录下，就需要将 src/lib 这个路径去掉。
            // 否则打包生成的文件路径就包含 /lib，例如 src/lib/a.tsx => es/lib/a.js
            // 这与我们的预期不一致，我们希望的结果应该是 es/a.js。
            // preserveModulesRoot: "src/lib",
            preserveModulesRoot: PACKAGES_ROOT,
            sourcemap: true,
            entryFileNames: "[name].mjs"
        }),
        // 打包组件cjs模块
        build(componentsInputFiles, {
            format: "cjs",
            dir: BUILD_LIB_ROOT,
            // 与原始模块创建相同的文件
            preserveModules: true,
            // 原来库的代码是存在 src/lib 目录下的。如果要保持原有的目录结构输出到 es 目录下，就需要将 src/lib 这个路径去掉。
            // 否则打包生成的文件路径就包含 /lib，例如 src/lib/a.tsx => es/lib/a.js
            // 这与我们的预期不一致，我们希望的结果应该是 es/a.js。
            // preserveModulesRoot: "src/lib",
            preserveModulesRoot: PACKAGES_ROOT,
            exports: "named",
            sourcemap: true,
            entryFileNames: "[name].js"
        }),
        // 打包组件入口es模块
        build(componentsMainInputFiles, {
            format: "esm",
            dir: BUILD_ES_ROOT,
            // 与原始模块创建相同的文件
            preserveModules: true,
            // 原来库的代码是存在 src/lib 目录下的。如果要保持原有的目录结构输出到 es 目录下，就需要将 src/lib 这个路径去掉。
            // 否则打包生成的文件路径就包含 /lib，例如 src/lib/a.tsx => es/lib/a.js
            // 这与我们的预期不一致，我们希望的结果应该是 es/a.js。
            // preserveModulesRoot: "src/lib",
            preserveModulesRoot: COMPONENTS_MAIN_ROOT,
            sourcemap: true,
            entryFileNames: "[name].mjs"
        }),
        // 打包组件入口cjs模块
        build(componentsMainInputFiles, {
            format: "cjs",
            dir: BUILD_LIB_ROOT,
            // 与原始模块创建相同的文件
            preserveModules: true,
            // 原来库的代码是存在 src/lib 目录下的。如果要保持原有的目录结构输出到 es 目录下，就需要将 src/lib 这个路径去掉。
            // 否则打包生成的文件路径就包含 /lib，例如 src/lib/a.tsx => es/lib/a.js
            // 这与我们的预期不一致，我们希望的结果应该是 es/a.js。
            // preserveModulesRoot: "src/lib",
            preserveModulesRoot: COMPONENTS_MAIN_ROOT,
            exports: "named",
            sourcemap: true,
            entryFileNames: "[name].js"
        })
    ]);
    console.success("完成-------------esm模块和cjs模块组件打包");
}

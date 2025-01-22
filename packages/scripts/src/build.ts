/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-06-28 10:48:47
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-22 14:01:58
 * @项目的路径: \CMS-components\packages\scripts\src\build.ts
 * @描述: 组件构建入口
 */
import { series, parallel } from "gulp";
import { exec } from "./utils/process";
import copy from "./tasks/copy";
import generatePackage from "./tasks/generate-package";
import buildLibs from "./tasks/build-libs";
import buildModules from "./tasks/build-modules";
import generateTypes from "./tasks/generate-types";

// 构建
const main = series(
    async function () {
        await exec("npm run clear");
    },
    copy,
    generatePackage,
    parallel(
        buildLibs,
        buildModules,
        async function () {
            await exec("npm run build:style");
        },
        generateTypes
    )
);

main();

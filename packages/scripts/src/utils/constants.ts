/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-06-27 15:01:27
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-11 16:43:44
 * @项目的路径: \CMS-components\packages\scripts\src\utils\constants.ts
 * @描述: 定义常量
 */
import { resolve } from "path";

// 包名称
export const PACEKAGE_NAME = "@yujinjin/cms-components";

// 包全局名词
export const PACEKAGE_CAMELCASE_NAME = "CMSComponents";

// 项目根目录
export const PROJECT_ROOT = resolve(__dirname, "..", "..", "..", "..");

// 包目录
export const PACKAGES_ROOT = resolve(PROJECT_ROOT, "packages");

// 组件目录
export const COMPONENTS_ROOT = resolve(PACKAGES_ROOT, "components");

// 组件总入口目录
export const COMPONENTS_MAIN_ROOT = resolve(PACKAGES_ROOT, "main");

// 组件样式目录
export const COMPONENTS_STYLE_ROOT = resolve(PACKAGES_ROOT, "style");

// 构建根目录
export const BUILD_ROOT = resolve(PROJECT_ROOT, "dist", "cms-components");

// 构建esm目录
export const BUILD_ES_ROOT = resolve(BUILD_ROOT, "es");

// 构建cjs目录
export const BUILD_LIB_ROOT = resolve(BUILD_ROOT, "lib");

// 构建umd目录
export const BUILD_DIST_ROOT = resolve(BUILD_ROOT, "dist");

// 构建style目录
export const BUILD_STYLE_ROOT = resolve(BUILD_ROOT, "style");

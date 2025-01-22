/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-08-02 17:29:02
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-22 15:19:53
 * @项目的路径: \CMS-components\packages\scripts\src\generate-styles.ts
 * @描述: 生成样式任务
 */
import { dest, series, src } from "gulp";
import autoprefixer from "gulp-autoprefixer";
import * as dartSass from "sass";
import minifyCss from "gulp-clean-css";
import gulpSass from "gulp-sass";
import { COMPONENTS_STYLE_ROOT, BUILD_STYLE_ROOT, BUILD_DIST_ROOT } from "./utils/constants";

/**
 * 构建样式文件
 */
function buildStyle() {
    console.info("构建样式文件:" + COMPONENTS_STYLE_ROOT);
    const sass = gulpSass(dartSass);

    return src(COMPONENTS_STYLE_ROOT + "/**/*.scss")
        .pipe(
            sass.sync({
                importers: [new dartSass.NodePackageImporter()]
            })
        )
        .pipe(autoprefixer({ cascade: false }))
        .pipe(minifyCss())
        .pipe(dest(BUILD_STYLE_ROOT));
}

/**
 * 复制源样式文件到构建目录。
 */
function copySource() {
    return src(COMPONENTS_STYLE_ROOT + "/**/*.scss").pipe(dest(BUILD_STYLE_ROOT + "/src"));
}

/**
 * 复制完整的样式文件到dest构建目录
 */
function copyFullStyle() {
    return src(BUILD_STYLE_ROOT + "/index.css").pipe(dest(BUILD_DIST_ROOT));
}

const main = series(buildStyle, copySource, copyFullStyle);

main();

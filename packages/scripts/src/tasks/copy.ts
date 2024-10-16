/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-08-02 17:29:58
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-16 09:34:00
 * @项目的路径: \CMS-components\packages\scripts\src\tasks\copy.ts
 * @描述: 复制相关文件到构建目录
 */
import { resolve } from "path";
import fs from "fs-extra";
import { PROJECT_ROOT, BUILD_ROOT, COMPONENTS_MAIN_ROOT } from "../utils/constants";
import console from "../utils/console";

export default async function () {
    console.info("开始------------复制“README.md”文件");
    // 复制README文件过去
    await fs.copy(resolve(PROJECT_ROOT, "README.md"), resolve(BUILD_ROOT, "README.md"));
    console.success("完成------------复制“README.md”文件");

    console.info("开始------------复制“package.json”文件");
    // 复制package.json文件过去
    await fs.copy(resolve(COMPONENTS_MAIN_ROOT, "package.json"), resolve(BUILD_ROOT, "package.json"));
    console.success("完成------------复制“README.md”文件");

    console.info("开始------------复制“global.d.ts”文件");
    await fs.copy(resolve(PROJECT_ROOT, "typings", "global.d.ts"), resolve(BUILD_ROOT, "global.d.ts"));
    console.success("完成------------复制“global.d.ts”文件");
}

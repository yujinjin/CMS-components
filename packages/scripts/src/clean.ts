/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-07-30 15:39:56
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-09-26 16:23:27
 * @项目的路径: \CMS-components\packages\scripts\src\clean.ts
 * @描述: 清空打包文件夹下的所有文件
 */
import fs from "fs-extra";
import console from "./utils/console";
import { BUILD_ROOT } from "./utils/constants";

const main = async function () {
    console.info("清空“" + BUILD_ROOT + "”目录及该目录下所有文件");
    if (fs.pathExistsSync(BUILD_ROOT)) {
        await fs.remove(BUILD_ROOT);
    }
};

main();

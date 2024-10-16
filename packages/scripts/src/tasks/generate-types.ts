/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-07-31 10:59:44
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-16 14:40:43
 * @项目的路径: \CMS-components\packages\scripts\src\tasks\generate-types.ts
 * @描述: 生成对应的类型声明文件并放到types文件夹下
 */
import { resolve } from "path";
import fs from "fs-extra";
import glob from "fast-glob";
import { run } from "../utils/process";
import { PROJECT_ROOT, BUILD_ES_ROOT, BUILD_LIB_ROOT } from "../utils/constants";
import console from "../utils/console";

export default async function () {
    console.info("开始----------------生成类型声明文件");
    const typesRoot = resolve(PROJECT_ROOT, "dist", "types");
    // 必须确保 BUILD_DIST_TYPES_ROOT 目录存在，不然tsbuildinfo文件会放在当前存在的目录下
    if (!fs.pathExistsSync(typesRoot)) {
        console.info(typesRoot + "目录不存在，创建types文件夹");
        // 创建types文件夹
        fs.ensureDirSync(typesRoot);
    }
    // 执行生产types文件
    await run("npx vue-tsc -p tsconfig.declaration.json --declaration --emitDeclarationOnly --declarationDir dist/types");
    const packagesRoot = resolve(typesRoot, "packages");
    const mainRoot = resolve(packagesRoot, "main");
    if (fs.pathExistsSync(mainRoot)) {
        console.info("    " + mainRoot + "目录存在，需要处理main目录下的文件内容");
        // 修改types导入的文件路径名称
        const filePaths = await glob(`**/*.d.ts`, {
            cwd: packagesRoot,
            absolute: true
        });
        const rewriteTasks = filePaths.map(async filePath => {
            const content = await fs.readFile(filePath, "utf8");
            await fs.writeFile(filePath, content.replaceAll("@yujinjin/cms-components-modules", "./components"), "utf8");
        });
        console.info("    开始----------------main目录下的文件内容替换‘@yujinjin/cms-components-modules’ => ‘./components’");
        await Promise.all(rewriteTasks);
        console.success("    完成----------------main目录下的文件内容替换‘@yujinjin/cms-components-modules’ => ‘./components’");

        console.info("    把main文件夹下的文件复制到packages文件夹下");
        // 把main文件夹下的文件复制到packages文件夹下
        await fs.copy(mainRoot, packagesRoot);

        console.info("    删除main文件夹");
        // 删除main文件夹
        await fs.remove(mainRoot);
    }

    console.info("    开始----------------复制types文件到es和lib文件夹下");
    // 复制types文件到es和lib文件夹下
    await Promise.all([fs.copy(packagesRoot, BUILD_ES_ROOT), fs.copy(packagesRoot, BUILD_LIB_ROOT)]);
    console.success("    完成----------------复制types文件到es和lib文件夹下");

    console.success("完成----------------生成类型声明文件");
}

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-08-05 14:47:22
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-16 14:21:31
 * @项目的路径: \CMS-components\packages\scripts\src\tasks\generate-package.ts
 * @描述: 升级本地package.json 最新版本号
 */
import { resolve } from "path";
import fs from "fs-extra";
import { PACEKAGE_NAME, PROJECT_ROOT, BUILD_ROOT, COMPONENTS_ROOT, COMPONENTS_MAIN_ROOT } from "../utils/constants";
import getPackageUpgradeVersion from "../utils/get-package-upgrade-version";
import console from "../utils/console";

export default async function () {
    console.info("开始----------------package.json内容相关更新");
    const packageJsonPath = resolve(BUILD_ROOT, "package.json");
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
    const packageJson = JSON.parse(packageJsonContent);

    console.debug("   设置其name:" + PACEKAGE_NAME);
    // 设置name
    packageJson.name = PACEKAGE_NAME;

    // 获取最新版本号
    const upgradeVersion = await getPackageUpgradeVersion(packageJson.name);
    console.debug("   设置其version:" + upgradeVersion);
    // 设置版本号
    packageJson.version = upgradeVersion;

    // 设置依赖版本
    const componentsPackageJson = JSON.parse(fs.readFileSync(resolve(COMPONENTS_ROOT, "package.json"), "utf8"));
    console.debug("   设置其dependencies:" + JSON.stringify(componentsPackageJson.dependencies));
    packageJson.dependencies = componentsPackageJson.dependencies;

    // 设置dev依赖版本
    const projectPackageJson = JSON.parse(fs.readFileSync(resolve(PROJECT_ROOT, "package.json"), "utf8"));
    packageJson.devDependencies = {
        "vue": projectPackageJson.dependencies["vue"],
        "element-plus": projectPackageJson.dependencies["element-plus"],
        "@element-plus/icons-vue": projectPackageJson.dependencies["@element-plus/icons-vue"]
    };
    console.debug("   设置其devDependencies:" + JSON.stringify(packageJson.devDependencies));

    // 写入package.json内容
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));

    // 写入version.ts 文件版本号
    console.debug("   写入version.ts 文件版本号:" + upgradeVersion);
    fs.writeFileSync(resolve(COMPONENTS_MAIN_ROOT, "version.ts"), `export const version = "${upgradeVersion}";\n`);

    console.success("完成----------------package.json内容相关更新");
}

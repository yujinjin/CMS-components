/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-08-02 17:29:21
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-21 15:26:20
 * @项目的路径: \CMS-components\packages\scripts\src\publish.ts
 * @描述: 发布脚本
 */
import { resolve } from "path";
import { series } from "gulp";
import fs from "fs-extra";
import console from "./utils/console";
import { exec, run } from "./utils/process";
import { BUILD_ROOT, PROJECT_ROOT } from "./utils/constants";

// 当前升级的版本号
let upgradeVersion = "";

// 执行build 任务
const build = async function () {
    const updateVersionType = process.env.vt;
    if (updateVersionType) {
        await run("npm run build --vt=" + updateVersionType);
    } else {
        await run("npm run build");
    }
    // 读取package.json内容，设置当前升级的版本
    const packageJsonPath = resolve(BUILD_ROOT, "package.json");
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
    const packageJson = JSON.parse(packageJsonContent);
    upgradeVersion = packageJson.version;
};

// 自动生成changelog.md 文件
const generateChangelog = async function () {
    const gitStatus: any = exec("git status -s");
    if (gitStatus && gitStatus.length) {
        console.error("请确保git工作区干净！");
        throw new Error("请确保git工作区干净");
    }
    console.info(`开始生成v${upgradeVersion}版本的changelog`);

    // 开始生成changelog
    await run("conventional-changelog -p angular -k " + BUILD_ROOT.substring(PROJECT_ROOT.length + 1).replaceAll("\\", "/") + "/package.json -i CHANGELOG.md -s");
    // 复制README文件过去
    await fs.copy(resolve(PROJECT_ROOT, "CHANGELOG.md"), resolve(BUILD_ROOT, "CHANGELOG.md"));
    await run("git add .");
    // 这种写法：await run("git commit -m \"chore: 更新 changelog\""); 会自动转换成单引号，导致eslint提示错误，所以改成这种写法
    // TODO: 研究这种情况下怎样让保存的时候不要自动转换成单引号
    await run('git commit -m "chore(docs): 更新 changelog"');
    // await run("git commit -m ‘chore: 更新 changelog’");
    console.success("changelog生成成功，并提交到git");
};

// 根据TAG 生成版本号
const addGitTag = async function () {
    console.info(`开始生成v${upgradeVersion}版本的tag`);
    await run(`git tag v${upgradeVersion}`);
    console.success(`v${upgradeVersion}版本的tag创建成功，并提交到git`);
};

// 发布
const publish = async function () {
    try {
        console.info(`开始发布版本：${upgradeVersion}`);
        // await run("npm publish", BUILD_ROOT);
        // git 推送到远程
        await run("git push");
        // 发布tag到远程
        await run(`git push origin v${upgradeVersion}`);
        console.success(`发布版本${upgradeVersion}成功`);
    } catch (error) {
        console.error(`发布版本${upgradeVersion}失败`);
    }
};

// const main = series(publish);
// const main = series(build, generateChangelog, addGitTag);
const main = series(build, generateChangelog, addGitTag, publish);

main();

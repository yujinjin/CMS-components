/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-06-27 15:01:27
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-16 14:43:58
 * @项目的路径: \CMS-components\packages\scripts\src\utils\process.ts
 * @描述: shell命令处理
 */
import { spawn, execSync } from "child_process";
import console from "./console";
import { PROJECT_ROOT } from "./constants";

// 命令运行
export const run = function (command: string, cwd: string = PROJECT_ROOT) {
    return new Promise((resolve, reject) => {
        const [cmd, ...args] = command.split(" ");
        console.info(`开始 run: ${cmd} ${args.join(" ")}`);
        const app = spawn(cmd, args, {
            cwd,
            stdio: "inherit",
            shell: process.platform === "win32"
        });

        const onProcessExit = () => {
            app.kill("SIGHUP");
        };

        let stdoutData = null;

        app.stdout?.on("data", data => {
            console.info(`stdout: ${data}`);
            stdoutData = data;
        });

        app.on("close", code => {
            process.removeListener("exit", onProcessExit);

            if (code === 0) {
                resolve(stdoutData);
                console.success(`执行成功：${cmd} ${args.join(" ")}`);
            } else {
                console.error(`Command failed. \n Command: ${command} \n Code: ${code}`);
                reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`));
            }
        });
        process.on("exit", onProcessExit);
    });
};

// 命令执行
export const exec = function (command: string, cwd?: string) {
    console.info(`开始exec: ${command}`);
    const execResult = execSync(command, { cwd });
    console.success("执行结果:" + execResult.toString().trim());
    return execResult.toString().trim();
};

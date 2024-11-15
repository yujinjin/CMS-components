/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-07-30 15:58:19
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-25 17:07:58
 * @项目的路径: \CMS-components\packages\main\index.ts
 * @描述: 引入全局组件的入口
 */
import { type App } from "vue";
import components from "./components";
import { version } from "./version";

export * from "@yujinjin/cms-components-modules";

const INSTALLED_KEY = Symbol("CMS_INSTALLED_KEY");

interface InstallOptions {
    size?: string;
}

export const install = function (app: App, options: InstallOptions) {
    if (app[INSTALLED_KEY]) return;

    app[INSTALLED_KEY] = true;
    if (options) {
        // TODO: 设置全局属性
    }
    components.forEach(component => {
        app.component(component.name!, component);
    });
};

export default { install, version };

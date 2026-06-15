import { type App } from "vue";
import components from "./components";
import { version } from "./version";

const INSTALLED_KEY: unique symbol = Symbol("CMS_INSTALLED_KEY");

// 通过模块增强扩展 App 类型，声明自定义 symbol 属性
declare module "vue" {
    interface App {
        [INSTALLED_KEY]: boolean;
    }
}

export interface InstallOptions {
    size?: string;
}

const install = function (app: App, options?: InstallOptions) {
    if (app[INSTALLED_KEY]) return;

    app[INSTALLED_KEY] = true;
    if (options) {
        // TODO: 设置全局属性
    }
    components.forEach(component => {
        app.component(component.name!, component);
    });
};

export default {
    install,
    version
};

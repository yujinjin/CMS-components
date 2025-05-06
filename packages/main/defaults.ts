import { type App } from "vue";
import components from "./components";
import { version } from "./version";

const INSTALLED_KEY = Symbol("CMS_INSTALLED_KEY");

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

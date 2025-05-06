import { getCurrentInstance } from "vue";
// @ts-ignore
import CMSComponents from "@yujinjin/cms-components";

let installed = false;

export function setupCMSComponents() {
    if (installed) return;
    const instance = getCurrentInstance();
    instance.appContext.app.use(CMSComponents);
    installed = true;
}

export function loadStyle() {
    const styles = ["#STYLE#"].map(style => {
        return new Promise((resolve, reject) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = style;
            link.addEventListener("load", resolve);
            link.addEventListener("error", reject);
            document.body.append(link);
        });
    });
    return Promise.all(styles);
}

await loadStyle();

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-08 16:37:12
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-06 14:28:30
 * @项目的路径: \CMS-components\play\src\main.ts
 * @描述: 入口页
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import { type RouteRecordRaw, type Router, createRouter, createWebHashHistory } from "vue-router";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import App from "./index.vue";

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn });
const router: Router = createRouter({
    history: createWebHashHistory(),
    routes: <Array<RouteRecordRaw>>[
        {
            path: "/svg-icon",
            name: "svg-icon",
            component: () => import("./svg-icon/example.vue")
        },
        {
            path: "/check-select",
            name: "check-select",
            component: () => import("./check-select/example1.vue")
        }
    ],
    scrollBehavior: () => ({ left: 0, top: 0 }),
    strict: true
});
app.use(router);
app.mount("#app");

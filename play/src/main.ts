/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-08 16:37:12
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 17:54:57
 * @项目的路径: \CMS-components\play\src\main.ts
 * @描述: 入口页
 */
import { type Plugin, createApp } from "vue";
import ElementPlus from "element-plus";
import { type RouteRecordRaw, type Router, createRouter, createWebHashHistory } from "vue-router";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import "@yujinjin/cms-components-style/index.scss";
import App from "./index.vue";

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes: <Array<RouteRecordRaw>>[
        {
            path: "/svg-icon",
            name: "svg-icon",
            component: () => import("./svg-icon/example.vue")
        },
        {
            path: "/check-select/example1",
            name: "check-select-example1",
            component: () => import("./check-select/example1.vue")
        },
        {
            path: "/check-select/example2",
            name: "check-select-example2",
            component: () => import("./check-select/example2.vue")
        },
        {
            path: "/check-select/example3",
            name: "check-select-example3",
            component: () => import("./check-select/example3.vue")
        },
        {
            path: "/check-select/example4",
            name: "check-select-example4",
            component: () => import("./check-select/example4.vue")
        },
        {
            path: "/img-upload/example1",
            name: "img-upload-example1",
            component: () => import("./img-upload/example1.vue")
        },
        {
            path: "/img-upload/example2",
            name: "img-upload-example2",
            component: () => import("./img-upload/example2.vue")
        },
        {
            path: "/img-upload/example3",
            name: "img-upload-example3",
            component: () => import("./img-upload/example3.vue")
        },
        {
            path: "/img-upload/example4",
            name: "img-upload-example4",
            component: () => import("./img-upload/example4.vue")
        },
        {
            path: "/img-upload/example5",
            name: "img-upload-example5",
            component: () => import("./img-upload/example5.vue")
        },
        {
            path: "/web-editor/example1",
            name: "web-editor-example1",
            component: () => import("./web-editor/example1.vue")
        },
        {
            path: "/web-editor/example2",
            name: "web-editor-example2",
            component: () => import("./web-editor/example2.vue")
        },
        {
            path: "/web-editor/example3",
            name: "web-editor-example3",
            component: () => import("./web-editor/example3.vue")
        },
        {
            path: "/web-editor/example4",
            name: "web-editor-example4",
            component: () => import("./web-editor/example4.vue")
        },
        {
            path: "/input-field/example1",
            name: "input-field-example1",
            component: () => import("./input-field/example1.vue")
        },
        {
            path: "/input-field/example2",
            name: "input-field-example2",
            component: () => import("./input-field/example2.vue")
        },
        {
            path: "/input-field/example3",
            name: "input-field-example3",
            component: () => import("./input-field/example3.vue")
        },
        {
            path: "/input-field/example4",
            name: "input-field-example4",
            component: () => import("./input-field/example4.vue")
        },
        {
            path: "/input-field/example5",
            name: "input-field-example5",
            component: () => import("./input-field/example5.vue")
        },
        {
            path: "/input-field/example6",
            name: "input-field-example6",
            component: () => import("./input-field/example6.vue")
        },
        {
            path: "/search-field/example1",
            name: "search-field-example1",
            component: () => import("./search-field/example1.vue")
        },
        {
            path: "/search-field/example2",
            name: "search-field-example2",
            component: () => import("./search-field/example2.vue")
        },
        {
            path: "/search-field/example3",
            name: "search-field-example3",
            component: () => import("./search-field/example3.vue")
        },
        {
            path: "/search-field/example4",
            name: "search-field-example4",
            component: () => import("./search-field/example4.vue")
        },
        {
            path: "/input-form/example1",
            name: "input-form-example1",
            component: () => import("./input-form/example1.vue")
        },
        {
            path: "/input-form/example2",
            name: "input-form-example2",
            component: () => import("./input-form/example2.vue")
        },
        {
            path: "/input-form/example3",
            name: "input-form-example3",
            component: () => import("./input-form/example3.vue")
        },
        {
            path: "/input-form/example4",
            name: "input-form-example4",
            component: () => import("./input-form/example4.vue")
        },
        {
            path: "/input-form/example5",
            name: "input-form-example5",
            component: () => import("./input-form/example5.vue")
        },
        {
            path: "/input-form/example6",
            name: "input-form-example6",
            component: () => import("./input-form/example6.vue")
        },
        {
            path: "/search-form/example1",
            name: "search-form-example1",
            component: () => import("./search-form/example1.vue")
        },
        {
            path: "/search-form/example2",
            name: "search-form-example2",
            component: () => import("./search-form/example2.vue")
        },
        {
            path: "/search-form/example3",
            name: "search-form-example3",
            component: () => import("./search-form/example3.vue")
        },
        {
            path: "/search-form/example4",
            name: "search-form-example4",
            component: () => import("./search-form/example4.vue")
        },
        {
            path: "/search-form/example5",
            name: "search-form-example5",
            component: () => import("./search-form/example5.vue")
        },
        {
            path: "/data-table/example1",
            name: "data-table-example1",
            component: () => import("./data-table/example1.vue")
        },
        {
            path: "/data-table/example2",
            name: "data-table-example2",
            component: () => import("./data-table/example2.vue")
        },
        {
            path: "/data-table/example3",
            name: "data-table-example3",
            component: () => import("./data-table/example3.vue")
        },
        {
            path: "/data-table/example4",
            name: "data-table-example4",
            component: () => import("./data-table/example4.vue")
        },
        {
            path: "/data-table/example4",
            name: "data-table-example4",
            component: () => import("./data-table/example4.vue")
        },
        {
            path: "/data-table/example5",
            name: "data-table-example5",
            component: () => import("./data-table/example5.vue")
        },
        {
            path: "/data-table/example6",
            name: "data-table-example6",
            component: () => import("./data-table/example6.vue")
        },
        {
            path: "/data-table/example7",
            name: "data-table-example7",
            component: () => import("./data-table/example7.vue")
        },
        {
            path: "/action-bar/example1",
            name: "action-bar-example1",
            component: () => import("./action-bar/example1.vue")
        },
        {
            path: "/action-bar/example2",
            name: "action-bar-example2",
            component: () => import("./action-bar/example2.vue")
        },
        {
            path: "/action-bar/example3",
            name: "action-bar-example3",
            component: () => import("./action-bar/example3.vue")
        },
        {
            path: "/dialog-form/example1",
            name: "dialog-form-example1",
            component: () => import("./dialog-form/example1.vue")
        },
        {
            path: "/dialog-form/example2",
            name: "dialog-form-example2",
            component: () => import("./dialog-form/example2.vue")
        },
        {
            path: "/dialog-form/example3",
            name: "dialog-form-example3",
            component: () => import("./dialog-form/example3.vue")
        },
        {
            path: "/dialog-form/example4",
            name: "dialog-form-example4",
            component: () => import("./dialog-form/example4.vue")
        },
        {
            path: "/dialog-form/example5",
            name: "dialog-form-example5",
            component: () => import("./dialog-form/example5.vue")
        },
        {
            path: "/dialog-form/example6",
            name: "dialog-form-example6",
            component: () => import("./dialog-form/example6.vue")
        },
        {
            path: "/search-page/example1",
            name: "search-page-example1",
            component: () => import("./search-page/example1.vue")
        },
        {
            path: "/search-page/example2",
            name: "search-page-example2",
            component: () => import("./search-page/example2.vue")
        },
        {
            path: "/search-page/example3",
            name: "search-page-example3",
            component: () => import("./search-page/example3.vue")
        },
        {
            path: "/search-page/example4",
            name: "search-page-example4",
            component: () => import("./search-page/example4.vue")
        },
        {
            path: "/search-page/example5",
            name: "search-page-example5",
            component: () => import("./search-page/example5.vue")
        }
    ],
    scrollBehavior: () => ({ left: 0, top: 0 }),
    strict: true
});
const app = createApp(App);
app.use(router as Plugin);
app.use(ElementPlus, { locale: zhCn });
app.mount("#app");

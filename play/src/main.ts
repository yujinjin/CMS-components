/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-08 16:37:12
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-09-23 18:26:19
 * @项目的路径: \CMS-components\play\src\main.ts
 * @描述: 入口页
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./example/index.vue";

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn });
app.mount("#app");

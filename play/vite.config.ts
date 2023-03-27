/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-08 16:00:07
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-03-09 11:23:51
 * @项目的路径: \CMS-components\play\vite.config.ts
 * @描述: play vite 配置
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default () => {
    return defineConfig({
        plugins: [vue(), vueJsx()],
        server: {
            host: true,
            port: 8000
        }
    });
};

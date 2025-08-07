/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-08 16:00:07
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-21 10:54:36
 * @项目的路径: \CMS-components\play\vite.config.ts
 * @描述: play vite 配置
 */
// import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";

export default () => {
    return defineConfig({
        mode: "production",
        plugins: [
            vue(),
            vueJsx(),
            svgLoader({
                defaultImport: "component"
            })
        ],
        resolve: {
            alias: {
                // "@yujinjin/cms-components": path.resolve(__dirname, "../", "dist/cms-components/es")
            }
        },
        server: {
            host: true,
            port: 8000
        }
    });
};

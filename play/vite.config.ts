/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-08 16:00:07
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-29 16:58:10
 * @项目的路径: \CMS-components\play\vite.config.ts
 * @描述: play vite 配置
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

export default () => {
    return defineConfig({
        mode: "production",
        plugins: [
            vue(),
            vueJsx(),
            createSvgSpritePlugin({
                symbolId: "icon-[name]"
            })
        ],
        server: {
            host: true,
            port: 8000
        }
    });
};

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-09 14:15:52
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-03-09 14:22:00
 * @项目的路径: \CMS-components\docs\vite.config.ts
 * @描述: docs vite 配置
 */
import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default () => {
    return defineConfig({
        plugins: [vueJsx()],
        server: {
            host: true,
            port: 8010
        }
    });
};

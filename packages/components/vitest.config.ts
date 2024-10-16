/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-27 09:55:34
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-09-26 17:48:03
 * @项目的路径: \CMS-components\packages\components\vitest.config.ts
 * @描述: vitest 配置
 */
/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
    plugins: [Vue(), VueJsx()],
    optimizeDeps: {
        disabled: true
    },
    test: {
        clearMocks: true,
        environment: "jsdom",
        testTransformMode: {
            web: ["*.{ts,tsx}"]
        }
    }
});

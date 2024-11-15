/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-08 16:53:14
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-25 17:04:04
 * @项目的路径: \CMS-components\typings\vue-shims.d.ts
 * @描述: vue模块功能声明
 */
/// <reference types="vite/client" />
// TS 识别 Vue 文件
declare module "*.vue" {
    import { type App, type defineComponent } from "vue";
    const component: ReturnType<typeof defineComponent> & {
        install(app: App): void;
    };
    export default component;
}

/** 将第三方变量挂载到每一个 vue 示例中 */
// declare module "@vue/runtime-core" {}

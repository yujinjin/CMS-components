/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-08 16:53:14
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-03-27 16:02:23
 * @项目的路径: \CMS-components\typings\vue-shims.d.ts
 * @描述: vue模块功能声明
 */
/// <reference types="vite/client" />

declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<object, object, any>;
    export default component;
}

/** 将第三方变量挂载到每一个 vue 示例中 */
// declare module "@vue/runtime-core" {}

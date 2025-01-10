/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-30 20:35:15
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-28 11:19:32
 * @项目的路径: \CMS-components\typings\global.d.ts
 * @描述: 全局声明
 */
/// <reference types="vite/client" />

// 移除 readonly
export type NotReadonly<T> = {
    -readonly [K in keyof T]: T[K];
};

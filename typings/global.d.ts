/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-30 20:35:15
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-15 17:20:55
 * @项目的路径: \CMS-components\typings\global.d.ts
 * @描述: 全局声明
 */
declare module "vue" {
    // GlobalComponents for Volar
    export interface GlobalComponents {
        SvgIcon: (typeof import("@yujinjin/cms-components"))["SvgIcon"];
    }
}

export {};

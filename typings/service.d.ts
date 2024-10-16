/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-10-15 16:43:59
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-15 16:44:11
 * @项目的路径: \CMS-components\typings\service.d.ts
 * @描述: 业务相关声明
 */
// 移除 readonly
declare type NotReadonly<T> = {
    -readonly [K in keyof T]: T[K];
};

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-07-30 15:58:19
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-25 17:07:58
 * @项目的路径: \CMS-components\packages\main\index.ts
 * @描述: 引入全局组件的入口
 */
import installer from "./defaults";
export * from "@yujinjin/cms-components-modules/index";

export default installer;

export const install = installer.install;

export const version = installer.version;

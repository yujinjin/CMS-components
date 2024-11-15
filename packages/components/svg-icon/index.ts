/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-30 18:00:53
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-30 15:08:39
 * @项目的路径: \CMS-components\packages\components\svg-icon\index.ts
 * @描述: svg icon 组件
 */
import SvgIcon from "./src/svg-icon.vue";
import type SvgIconType from "./src/svg-icon.vue";

export * from "./src/svg-icon";

// 支持手动单独导入（SvgIcon）
export { SvgIcon };

export default SvgIcon;

// TODO: 该组件不要实例，这里只做个测试
export type SvgIconInstance = InstanceType<typeof SvgIconType>;

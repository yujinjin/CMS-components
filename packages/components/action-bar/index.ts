/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-26 14:21:49
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-12-26 16:54:42
 * @项目的路径: \CMS-components\packages\components\action-bar\index.ts
 * @描述: action-bar组件入口
 */
import ActionBar from "./src/action-bar.vue";
import type ActionBarType from "./src/action-bar.vue";

// 单组件入口同时导出属性声明、回调类型及实例接口，供按需导入和业务类型标注使用。
export * from "./src/action-bar";

export { ActionBar };

export default ActionBar;

/** Vue 组件实例类型，可用于模板 ref 调用 changeButtons 等公开方法。 */
export type ActionBarInstance = InstanceType<typeof ActionBarType>;

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

export * from "./src/action-bar";

export { ActionBar };

export default ActionBar;

export type ActionBarInstance = InstanceType<typeof ActionBarType>;

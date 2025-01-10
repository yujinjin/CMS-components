/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-23 11:46:17
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-12-23 11:48:53
 * @项目的路径: \CMS-components\packages\components\web-editor\index.ts
 * @描述: web-editor组件
 */
import WebEditor from "./src/web-editor.vue";
import type WebEditorType from "./src/web-editor.vue";

export * from "./src/web-editor";

export { WebEditor };

export default WebEditor;

export type WebEditorInstance = InstanceType<typeof WebEditorType>;

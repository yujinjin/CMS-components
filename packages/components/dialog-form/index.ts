/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-08 14:59:40
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-09 11:52:17
 * @项目的路径: \CMS-components\packages\components\dialog-form\index.ts
 * @描述: dialog-form 组件入口
 */
import DialogForm from "./src/dialog-form.vue";
import type DialogFormType from "./src/dialog-form.vue";

export * from "./src/dialog-form";

export { DialogForm };

export default DialogForm;

export type DialogFormInstance = InstanceType<typeof DialogFormType>;

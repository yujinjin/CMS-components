/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-02 18:00:54
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-06 10:12:08
 * @项目的路径: \CMS-components\packages\components\input-form\index.ts
 * @描述: input-form组件入口
 */
import InputForm from "./src/input-form.vue";
import type InputFormType from "./src/input-form.vue";

export * from "./src/input-form";

export { InputForm };

export default InputForm;

export type InputFormInstance = InstanceType<typeof InputFormType>;

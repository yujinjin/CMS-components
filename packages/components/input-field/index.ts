/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-23 15:55:55
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-12-23 15:58:09
 * @项目的路径: \CMS-components\packages\components\input-field\index.ts
 * @描述: input-field组件入口
 */
import InputField from "./src/input-field.vue";
import type InputFieldType from "./src/input-field.vue";

export * from "./src/input-field";

export { InputField };

export default InputField;

export type InputFieldInstance = InstanceType<typeof InputFieldType>;

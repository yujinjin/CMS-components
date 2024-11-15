/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-01 14:21:44
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-01 14:33:32
 * @项目的路径: \CMS-components\packages\components\check-select\index.ts
 * @描述: check-select 组件
 */
import CheckSelect from "./src/check-select.vue";
import type CheckSelectType from "./src/check-select.vue";

export * from "./src/check-select";

export default CheckSelect;

export { CheckSelect };

export type CheckSelectInstance = InstanceType<typeof CheckSelectType>;

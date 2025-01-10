/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-26 21:29:39
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-02 11:14:14
 * @项目的路径: \CMS-components\packages\components\search-field\index.ts
 * @描述: search-field组件入口
 */
import SearchField from "./src/search-field.vue";
import type SearchFieldType from "./src/search-field.vue";

export * from "./src/search-field";

export { SearchField };

export default SearchField;

export type SearchFieldInstance = InstanceType<typeof SearchFieldType>;

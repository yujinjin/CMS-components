/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-06 19:28:18
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-09 20:43:29
 * @项目的路径: \CMS-components\packages\components\search-form\index.ts
 * @描述: search-form组件入口
 */
import SearchForm from "./src/search-form.vue";
import type SearchFormType from "./src/search-form.vue";

// 导出查询字段、扩展按钮和插槽类型；查询与重置结果通过事件交给调用方处理。
export * from "./src/search-form";

export { SearchForm };

export default SearchForm;

export type SearchFormInstance = InstanceType<typeof SearchFormType>;

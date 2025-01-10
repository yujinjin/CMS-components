/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-09 11:57:44
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-10 11:28:19
 * @项目的路径: \CMS-components\packages\components\search-page\index.ts
 * @描述: search-page组件入口
 */
import SearchPage from "./src/search-page.vue";
import type SearchPageType from "./src/search-page.vue";

export * from "./src/search-page";

export { SearchPage };

export default SearchPage;

export type SearchPageInstance = InstanceType<typeof SearchPageType>;

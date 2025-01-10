/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-27 16:15:01
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-02 11:17:28
 * @项目的路径: \CMS-components\packages\components\data-table\index.ts
 * @描述: data-table组件入口
 */
import DataTable from "./src/data-table.vue";
import type DataTableType from "./src/data-table.vue";

export * from "./src/data-table";

export { DataTable };

export default DataTable;

export type DataTableInstance = InstanceType<typeof DataTableType>;

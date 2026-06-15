---
title: SearchPage 搜索页面
---

# SearchPage 搜索页面

基于 SearchForm、ActionBar 和 DataTable 组件封装的搜索页面组件，提供了完整的数据搜索、展示、操作等功能。支持自定义搜索条件、表格列、操作按钮等。

## 适用场景

- 需要完整的搜索+列表+操作页面
- 需要统一的搜索、分页查询交互
- 需要在搜索、操作栏、表格间共享数据
- 需要延迟加载（先获取配置再查询数据）

## 核心特性

- 通过 `searchFormProps`、`actionBarProps`、`dataTableProps` 配置各子组件
- 通过 `isLoadingForInit` 控制延迟加载
- 支持 `searchValueChange`、`searchFieldsChange`、`selectRowsChange` 事件
- 暴露 `query`、`getSearchingValue`、`getSearchedValue`、`changeFormFields`、`changeButtons`、`updateTableColumnsShowStatus` 方法
- 支持通过插槽分发 SearchForm、ActionBar、DataTable 的自定义内容

## 基础用法

基础的搜索页面配置展示。

:::demo 通过 `search-form-props` 定义搜索表单的配置，`data-table-props` 定义数据表格配置。

search-page/basic

:::

## 自定义工具栏

:::demo 通过 `action-bar-props` 配置工具栏按钮的操作，支持批量启用、批量修改、导出等操作。自定义工具栏插槽的名称必须以 `actionBar_` 开头，默认插槽内容不用通过 `button.slot` 来声明可直接使用 `actionBar_default`

search-page/action-buttons

:::

## 自定义搜索表单

:::demo 定义搜索表单的插槽必须以 `searchForm_` 开头。

search-page/custom-search

:::

## 表格操作

:::demo 定义数据表格列内容的插槽必须以 `dataTable_` 开头。

search-page/custom-table

:::

## 复杂示例

:::demo 展示包含多种功能的完整示例，包括搜索、分页、排序等。

search-page/complex(search-page/table-column-copy.vue|search-page/use-search-page.ts)

:::

## 延迟加载

:::demo 通过 `isLoadingForInit` 属性控制初始化时不自动查询数据，适用于需要先获取配置或权限后再查询的场景。

search-page/loading-init

:::

## 选中行变化事件

:::demo 通过 `selectRowsChange` 事件监听表格选中行的变化，常用于与操作栏联动。

search-page/select-rows-change

:::

## API

### SearchPage 属性

| 属性名              | 说明                                                            | 类型                         | 默认值 |
| ------------------- | --------------------------------------------------------------- | ---------------------------- | ------ |
| is-loading-for-init | 初始化时正在加载，如果为 true 时会先不做数据查询                | ^[boolean]                   | false  |
| search-form-props   | SearchForm 组件属性配置，具体见[search-form文档](./search-form) | ^[object]`SearchFormProps`   | {}     |
| action-bar-props    | ActionBar 组件属性配置，具体见[action-bar文档](./action-bar)    | ^[object]`ActionBarProps`    | []     |
| data-table-props    | DataTable 组件属性配置，具体见[data-table文档](./data-table)    | ^[object]`DataTableProps`    | {}     |

### SearchPage 事件

| 事件名               | 说明                   | 参数                                                                               |
| -------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| search-value-change  | 搜索表单查询事件       | ^[Function]`(field: SearchFormField, searchFormFields: SearchFormField[]) => void` |
| search-fields-change | 搜索表单的字段变化事件 | ^[Function]`(searchFormFields: SearchFormField[]) => void`                         |
| select-rows-change   | 表格选择变化事件       | ^[Function]`(selectedRows: Array<Record<string, any>>) => void`                    |

### SearchPage 方法

| 方法名                       | 说明                                                                                         | 类型                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| query                        | 查询数据（isInit=true 时会重置分页到第一页）                                                 | ^[Function]`(isInit?: boolean) => Promise<any> \| undefined`                            |
| getSearchingValue            | 获取当前搜索表单实时值（不要求已经触发查询）                                                 | ^[Function]`() => Record<string, any>`                                                  |
| getSearchedValue             | 获取最近一次查询固化的筛选快照（适合导出等依赖当前表格结果的操作）                           | ^[Function]`() => Record<string, any>`                                                  |
| changeFormFields             | 修改当前搜索表单字段属性                                                                     | ^[Function]`(callback: (formFields: SearchFormField[]) => void) => void`                |
| changeButtons                | 修改当前操作栏按钮属性                                                                       | ^[Function]`(callback: (actionButtons: ActionButton[]) => void) => void`                |
| updateTableColumnsShowStatus | 更新数据列显示状态（不传值表示都展示）                                                       | ^[Function]`(columnKeys?: string[]) => void`                                            |

### SearchPage 插槽

| 插槽名                              | 说明                                            | 作用域                                                               |
| ----------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------- |
| default                             | 自定义默认内容                                  | -                                                                    |
| [searchFormProps.fields.slot]       | 自定义搜索表单插槽内容，必须以 `searchForm_` 开头 | ^[object]`{ field: SearchFormField, formFields: SearchFormField[] }` |
| actionBar_default                   | 操作栏默认插槽内容                              | -                                                                    |
| [actionBarProps.buttons.slot]       | 操作栏自定义插槽内容，必须以 `actionBar_` 开头    | ^[object]`{ button: ActionButton }`                                  |
| [dataTableProps.columns.slot]       | 自定义表格列内容，必须以 `dataTable_` 开头        | ^[object]`{ row: any, column: any, $index: number }`                 |
| [dataTableProps.columns.slotHeader] | 自定义表格表头内容，必须以 `dataTable_` 开头      | ^[object]`{ column: any, $index: number }`                           |

## 注意事项

1. 搜索表单插槽命名必须以 `searchForm_` 开头
2. 操作栏插槽命名必须以 `actionBar_` 开头
3. 数据表格列插槽命名必须以 `dataTable_` 开头
4. `isLoadingForInit` 为 `true` 时不会自动查询数据，需手动调用 `query()` 方法触发
5. `getSearchingValue` 返回当前输入值（可能未查询），`getSearchedValue` 返回最近一次查询的筛选快照
6. `query(true)` 会重置 DataTable 分页到第一页

## 类型定义

```ts
export interface SearchPageRef {
    /** 查询数据（isInit=true 时会重置分页到第一页） */
    query: (isInit?: boolean) => Promise<any> | undefined;
    /** 获取当前搜索表单实时值 */
    getSearchingValue: () => Record<string, any>;
    /** 获取最近一次查询固化的筛选快照 */
    getSearchedValue: () => Record<string, any>;
    /** 修改当前搜索表单字段属性 */
    changeFormFields: (callback: (formFields: SearchFormField[]) => void) => void;
    /** 修改当前操作栏按钮属性 */
    changeButtons: (callback: (actionButtons: ActionButton[]) => void) => void;
    /** 更新数据列显示状态（不传值表示都展示） */
    updateTableColumnsShowStatus: (columnKeys?: string[]) => void;
}

export const searchPageEmits = {
    /** 搜索表单查询事件 */
    searchValueChange: (field: SearchFormField, searchFormFields: SearchFormField[]) => true,
    /** 搜索表单的字段变化事件 */
    searchFieldsChange: (searchFormFields: SearchFormField[]) => Array.isArray(searchFormFields),
    /** 数据表格的行选择事件 */
    selectRowsChange: (selectedRows: Array<Record<string, any>>) => Array.isArray(selectedRows)
};
```
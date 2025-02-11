---
title: SearchPage 搜索页面
---

# SearchPage 搜索页面

基于 SearchForm 和 DataTable 组件封装的搜索页面组件，提供了完整的数据搜索、展示、操作等功能。支持自定义搜索条件、表格列、操作按钮等。

## 基础用法

基础的搜索页面配置展示。

:::demo 通过 `search-form-props` 定义搜索表单的配置，`data-table-props` 定义数据表格配置。

search-page/basic

:::

## 自定义工具栏

:::demo 通过 `action-bar-props` 配置工具栏按钮的操作，支持批量启用、批量修改、导出等操作。自定义工具栏插槽的名称必须以`actionBar_`开头，默认插槽内容不用通过`button.slot`来声明可直接使用`actionBar_default`

search-page/action-buttons

:::

## 自定义搜索表单

:::demo 定义搜索表单的插槽必须以`searchForm_`开头。

search-page/custom-search

:::

## 表格操作

:::demo 定义数据表格列内容的插槽必须以`dataTable_`开头。

search-page/custom-table

:::

## 复杂示例

:::demo 展示包含多种功能的完整示例，包括搜索、分页、排序等。

search-page/complex(search-page/table-column-copy.vue|search-page/use-search-page.ts)

:::

## API

### SearchPage 属性

| 属性名              | 说明                                                            | 类型                         | 默认值 |
| ------------------- | --------------------------------------------------------------- | ---------------------------- | ------ |
| is-loading-for-init | 初始化时正在加载，如果为true时会先不做数据查询                  | ^[boolean]                   | false  |
| search-form-props   | SearchForm 组件属性配置，具体见[search-form文档](./search-form) | ^[object]`SearchFormProps[]` | {}     |
| action-bar-props    | 搜索表单字段配置，具体见[action-bar文档](./action-bar)          | ^[object]`ActionBarProps[]`  | []     |
| data-table-props    | DataTable 组件属性配置，具体见[data-table文档](./data-table)    | ^[object]`DataTableProps[]`  | {}     |

### SearchPage 事件

| 事件名               | 说明                   | 参数                                                                               |
| -------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| search-value-change  | 搜索表单查询事件       | ^[Function]`(field: SearchFormField, searchFormFields: SearchFormField[]) => void` |
| search-fields-change | 搜索表单的字段变化事件 | ^[Function]`(searchFormFields: SearchFormField[]) => void`                         |
| select-rows-change   | 表格选择变化事件       | ^[Function]`(selectedRows: Array<Record<string, any>>) => void`                    |

### SearchPage 方法

| 方法名                       | 说明                                                                                         | 参数                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| query                        | 查询数据                                                                                     | ^[Function]`(isInit?: boolean) => Promise<any> \| undefined`                            |
| getSearchingValue            | 获取当前搜索表单实时值                                                                       | ^[Function]`() => Record<string, any>`                                                  |
| getSearchedValue             | 获取当前已经搜索出来的结果值，与getSearchFormValue区别是当前已经用它查询出来结果的搜索表单值 | ^[Function]`() => DataTableInstance`                                                    |
| changeFormFields             | 获取搜索条件值                                                                               | ^[Function]`(callback: (formFields: SearchFormField[]) => void) => Record<string, any>` |
| changeButtons                | 修改当前生成的button按钮值                                                                   | ^[Function]`(callback: (actionButtons: ActionButton[]) => void) => void`                |
| updateTableColumnsShowStatus | 更新数据列显示状态                                                                           | ^[Function]`(columnKeys?: string[]) => void`                                            |

### SearchPage 插槽

| 插槽名                              | 说明                                            | 作用域                                                               |
| ----------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------- |
| default                             | 自定义默认内容                                  | -                                                                    |
| [searchFormProps.fields.slot]       | 自定义搜索表单插槽内容，必须以`searchForm_`开头 | ^[object]`{ field: SearchFormField, formFields: SearchFormField[] }` |
| actionBar_default                   | 操作栏默认插槽内容                              | -                                                                    |
| [actionBarProps.buttons.slot]       | 操作栏自定义插槽内容，必须以`actionBar_`开头    | ^[object]`{ button: ActionButton }`                                  |
| [dataTableProps.columns.slot]       | 自定义表格列内容，必须以`dataTable_`开头        | ^[object]`{ row: any, column: any, $index: number }`                 |
| [dataTableProps.columns.slotHeader] | 自定义表格表头内容，必须以`dataTable_`开头      | ^[object]`{ column: any, $index: number }`                           |

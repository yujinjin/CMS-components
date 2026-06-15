---
title: DataTable 数据表格
---

# DataTable 数据表格

基于 Element Plus 的 Table 组件封装，提供了更便捷的表格操作和数据处理能力。支持自定义列、排序、筛选、分页等功能。

## 适用场景

- 需要展示数据列表并支持分页查询
- 需要自定义列类型（操作列、枚举列、日期列等）
- 需要服务端分页查询
- 需要动态控制列的显示/隐藏
- 通常与 `SearchForm`、`ActionBar` 组合使用

## 核心特性

- 通过 `columns` 配置表格列，支持多种列类型
- 通过 `query` 函数实现服务端数据查询
- 支持分页配置（`pagination`）
- 支持查询参数加工（`queryParametersProcess`）和结果加工（`queryResponseProcess`）
- 支持动态更新列显示状态（`updateTableColumnsShowStatus`）
- 支持自定义列插槽

## 基础用法

基础的表格展示用法。

:::demo 通过 `columns` 定义表格列配置，`data` 传入数据源。

data-table/basic

:::

## 列配置

:::demo 支持多种列类型配置，包括普通列、操作列、自定义列等。

data-table/columns

:::

## 表格操作

:::demo 通过配置 `events` 对象属性可以设置 `rowClick`、`sortChange` 功能等。

data-table/events

:::

## 分页配置

:::demo 通过 `pagination` 配置分页参数，支持服务端分页。

data-table/pagination

:::

## 设置隐藏列

:::demo 通过 `updateTableColumnsShowStatus` 方法来实现数据列的隐藏或显示。

data-table/update-columns-status

:::

## 自定义列

:::demo 通过插槽自定义列的渲染内容。

data-table/custom-column

:::

## 无分页模式

:::demo 通过 `isShowPagination` 属性设置为 `false` 可以隐藏分页，适用于数据量较少不需要分页的场景。

data-table/no-pagination

:::

## 空数据

:::demo 当查询结果为空时，表格会显示空状态提示。

data-table/empty-data

:::

## 复杂的示例

:::demo

data-table/complex(data-table/table-column-copy.vue)

:::

## API

### DataTable 属性

| 属性名                            | 说明                                                                                                                                                 | 类型                                                 | 默认值 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------ |
| select-rows / v-model:select-rows | 当前选中的行数据列表                                                                                                                                 | ^[array]                                             | []     |
| query ^(required)                 | 列表查询钩子函数，返回数据列表                                                                                                                       | ^[Function]`(params: object) => Promise<any> \| any` | -      |
| columns                           | 列配置数组                                                                                                                                           | ^[array]`DataTableColumn[]`                          | []     |
| auto-init-query                   | 是否自动初始化查询                                                                                                                                   | ^[boolean]                                           | true   |
| pagination                        | 分页配置，具体见（[element-plus pagination文档](https://cn.element-plus.org/zh-CN/component/pagination.html)）                                       | ^[object]`PaginationProps`                           | -      |
| filters                           | 当前列表查询滤参数                                                                                                                                   | ^[object]                                            | {}     |
| is-show-pagination                | 是否显示分页                                                                                                                                         | ^[boolean]                                           | true   |
| query-parameters-process          | 查询参数数据加工（查询前参数处理函数）                                                                                                               | ^[Function]`(params: any) => any`                    | -      |
| query-response-process            | 查询数据结果加工（查询后数据结果处理函数）                                                                                                           | ^[Function]`(responseData: any) => any`              | -      |
| props                             | table 组件其它属性对象，比如：`height`、`stripe` 等属性。具体参照 element-plus 对应[table组件](https://cn.element-plus.org/zh-CN/component/table.html)   | ^[object]                                            | {}     |
| events                            | table 组件 events 对象，比如：`select`、`select-all` 等事件。具体参照 element-plus 对应[table组件](https://cn.element-plus.org/zh-CN/component/table.html) | ^[object]                                            |

### DataTableColumn 配置

| 属性名      | 说明                                                                                                                                    | 类型                                                                                                          | 默认值     |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------- |
| type        | 数据列的自定义类型                                                                                                                      | ^[enum]`'selection' \| 'index' \| 'expand' \| 'number' \| 'action' \| 'date' \| 'enum' \| 'image'` | -          |
| buttons     | 操作按钮列表（type 是 action 有用）                                                                                                     | ^[object]`TableButton[]`                                                                                      | -          |
| digit       | 数字格式化小数点位数（type 是 number 有用）                                                                                              | ^[number]                                                                                                     | 0          |
| separator   | 数据列分隔符，比如 type 是 image、enum 等会用到                                                                                         | ^[string]                                                                                                     | -          |
| formate     | 日期格式化字符串（type 是 date 有用）                                                                                                    | ^[string]                                                                                                     | YYYY-MM-DD |
| data        | 数据枚举列表（type 是 enum 有用）                                                                                                       | ^[array]                                                                                                      | []         |
| slot-header | header 插槽                                                                                                                             | ^[string]                                                                                                     | -          |
| slot        | 自定义插槽名                                                                                                                            | ^[string]                                                                                                     | -          |
| isShow      | 是否展示数据列                                                                                                                          | ^[boolean]                                                                                                    | -          |
| ...         | 其他属性参照 element-plus 对应[table-column 属性](https://cn.element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7) |                                                                                                               | -          |

### TableButton 配置

| 属性名      | 说明                                                                                                           | 类型                                                                                 | 默认值 |
| ----------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------ |
| handle-code | 按钮操作CODE作为唯一标识                                                                                       | ^[string]                                                                            | -      |
| contents    | 按钮文本                                                                                                       | ^[string]                                                                            | -      |
| slot        | 自定义插槽名称（如有值其他选项无效）                                                                           | ^[string]                                                                            | -      |
| is-show     | 是否显示（通过当前固定展示数目来判断是否展示）                                                                 | ^[boolean]                                                                           | true   |
| display     | 是否显示（根据当前列的数据情况来判断是否展示）                                                                 | ^[Function]`(row: any) => boolean`                                                  | -      |
| click       | 按钮点击事件                                                                                                   | ^[Function]`(row: Record<string, any>, button: TableButton) => Promise<void> \| void` | -      |
| ...         | 其他属性配置选项，具体见（[element-plus button文档](https://cn.element-plus.org/zh-CN/component/button.html)） |                                                                                      | -      |

### DataTable 事件

| 事件名               | 说明                 | 参数                                      |
| -------------------- | -------------------- | ----------------------------------------- |
| update:select-rows   | 选中行变化时触发     | ^[array]`(value: Array<any>)`             |
| search               | 查询当前数据         | ^[Function]`(isLoading: boolean) => void` |

### DataTable 方法

| 名称                         | 说明               | 类型                                            |
| ---------------------------- | ------------------ | ----------------------------------------------- |
| queryDataList                | 查询数据函数       | ^[Function]`(isInit?: boolean) => Promise<any>` |
| initTableMaxHeight           | 初始化表格最大高度 | ^[Function]`() => Promise<void>`                |
| updateTableColumnsShowStatus | 更新数据列显示状态 | ^[Function]`(columnKeys?: string[]) => void`    |

### DataTable 插槽

| 插槽名              | 说明                       | 作用域                                               |
| ------------------- | -------------------------- | ---------------------------------------------------- |
| [column.slotHeader] | 自定义列header内容的插槽名 | ^[object]`{ row: any, column: any, $index: number }` |
| [column.slot]       | 自定义列内容的插槽名       | ^[object]`{ row: any, column: any, $index: number }` |

## 注意事项

1. 列的 `prop` 属性需要与数据源的字段对应
2. 自定义列需要通过插槽实现复杂的渲染逻辑
3. 服务端分页需要自行处理数据加载
4. 选择功能需要配合 `row-key` 使用
5. 表格高度建议根据实际场景设置
6. `queryParametersProcess` 可在查询前对参数进行加工（如添加默认参数、转换格式）
7. `queryResponseProcess` 可在查询后对结果进行加工（如数据映射、格式转换）
8. `query` 函数返回的数据需包含 `rows`（数据列表）和 `total`（总数）字段

## 类型定义

```ts
export type TableButton = NotReadonly<Partial<ButtonProps>> & {
    /** 当前按钮操作CODE */
    handleCode?: string;
    /** 按钮文案内容 */
    contents?: string;
    /** 自定义插槽名称（如有值其他选项无效） */
    slot?: string;
    /** 是否显示 */
    isShow?: boolean;
    /** 是否显示（根据当前列的数据情况来判断是否展示） */
    display?: (row: any) => boolean;
    /** 按钮点击函数事件 */
    click?: (selectRow: Record<string, any>, button: TableButton) => Promise<void> | void;
};

export interface DataTableColumn<T extends Record<string, any> = Record<string, any>> extends Partial<TableColumnCtx<T>> {
    /** 数据列的自定义类型 */
    type?: "selection" | "index" | "expand" | "number" | "action" | "date" | "enum" | "image";
    /** 操作按钮列表（type 是 action 有用） */
    buttons?: TableButton[];
    /** 数字格式化小数点位数（默认是0, type 是 number 有用） */
    digit?: number;
    /** 数据列分隔符 */
    separator?: string;
    /** 日期格式化字符串（默认是YYYY-MM-DD, type 是 date 有用） */
    formate?: string;
    /** 数据枚举列表（type 是 enum 有用） */
    data?: Array<Record<string, any>>;
    /** header 插槽 */
    slotHeader?: string;
    /** 默认插槽 */
    slot?: string;
    /** 是否展示数据列 */
    isShow?: boolean;
}

/** 数据表格实例 */
export interface DataTableRef {
    /** 查询数据函数 */
    queryDataList: (isInit?: boolean) => Promise<any>;
    /** 初始化表格最大高度 */
    initTableMaxHeight: () => Promise<void>;
    /** 更新数据列显示状态（不传值表示都展示） */
    updateTableColumnsShowStatus: (columnKeys?: string[]) => void;
}
```
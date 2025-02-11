---
title: DataTable 数据表格
---

# DataTable 数据表格

基于 Element Plus 的 Table 组件封装,提供了更便捷的表格操作和数据处理能力。支持自定义列、排序、筛选、分页等功能。

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

:::demo 通过配置 `events` 对象属性 可以设置`rowClick` 、 `sortChange` 功能等。

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
| query-parameters-process          | 查询参数数据加工（查询前参数处理函数）                                                                                                               | ^[Function]`(params: any) =>  any`                   | -      |
| query-response-process            | 查询数据结果加工（查询后数据结果处理函数）                                                                                                           | ^[Function]`(reponseData: any) =>  any`              | -      |
| props                             | table组件其它属性对象，比如：`height`、`stripe`等属性。具体参照element-plus对应[table组件](https://cn.element-plus.org/zh-CN/component/table.html)   | ^[object]                                            | {}     |
| events                            | table组件events对象，比如：`select`、`select-all`等事件。具体参照element-plus对应[table组件](https://cn.element-plus.org/zh-CN/component/table.html) | ^[object]                                            |

### DataTableColumn 配置

| 属性名      | 说明                                                                                                                                    | 类型                                                                                                          | 默认值     |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------- |
| type        | 数据列的自定义类型                                                                                                                      | ^[enum]`'selection' \| 'index' \| 'radio' \| 'expand' \| 'number' \| 'action' \| 'date' \| 'enum' \| 'image'` | -          |
| buttons     | 操作按钮列表(type是action有用)                                                                                                          | ^[object]`TableButton[]`                                                                                      | -          |
| digit       | 数字格式化小数点位数(type是number有用)                                                                                                  | ^[number]                                                                                                     | 0          |
| separator   | 数据列分隔符，比如type是image、enum等会用到                                                                                             | ^[string]                                                                                                     | -          |
| formate     | 日期格式化字符串(type是date有用)                                                                                                        | ^[string]                                                                                                     | YYYY-MM-DD |
| data        | 数据枚举列表(type是enum有用)                                                                                                            | ^[array]                                                                                                      | []         |
| slot-header | header 插槽                                                                                                                             | ^[string]                                                                                                     | -          |
| slot        | 自定义插槽名                                                                                                                            | ^[string]                                                                                                     | -          |
| isShow      | 是否展示数据列                                                                                                                          | ^[boolean]                                                                                                    | -          |
| ...         | 其他属性参照element-plus对应[table-column-属性](https://cn.element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7) |                                                                                                               | -          |

### TableButton 配置

| 属性名      | 说明                                                                                                           | 类型                                                                                 | 默认值 |
| ----------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------ |
| handle-code | 按钮操作CODE作为唯一标识                                                                                       | ^[string]                                                                            | -      |
| contents    | 按钮文本                                                                                                       | ^[string]                                                                            | -      |
| slot        | 自定义插槽名称（如有值其他选项无效）                                                                           | ^[string]                                                                            | -      |
| is-show     | 是否显示(通过当前固定展示数目来判断是否展示)                                                                   | ^[boolean]                                                                           | true   |
| display     | 是否显示(根据当前列的数据情况来判断是否展示)                                                                   | ^[Function]`(selectRows: Array<any>, button: ActionButton) => Promise<void> \| void` | -      |
| click       | 按钮点击事件                                                                                                   | ^[Function]`(row: any) => boolean`                                                   | -      |
| ...         | 上传属性配置选项，具体见（[element-plus button文档](https://cn.element-plus.org/zh-CN/component/button.html)） |

### DataTable 事件

| 事件名 | 说明         | 参数                                      |
| ------ | ------------ | ----------------------------------------- |
| search | 查询当前数据 | ^[Function]`(isLoading: boolean) => void` |

### DataTable 插槽

| 插槽名              | 说明                       | 作用域                                               |
| ------------------- | -------------------------- | ---------------------------------------------------- |
| [column.slotHeader] | 自定义列header内容的插槽名 | ^[object]`{ row: any, column: any, $index: number }` |
| [column.slot]       | 自定义列内容的插槽名       | ^[object]`{ column: any, $index: number }`           |

### DataTable 方法

| 名称                         | 说明               | 类型                                            |
| ---------------------------- | ------------------ | ----------------------------------------------- |
| queryDataList                | 查询数据函数       | ^[Function]`(isInit?: boolean) => Promise<any>` |
| initTableMaxHeight           | 初始化表格最大高度 | ^[Function]`() => Promise<void>`                |
| updateTableColumnsShowStatus | 更新数据列显示状态 | ^[Function]`(columnKeys?: string[]) => void`    |

## 注意事项

1. 列的 prop 属性需要与数据源的字段对应
2. 自定义列需要通过插槽实现复杂的渲染逻辑
3. 服务端分页需要自行处理数据加载
4. 选择功能需要配合 row-key 使用
5. 表格高度建议根据实际场景设置

---
title: SearchForm 搜索表单
---

# SearchForm 搜索表单

提供了便捷的搜索表单配置和操作。支持动态搜索项、折叠展开、自定义渲染等功能，通常和 `DataTable` 组件组合用于常用的数据分页查询功能。

## 适用场景

- 数据列表页的搜索条件区域
- 需要折叠/展开的搜索表单
- 需要自定义搜索按钮
- 需要搜索字段联动
- 通常与 `DataTable`、`ActionBar` 组合使用（或直接使用 `SearchPage`）

## 核心特性

- 通过 `fields` 配置搜索字段，支持 SearchField 的所有类型
- 支持折叠/展开搜索条件
- 支持自定义搜索按钮
- 支持搜索、重置、字段变化等事件
- 暴露 `changeFormFields`、`getValue` 等方法
- 支持自定义字段插槽

## 基础用法

基础的搜索表单配置展示。

:::demo 通过 `fields` 定义搜索字段配置，字段的布局是 flow 形式。`field.value` 属性定义搜索条件字段初始化值，`field.defaultValue` 属性定义搜索条件字段默认值，"重置"按钮后会自动变成该默认值。

search-form/basic

:::

## 折叠展开

:::demo 通过 `is-show-collapse` 属性来控制是否显示折叠按钮。

search-form/collapse

:::

## 自定义按钮

:::demo 通过 `buttons` 扩展来根据实际业务需要自定义按钮。

search-form/custom-button

:::

## 自定义表单项

:::demo 通过 `fields.slot` 属性来定义插槽名实现自定义字段的展示内容。

search-form/field-slot

:::

## 联动搜索

:::demo 可以通过 `change` 事件来监控当前表单数据的变化实现表单联动功能。

search-form/related

:::

## 重置事件

:::demo 通过 `reset` 事件监听重置操作。点击重置按钮后，表单值会恢复为 `defaultValue`（没有 defaultValue 则清空）。

search-form/reset-event

:::

## 方法调用

:::demo 通过 ref 调用组件暴露的方法：获取搜索值、动态修改字段等。

search-form/expose-methods

:::

## API

### SearchForm 属性

| 属性名                | 说明             | 类型                         | 默认值 |
| --------------------- | ---------------- | ---------------------------- | ------ |
| fields                | 搜索字段配置数组 | ^[array]`SearchFormField[]`  | []     |
| is-search-loading     | 是否正在搜索加载 | ^[boolean]                   | false  |
| is-show-collapse      | 是否显示折叠按钮 | ^[boolean]                   | true   |
| is-show-search-button | 是否显示搜索按钮 | ^[boolean]                   | true   |
| is-show-reset-button  | 是否显示重置按钮 | ^[boolean]                   | true   |
| label-width           | 字段标签的宽度   | ^[number]                    | 120    |
| input-width           | 字段宽度         | ^[number]                    | 200    |
| label-suffix          | 字段标签的后缀   | ^[string]                    | `：`   |
| buttons               | 按钮列表         | ^[array]`SearchFormButton[]` | `[]`   |

### SearchFormField 配置

| 属性名           | 说明                                               | 类型       | 默认值 |
| ---------------- | -------------------------------------------------- | ---------- | ------ |
| name ^(required) | 字段名称                                           | ^[string]  | -      |
| trim             | 是否去除空格，只对 input 类型有效                  | ^[boolean] | false  |
| label            | 字段标签                                           | ^[string]  | -      |
| slot             | 自定义插槽名称                                     | ^[string]  | -      |
| value            | 字段的初始值                                       | ^[any]     | -      |
| default-value    | 当前字段的默认值（重置时恢复为此值）               | ^[any]     | -      |
| label-width      | 字段标签的宽度                                     | ^[number]  | -      |
| input-width      | 字段宽度                                           | ^[number]  | -      |
| is-show          | 是否显示                                           | ^[boolean] | true   |
| ...              | 其他属性，具体见[search-field文档](./search-field) | -          | -      |

### SearchFormButton 配置

| 属性名      | 说明                                                                                                           | 类型                                                                      | 默认值 |
| ----------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------ |
| handle-code | 按钮操作CODE作为唯一标识                                                                                       | ^[string]                                                                 | -      |
| contents    | 按钮文本                                                                                                       | ^[string]                                                                 | -      |
| slot        | 自定义插槽名称（如有值其他选项无效）                                                                           | ^[string]                                                                 | -      |
| is-show     | 是否显示                                                                                                       | ^[boolean]                                                                | true   |
| click       | 按钮点击事件                                                                                                   | ^[Function]`(button: SearchFormButton) => Promise<void> \| void`          | -      |
| ...         | 其他属性配置选项，具体见（[element-plus button文档](https://cn.element-plus.org/zh-CN/component/button.html)） | -                                                                         | -      |

### SearchForm 事件

| 事件名               | 说明                 | 参数                                                                             |
| -------------------- | -------------------- | -------------------------------------------------------------------------------- |
| fieldsChange         | 表单字段变化事件     | ^[Function]`(formFields: SearchFormField[]) => void`                             |
| search               | 点击搜索按钮时触发   | ^[Function]`(searchFormValue: Record<string, any>) => void`                      |
| change               | 字段值变化时触发     | ^[Function]`(formField: SearchFormField, formFields: SearchFormField[]) => void` |
| reset                | 点击重置按钮时触发   | ^[Function]`(searchFormValue: Record<string, any>) => void`                      |
| collapseStatusChange | 折叠状态变化事件     | ^[Function]`(status: boolean) => void`                                           |

### SearchForm 方法

| 方法名           | 说明                       | 参数                                                                     |
| ---------------- | -------------------------- | ------------------------------------------------------------------------ |
| changeFormFields | 修改当前 form 字段的属性   | ^[Function]`(callback: (formFields: SearchFormField[]) => void) => void` |
| getValue         | 获取当前搜索表单的数据对象 | ^[Function]`() => Record<string, any>`                                   |

### SearchForm 插槽

| 插槽名       | 说明             | 作用域                                                               |
| ------------ | ---------------- | -------------------------------------------------------------------- |
| [field.slot] | 自定义搜索项内容 | ^[object]`{ field: SearchFormField, formFields: SearchFormField[] }` |

## 注意事项

1. 搜索字段的 `name` 属性必须唯一
2. 自定义搜索项需要自行处理数据绑定
3. 折叠展开功能需要合理设置显示行数
4. 建议搜索项不要过多，影响用户体验
5. 可以通过自定义按钮区域实现更多操作
6. `value` 是字段的初始值，`defaultValue` 是重置时恢复的默认值，两者不同
7. `change` 事件在字段值变化时触发，可用于搜索条件联动
8. `reset` 事件在点击重置按钮后触发，表单值会自动恢复为 `defaultValue`

## 类型定义

```ts
export type SearchFormButton = NotReadonly<Partial<ButtonProps>> & {
    /** 当前按钮操作CODE */
    handleCode?: string;
    /** 按钮文案内容 */
    contents?: string;
    /** 自定义插槽名称（如有值其他选项无效） */
    slot?: string;
    /** 是否显示 */
    isShow?: boolean;
    /** 按钮点击函数事件 */
    click?: (button: SearchFormButton) => Promise<void> | void;
};

export type SearchFormField = SearchFieldProps & {
    /** 查询项的名称，同时也是组件的双向绑定值属性 */
    name: string;
    /** 当前数据字段插槽 */
    slot?: string;
    /** 当前内容是否去除空格 */
    trim?: boolean;
    /** 选项的标签名称 */
    label?: string;
    /** 当前字段的值 */
    value?: any;
    /** 当前字段的默认值（重置时恢复） */
    defaultValue?: any;
    /** label 宽度 */
    labelWidth?: number;
    /** 表单组件的宽度 */
    inputWidth?: number;
    /** 是否显示 */
    isShow?: boolean;
};

// 搜索表单实例
export interface SearchFormRef {
    /** 修改当前 form 字段的属性 */
    changeFormFields: (callback: (formFields: SearchFormField[]) => void) => void;
    /** 获取当前搜索表单的数据对象 */
    getValue: () => Record<string, any>;
}
```
---
title: InputForm 表单
---

# InputForm 表单

基于 Element Plus 的 Form 组件封装，提供了更便捷的表单操作和数据处理能力。支持动态表单项配置、表单验证、自定义渲染等功能。

## 适用场景

- 需要配置化生成表单
- 需要动态增减表单项
- 需要表单验证功能
- 需要表单字段联动
- 需要自定义布局和内容

## 核心特性

- 通过 `fields` 配置表单字段，支持 InputField 的所有类型
- 通过 `value` 属性设置表单默认值
- 通过 `columns` 属性控制一行表单数
- 支持 `fieldValueChange` 事件监听字段值变化
- 暴露 `validate`、`getInputValue`、`setInputPropertyValue`、`changeFormFields` 等方法
- 支持自定义字段插槽

## 基础用法

基础的表单配置展示。

:::demo 通过 `fields` 定义表单字段配置，`value` 属性定义表单数据默认值。

input-form/basic

:::

## 不同类型的表单项

:::demo 通过 `fields` 定义各种的表单字段类型来满足数据表单的表现形式。

input-form/fields

:::

## 表单验证

:::demo 通过 `props.rules` 配置验证规则，支持同步和异步验证。

input-form/validation

:::

## 动态表单

:::demo 支持动态增减表单项，可以通过 `changeFormFields` 方法动态修改表单配置。

input-form/dynamic

:::

## 表单联动

:::demo 可以通过 `field-value-change` 事件来监控当前表单数据的变化实现表单联动功能。

input-form/related

:::

## 自定义布局

:::demo 可以通过 `fields.span` 属性来定义当前输入表单的栅格占据的列数，默认是 `24/columns`。

input-form/layout

:::

## 加载状态

:::demo 通过 `isLoading` 属性设置表单加载状态，加载中时表单字段不可操作。

input-form/loading

:::

## 方法调用

:::demo 通过 ref 调用组件暴露的方法：验证表单、获取数据、设置字段值、动态修改字段等。

input-form/expose-methods

:::

## API

### InputForm 属性

| 属性名     | 说明                                                                                                             | 类型                       | 默认值 |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------- | ------ |
| value      | 表单数据默认值                                                                                                   | ^[object]                  | {}     |
| fields     | 表单字段配置数组                                                                                                 | ^[array]`InputFormField[]` | []     |
| is-loading | 当前表单数据加载状态                                                                                             | ^[boolean]                 | false  |
| columns    | 一行表单数                                                                                                       | ^[number]                  | 1      |
| props      | Form 组件属性配置对象，具体参照 element-plus 对应[form组件](https://cn.element-plus.org/zh-CN/component/form.html) | ^[object]                  | {}     |
| events     | Form 组件 events 对象，具体参照 element-plus 对应[form组件](https://cn.element-plus.org/zh-CN/component/form.html) | ^[object]                  | {}     |

### InputFormField 配置

| 属性名           | 说明                                                                                                                           | 类型                                               | 默认值       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | ------------ |
| name ^(required) | 字段名称                                                                                                                       | ^[string]                                          | -            |
| label            | 字段标签                                                                                                                       | ^[string]                                          | -            |
| trim             | 是否去除空格，只对 input 类型有效                                                                                              | ^[boolean]                                         | false        |
| data             | 选项数据                                                                                                                       | ^[array]                                           | -            |
| slot             | 自定义插槽名称                                                                                                                 | ^[string]                                          | -            |
| value            | 字段的值                                                                                                                       | ^[string]                                          | -            |
| label-width      | 字段标签的宽度                                                                                                                 | ^[number] / ^[string]                              | 120          |
| input-width      | 字段宽度                                                                                                                       | ^[number]                                          | -            |
| span             | 组件所占的列数                                                                                                                 | ^[number]                                          | `24/columns` |
| is-show          | 是否显示                                                                                                                       | ^[boolean]                                         | true         |
| rules            | 当前字段验证规则                                                                                                               | ^[object]`FormItemRule` / ^[array]`FormItemRule[]` | -            |
| form-item-props  | Form Item 属性，具体参照 element-plus 对应[Form Item](https://cn.element-plus.org/zh-CN/component/form.html#formitem-attributes) | ^[object]`FormItemRule` / ^[array]`FormItemRule[]` | -            |
| ...              | 其他属性，具体见[input-field文档](./input-field)                                                                               | -                                                  | -            |

### InputForm 事件

| 事件名             | 说明             | 参数                                                                                          |
| ------------------ | ---------------- | --------------------------------------------------------------------------------------------- |
| field-value-change | 字段值变化时触发 | ^[Function]`(field: InputFormField, fieldValue: any, formFields: InputFormField[], formValue: Record<string, any>) => void` |

### InputForm 方法

| 方法名                | 说明                         | 参数                                                                   |
| --------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| validate              | 表单验证                     | ^[Function]`(callback?: FormValidateCallback) => FormValidationResult` |
| getInputValue         | 获取表单数据                 | ^[Function]`() => Record<string, any>`                                 |
| setInputPropertyValue | 设置表单字段值               | ^[Function]`(propertyName: string, value: any) => void`                |
| changeFormFields      | 通过钩子函数动态修改表单配置 | ^[Function]`(callback: (fields: InputFormField[]) => void) => void`    |
| getFormRef            | 获取 Form 实例               | ^[Function]`() => FormInstance \| null`                                |

### InputForm 插槽

| 插槽名       | 说明             | 作用域                                                                                                         |
| ------------ | ---------------- | -------------------------------------------------------------------------------------------------------------- |
| [field.slot] | 自定义表单项内容 | ^[object]`{ field: InputFormField, value: any, formValue: Record<string, any>, formFields: InputFormField[] }` |

## 注意事项

1. 表单字段的 `name` 属性必须唯一
2. 验证规则需要符合 Element Plus Form 的规则格式
3. 自定义表单项需要自行处理数据绑定
4. 动态表单项修改后需要重新验证
5. 建议使用 async/await 处理表单验证
6. `changeFormFields` 回调中直接修改字段属性即可触发更新（Vue 响应式）
7. `getFormRef` 在组件未挂载时返回 `null`
8. `validate` 在组件未挂载时会 reject

## 类型定义

```ts
export type InputFormField = InputFieldProps & {
    /** 查询项的名称，同时也是组件的双向绑定值属性 */
    name: string;
    /** 当前数据字段插槽 */
    slot?: string;
    /** 当前内容是否去除空格，只针对 input 输入框有效 */
    trim?: boolean;
    /** 字段标签 */
    label?: string;
    /** 选项的值 */
    value?: any;
    /** label 宽度 */
    labelWidth?: number;
    /** 表单组件的宽度 */
    inputWidth?: number;
    /** 组件所占的列数 */
    span?: number;
    /** 是否显示 */
    isShow?: boolean;
    /** 表单验证规则 */
    rules?: FormItemRule | FormItemRule[];
    /** Form Item 属性 */
    formItemProps?: Partial<NotReadonly<FormItemProps>>;
};

export type InputFormSlotScope = {
    field: InputFormField;
    value: any;
    formValue: Record<string, any>;
    formFields: InputFormField[];
};

/** 数据输入表单实例 */
export interface InputFormRef {
    /** 获取表单的value */
    getInputValue: () => Record<string, any>;
    /** 设置表单的属性值 */
    setInputPropertyValue: (propertyName: string, value: any) => void;
    /** 修改表单字段属性 */
    changeFormFields: (callback: (formFields: InputFormField[]) => void) => void;
    /** 获取 form Ref（组件未挂载时返回 null） */
    getFormRef: () => FormInstance | null;
    /** 表单验证（组件未挂载时会 reject） */
    validate: (callback?: FormValidateCallback) => FormValidationResult;
}
```
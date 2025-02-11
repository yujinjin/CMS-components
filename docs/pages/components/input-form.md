---
title: InputForm 表单
---

# InputForm 表单

基于 Element Plus 的 Form 组件封装，提供了更便捷的表单操作和数据处理能力。支持动态表单项配置、表单验证、自定义渲染等功能。

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

:::demo 以通过 `fields.span` 属性来定义当前输入表单的栅格占据的列数，默认是`24/columns`。

input-form/layout

:::

## API

### InputForm 属性

| 属性名     | 说明                                                                                                             | 类型                       | 默认值 |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------- | ------ |
| value      | 表单数据默认值                                                                                                   | ^[object]                  | {}     |
| fields     | 表单字段配置数组                                                                                                 | ^[array]`InputFormField[]` | []     |
| is-loading | 当前表单数据加载状态                                                                                             | ^[boolean]                 | false  |
| columns    | 一行表单数                                                                                                       | ^[number]                  | 1      |
| props      | Form 组件属性配置对象，具体参照element-plus对应[form组件](https://cn.element-plus.org/zh-CN/component/form.html) | ^[object]                  | {}     |
| events     | Form组件events对象，具体参照element-plus对应[form组件](https://cn.element-plus.org/zh-CN/component/form.html)    | ^[object]                  | {}     |

### InputFormField 配置

| 属性名           | 说明                                                                                                                           | 类型                                               | 默认值       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- | ------------ |
| name ^(required) | 字段名称                                                                                                                       | ^[string]                                          | -            |
| label            | 字段标签                                                                                                                       | ^[string]                                          | -            |
| trim             | 是否去除空格，只对input类型有效                                                                                                | ^[boolean]                                         | false        |
| data             | 选项数据                                                                                                                       | ^[array]                                           | -            |
| slot             | 自定义插槽名称                                                                                                                 | ^[string]                                          | -            |
| value            | 字段的值                                                                                                                       | ^[string]                                          | -            |
| label-width      | 字段标签的宽度                                                                                                                 | ^[number] / ^[string]                              | 120          |
| input-width      | 字段宽度                                                                                                                       | ^[number]                                          | -            |
| span             | 组件所占的列数                                                                                                                 | ^[number]                                          | `24/columns` |
| is-show          | 是否显示                                                                                                                       | ^[boolean]                                         | true         |
| rules            | 当前字段验证规则                                                                                                               | ^[object]`FormItemRule` / ^[array]`FormItemRule[]` | -            |
| form-item-props  | Form Item 属性，具体参照element-plus对应[Form Item](https://cn.element-plus.org/zh-CN/component/form.html#formitem-attributes) | ^[object]`FormItemRule` / ^[array]`FormItemRule[]` | -            |
| ...              | 其他属性，具体见[input-field文档](./input-field)                                                                               | -                                                  | -            |

### InputForm 事件

| 事件名             | 说明             | 参数                                             |
| ------------------ | ---------------- | ------------------------------------------------ |
| field-value-change | 字段值变化时触发 | ^[Function]`(field: string, value: any) => void` |

### InputForm 方法

| 方法名                | 说明                         | 参数                                                                   |
| --------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| validate              | 表单验证                     | ^[Function]`(callback?: FormValidateCallback) => FormValidationResult` |
| getInputValue         | 获取表单数据                 | ^[Function]`() => object`                                              |
| setInputPropertyValue | 设置表单字段值               | ^[Function]`(propertyName: string, value: any) => void`                |
| changeFormFields      | 通过钩子函数动态修改表单配置 | ^[Function]`(callback: (fields: InputFormField[]) => void) => void`    |
| getFormRef            | 获取 Form 实例               | ^[Function]`() => FormInstance`                                        |

### InputForm 插槽

| 插槽名       | 说明             | 作用域                                                                                                         |
| ------------ | ---------------- | -------------------------------------------------------------------------------------------------------------- |
| [field.slot] | 自定义表单项内容 | ^[object]`{ field: InputFormField, value: any, formValue: Record<string, any>, formFields: InputFormField[] }` |

## 注意事项

1. 表单字段的 name 属性必须唯一
2. 验证规则需要符合 Element Plus Form 的规则格式
3. 自定义表单项需要自行处理数据绑定
4. 动态表单项修改后需要重新验证
5. 建议使用 async/await 处理表单验证

---
title: DialogForm 弹窗表单
---

# DialogForm 弹窗表单

基于 Element Plus 的 Dialog 和 Form 组件封装，提供了便捷的弹窗表单配置和操作。支持表单验证、自定义渲染等功能。

## 基础用法

基础的弹窗表单配置展示。

:::demo 通过 `fields` 定义表单字段配置，`dialog-props` 定义弹窗相关属性。

dialog-form/basic

:::

## 表单内容编辑

:::demo 展示如何加载已有数据并提交更新，支持表单验证和异步提交。

dialog-form/update-data

:::

## 自定义表单验证

:::demo 通过 `inputFormProps.fields.rules` 或 `inputFormProps.rules` 配置验证规则，支持同步和异步验证。

dialog-form/validation

:::

## 自定义按钮

:::demo 通过 `buttons` 属性来自定义底部按钮。

dialog-form/buttons

:::

## 分步表单

:::demo 动态复杂的表单及按钮实现形式

dialog-form/complex

:::

## 动态表单

:::demo 通过插槽内容，实现更复杂的自定义内容和交互逻辑。

dialog-form/custom

:::

## API

### DialogForm 属性

| 属性名           | 说明                                                                                                     | 类型                         | 默认值                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| isShow           | 是否显示弹窗                                                                                             | ^[boolean]                   | false                                                                                                       |
| buttons          | 按钮列表                                                                                                 | ^[array]`DialogFormButton[]` | -                                                                                                           |
| dialog-props     | 弹窗的属性配置，具体见[element-plus dialog文档](https://cn.element-plus.org/zh-CN/component/dialog.html) | ^[object]`DialogProps`       | `{ closeOnClickModal: false, appendToBody: true, destroyOnClose: true, width: "750px", alignCenter: true }` |
| input-form-props | 表单属性配置，具体见[input-form文档](./input-form)                                                       | ^[object]`InputFormProps`    | `{ }`                                                                                                       |

### DialogButton 配置

| 属性名      | 说明                                 | 类型                     | 默认值 |
| ----------- | ------------------------------------ | ------------------------ | ------ |
| handle-code | 按钮操作CODE作为唯一标识             | ^[string]                | -      |
| contents    | 按钮文本                             | ^[string]                | -      |
| slot        | 自定义插槽名称（如有值其他选项无效） | ^[string]                | -      |
| custom-icon | 自定义图标                           | ^[string] / ^[Component] | -      |

| is-show | 是否显示 | ^[boolean] | true |
| click | 按钮点击函数事件，返回false或者异常不会自动关闭弹窗 | ^[Function]`(inputFormValue: Record<string, any>, formRef: FormInstance \| null, button: DialogFormButton) => Promise<void \| boolean> \| void \| boolean` | - |
| ... | 其他属性配置选项，具体见（[element-plus button文档](https://cn.element-plus.org/zh-CN/component/button.html)） | - | - |

### DialogForm 事件

| 事件名             | 说明               | 参数                                                                                                                         |
| ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| field-value-change | 表单数值的变化时间 | ^[Function]`(field: InputFormField, fieldValue: any, formFields: InputFormField[], inputValue: Record<string, any>) => void` |
| close              | 弹窗关闭时触发     | ^[Function]`() => void`                                                                                                      |

### DialogForm 方法

| 方法名                | 说明                         | 参数                                                                         |
| --------------------- | ---------------------------- | ---------------------------------------------------------------------------- |
| getInputValue         | 获取表单的value              | ^[Function]`() => Record<string, any>`                                       |
| setInputPropertyValue | 设置表单的属性值             | ^[Function]`(propertyName: string, value: any) => Record<string, any>`       |
| changeFormFields      | 修改当前form字段的属性       | ^[Function]`(callback: (formFields: InputFormField[]) => void) => void`      |
| changeButtons         | 修改当前生成的button按钮属性 | ^[Function]`(callback: (actionButtons: DialogFormButton[]) => void) => void` |
| validate              | 表单验证                     | ^[Function]`(callback?: FormValidateCallback) => FormValidationResult`       |
| getFormRef            | 获取表单实例                 | ^[Function]`() => FormInstance`                                              |

### DialogForm 插槽

| 插槽名                      | 说明                   | 作用域                                                                                                         |
| --------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| default                     | 默认弹窗body的顶部内容 | -                                                                                                              |
| [inputFormProps.field.slot] | 自定义表单项内容       | ^[object]`{ field: InputFormField, value: any, formValue: Record<string, any>, formFields: InputFormField[] }` |
| [button.slot]               | 自定义按钮内容         | ^[object]`{ button: DialogFormButton }`                                                                        |

## 注意事项

1. 表单字段的 name 属性必须唯一
2. 验证规则需要符合 Element Plus Form 的规则格式
3. 自定义表单项需要自行处理数据绑定
4. 建议使用 async/await 处理表单验证
5. 可以通过自定义底部内容实现更多操作

---
title: SearchField 搜索字段
---

# SearchField 搜索字段

基于 Element Plus 的搜索表单字段组件，支持多种搜索类型，如文本、数字、日期、选择等。

## 基础用法

基础的搜索字段用法，支持常见的搜索类型。

:::demo 默认的搜索字段组件，通过 `type` 属性指定搜索类型，通过 `v-model` 进行双向数据绑定。

search-field/basic

:::

## 支持的类型

:::demo 支持 `input`、`inputNumber`、`select`、`datePicker`、`checkSelect`输入框类型。

search-field/search-type

:::

## 事件监听

:::demo 可以通过设置 `input` 的事件来监听，这里是直接设置事件的也可通过`events`对象传值。

search-field/events

:::

## 自定义内容

可以通过插槽自定义字段的展示内容。

:::demo 可以通过 default slot 插槽自定义内容，但必须设置 `slot` 属性为 `true`，常用于复杂的自定义搜索需求。

search-field/default-slot

:::

## API

### SearchField 属性

| 属性名           | 说明                                                                                           | 类型                                                                           | 默认值  |
| ---------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------- |
| v-model          | 绑定值                                                                                         | ^[any]                                                                         | -       |
| slot             | 是否使用插槽自定义内容                                                                         | ^[boolean] / ^[string]                                                         | false   |
| type             | 搜索类型                                                                                       | ^[enum]`'input' \| 'inputNumber' \| 'select' \| 'checkSelect' \| 'datePicker'` | 'input' |
| data             | 选项数据                                                                                       | ^[array]`Array<Record<string, any>>`                                           | []      |
| option-value-key | data选项值value key属性名                                                                      | ^[string]                                                                      | value   |
| option-label-key | data选项值label key属性名                                                                      | ^[string]                                                                      | label   |
| props            | 组件其它属性对象，具体参照element-plus对应组件的属性文档，也可直接设置组件属性然后透传给组件。 | ^[object]                                                                      | {}      |
| events           | 组件events对象，具体参照element-plus对应组件的事件文档，也可直接设置组件事件然后透传给组件。   | ^[object]                                                                      | {}      |

### SearchField 插槽

| 插槽名  | 说明                             | 作用域 |
| ------- | -------------------------------- | ------ |
| default | 自定义默认内容，必须设置slot属性 | -      |

## 注意事项

1. 不同类型的搜索字段支持的属性可能不同
2. 选项数据的格式需要包含 label 和 value 属性，或通过 optionValueKey、optionLabelKey 来指定
3. 自定义展示时需要自行处理数据绑定
4. 日期类型的值格式需要注意处理
5. 搜索字段会自动触发表单的搜索事件

## 类型定义

```ts
interface SearchFieldProps {
    modelValue?: any;
    type?: string;
    slot?: string | boolean;
    data?: Array<Record<string, any>>;
    optionValueKey?: string;
    optionLabelKey?: string;
    props?: Record<string, any>;
    events?: Record<string, any>;
}
```

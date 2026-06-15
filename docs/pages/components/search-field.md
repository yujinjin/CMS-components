---
title: SearchField 搜索字段
---

# SearchField 搜索字段

基于 Element Plus 的搜索表单字段组件，支持多种搜索类型，如文本、数字、日期、选择等。通常在 `SearchForm` 中使用，也可单独使用。

## 适用场景

- 搜索表单中的搜索条件字段
- 需要多种类型的搜索输入控件
- 需要监听搜索字段值的变化以实现联动搜索

## 核心特性

- 支持 `input`、`inputNumber`、`select`、`checkSelect`、`datePicker` 五种搜索类型
- 支持 `change` 事件监听字段值变化
- 支持 `props` 透传组件属性，`events` 透传组件事件
- 支持默认插槽自定义内容

## 基础用法

基础的搜索字段用法，支持常见的搜索类型。

:::demo 默认的搜索字段组件，通过 `type` 属性指定搜索类型，通过 `v-model` 进行双向数据绑定。

search-field/basic

:::

## 支持的类型

:::demo 支持 `input`、`inputNumber`、`select`、`datePicker`、`checkSelect` 输入框类型。

search-field/search-type

:::

## 事件监听

:::demo 可以通过设置 `input` 的事件来监听，这里是直接设置事件的也可通过 `events` 对象传值。

search-field/events

:::

## 自定义内容

可以通过插槽自定义字段的展示内容。

:::demo 可以通过 default slot 插槽自定义内容，但必须设置 `slot` 属性为 `true`，常用于复杂的自定义搜索需求。

search-field/default-slot

:::

## change 事件

:::demo 通过 `change` 事件监听字段值的变化，与 `input` 原生事件不同，`change` 在每次值更新时触发。

search-field/change-event

:::

## 禁用状态

:::demo 在 `el-form` 中使用时，搜索字段的禁用状态会自动跟随表单的 `disabled` 属性。

search-field/disabled

:::

## API

### SearchField 属性

| 属性名           | 说明                                                                                           | 类型                                                                           | 默认值  |
| ---------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------- |
| v-model          | 绑定值                                                                                         | ^[any]                                                                         | -       |
| slot             | 是否使用插槽自定义内容                                                                         | ^[boolean] / ^[string]                                                         | false   |
| type             | 搜索类型                                                                                       | ^[enum]`'input' \| 'inputNumber' \| 'select' \| 'checkSelect' \| 'datePicker'` | 'input' |
| data             | 选项数据                                                                                       | ^[array]`Array<Record<string, any>>`                                           | []      |
| option-value-key | data 选项值 value key 属性名                                                                  | ^[string]                                                                      | value   |
| option-label-key | data 选项值 label key 属性名                                                                  | ^[string]                                                                      | label   |
| props            | 组件其它属性对象，具体参照 element-plus 对应组件的属性文档，也可直接设置组件属性然后透传给组件。 | ^[object]                                                                      | {}      |
| events           | 组件 events 对象，具体参照 element-plus 对应组件的事件文档，也可直接设置组件事件然后透传给组件。   | ^[object]                                                                      | {}      |

### SearchField 事件

| 事件名            | 说明               | 参数                    |
| ----------------- | ------------------ | ----------------------- |
| update:modelValue | 绑定值变化时触发   | ^[any]`(value: any)`    |
| change            | 字段值变化时触发   | ^[any]`(value: any)`    |

### SearchField 插槽

| 插槽名  | 说明                             | 作用域 |
| ------- | -------------------------------- | ------ |
| default | 自定义默认内容，必须设置 slot 属性 | -      |

## 注意事项

1. 不同类型的搜索字段支持的属性可能不同
2. 选项数据的格式需要包含 label 和 value 属性，或通过 optionValueKey、optionLabelKey 来指定
3. 自定义展示时需要自行处理数据绑定
4. 日期类型的值格式需要注意处理
5. `change` 事件在每次值更新时触发，与 `events` 中设置的原生事件（如 `blur`、`focus`）不同
6. 搜索字段会自动触发表单的搜索事件

## 类型定义

```ts
type FieldType = "input" | "inputNumber" | "select" | "checkSelect" | "datePicker";

export const searchFieldProps = buildProps({
    /** 当前数据字段插槽 */
    slot: {
        type: [String, Boolean]
    },
    /** 组件的类型 */
    type: {
        type: String as PropType<FieldType>,
        default: "input"
    },
    /** 组件的数值 */
    modelValue: {
        type: [String, Number, Object, Boolean, Array] as PropType<any>,
        default: null
    },
    /** 数据（比如：select 的选项值列表） */
    data: {
        type: Array as PropType<Array<Record<string, any>>>,
        default: () => []
    },
    /** data 选项值 value key 属性名 */
    optionValueKey: {
        type: String,
        default: "value"
    },
    /** data 选项值 label key 属性名 */
    optionLabelKey: {
        type: String,
        default: "label"
    },
    /** 组件自定义属性 */
    props: {
        type: Object,
        default: () => ({})
    },
    /** 组件自定义事件 */
    events: {
        type: Object as PropType<Record<string, (...args: any[]) => any>>,
        default: () => ({})
    }
});

export type SearchFieldProps = NotReadonly<ExtractPublicPropTypes<typeof searchFieldProps>>;

export const searchFieldEmits = {
    "update:modelValue": (value: string | number | object | boolean | Array<any>) => true,
    "change": (value: string | number | object | boolean | Array<any>) => true
};

export type SearchFieldEmits = typeof searchFieldEmits;
```
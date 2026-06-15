---
title: InputField 输入字段
---

# InputField 输入字段

基于 Element Plus 的表单输入字段组件，支持多种输入类型，如文本、数字、单选、多选、日期选择等。

## 适用场景

- 表单中需要各种类型的输入控件
- 需要动态切换输入类型
- 需要通过配置化的方式生成表单项
- 需要自定义插槽展示复杂内容

## 核心特性

- 支持 17 种输入类型：input、select、radio、checkbox、selectV2、checkSelect、label、inputNumber、datePicker、timePicker、timeSelect、slider、switch、imgUpload、webEditor、autocomplete、cascader、colorPicker
- 通过 `data` 属性提供选项数据（select、radio、checkbox 等类型）
- 通过 `props` 属性透传组件属性
- 通过 `events` 属性透传组件事件
- 通过 `slot` 属性启用自定义插槽

## 基础用法

基础的输入字段用法，支持常见的输入类型，例如：文本、数字、日期、选择等。

:::demo 默认的输入字段组件，通过 `type` 属性指定输入类型，通过 `v-model` 进行双向数据绑定。

input-field/basic

:::

## 输入框类型

:::demo `password`、`inputNumber`、`textarea`、`password`、`autocomplete`、`webEditor` 等输入框类型。

input-field/input-type

:::

## 选择类型

:::demo 可以通过设置 `data` 的选项值来给 `select`、`radio`、`checkbox`、`checkSelect` 选择类型输入框提供选项值，其默认属性是 `label`、`value`，也可以通过 `optionValueKey`、`optionLabelKey` 来指定。

input-field/select-type

:::

## 日期时间类型

:::demo 日期、时间、日期时间等多种日期选择类型使用 `type="datePicker"`、`type="timePicker"` 等，并通过 field 属性配置日期选择的具体类型和格式。

input-field/date-type

:::

## 其他类型

:::demo `label`、`colorPicker`、`cascader`、`switch` 等其他类型

input-field/other-type

:::

## 滑块类型

:::demo 使用 `type="slider"` 创建滑块输入，通过 `props` 属性配置 min、max、step 等参数。

input-field/slider-type

:::

## 时间选择类型

:::demo 使用 `type="timeSelect"` 创建时间选择器，通过 `props` 属性配置 start、step、end 等参数。

input-field/time-select-type

:::

## 自定义内容

可以通过插槽自定义字段的展示内容。

:::demo 可以通过 default slot 插槽自定义内容，但必须设置 `slot` 属性为 `true`，常用于复杂的自定义展示需求。

input-field/slot-type

:::

## 禁用状态

:::demo 在 `el-form` 中使用时，输入字段的禁用状态会自动跟随表单的 `disabled` 属性。也可通过 `props.disabled` 手动设置。

input-field/disabled

:::

## API

### InputField 属性

| 属性名           | 说明                                                                                                                                                  | 类型                                                                                                                                                                                                                              | 默认值  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| v-model          | 绑定值                                                                                                                                                | ^[any]                                                                                                                                                                                                                            | -       |
| slot             | 是否使用插槽自定义内容                                                                                                                                | ^[boolean] / ^[string]                                                                                                                                                                                                            | false   |
| type             | 输入类型                                                                                                                                              | ^[enum]`'input' \| 'select' \| 'selectV2' \| 'checkSelect' \| 'datePicker' \| 'timePicker' \| 'timeSelect' \| 'label' \| 'inputNumber' \| 'radio' \| 'slider' \| 'switch' \| 'imgUpload' \| 'webEditor' \| 'autocomplete' \| 'cascader' \| 'colorPicker'` | 'input' |
| data             | 选项数据                                                                                                                                              | ^[array]`Array<Record<string, any>>`                                                                                                                                                                                              | []      |
| option-value-key | data 选项值 value key 属性名（type 是 select 时有意义）                                                                                               | ^[string]                                                                                                                                                                                                                         | value   |
| option-label-key | data 选项值 label key 属性名（type 是 select 时有意义）                                                                                               | ^[string]                                                                                                                                                                                                                         | label   |
| props            | 组件其它属性对象，比如：`disabled`，当 `type` 是 `input` 时设置 `maxlength` 属性，也可直接设置组件属性然后透传给组件。具体参照 element-plus 对应组件的属性文档 | ^[object]                                                                                                                                                                                                                         | {}      |
| events           | 组件 events 对象，比如：当 `type` 是 `input` 时设置 `blur` 事件，也可直接设置组件事件然后透传给组件。具体参照 element-plus 对应组件的事件文档           | ^[object]                                                                                                                                                                                                                         | {}      |

### InputField 事件

| 事件名            | 说明               | 参数                                |
| ----------------- | ------------------ | ----------------------------------- |
| update:modelValue | 绑定值变化时触发   | ^[any]`(value: any)`                |

### InputField 插槽

| 插槽名  | 说明                             | 作用域 |
| ------- | -------------------------------- | ------ |
| default | 自定义默认内容，必须设置 slot 属性 | -      |

## 注意事项

1. 不同类型的输入字段支持的属性可能不同
2. 选项数据的格式需要包含 label 和 value 属性，或通过 optionValueKey、optionLabelKey 来指定
3. 自定义展示时需要自行处理数据绑定
4. 日期类型的值格式需要注意处理
5. 在 `el-form` 中使用时，禁用状态会自动联动表单的 `disabled`
6. `modelValue` 默认值为 `null`，避免未绑定值时被 Vue 设置为 `false`

## 类型定义

```ts
type FieldType =
    | "input" | "select" | "selectV2" | "checkSelect"
    | "datePicker" | "timePicker" | "timeSelect"
    | "label" | "inputNumber" | "radio" | "slider" | "switch"
    | "imgUpload" | "webEditor" | "autocomplete" | "cascader" | "colorPicker";

export const inputFieldProps = buildProps({
    /** 是否使用插槽 */
    slot: {
        type: [String, Boolean],
        default: false
    },
    /** 组件的类型 */
    type: {
        type: String as PropType<FieldType>,
        default: "input"
    },
    /** 组件的数值（类型由 type 属性决定） */
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

export type InputFieldProps = NotReadonly<ExtractPublicPropTypes<typeof inputFieldProps>>;
```
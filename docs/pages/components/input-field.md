---
title: InputField 输入字段
---

# InputField 输入字段

基于 Element Plus 的表单输入字段组件，支持多种输入类型,如文本、数字、单选、多选等。

## 基础用法

基础的输入字段用法，支持常见的输入类型，例如：文本、数字、日期、选择等。

:::demo 默认的输入字段组件，通过 `type` 属性指定输入类型，通过 `v-model` 进行双向数据绑定。

input-field/basic

:::

## 输入框类型

:::demo `password`、`inputNumber`、`textarea`、`password`、 `autocomplete`、`webEditor` 等输入框类型。

input-field/input-type

:::

## 选择类型

:::demo 可以通过设置`data`的选项值来给`select`、`radio`、`checkbox`、`checkSelect`选择类型输入框提供选项值，其默认属性是`label`、`value`，也可以通过`optionValueKey`、`optionLabelKey`来指定。

input-field/select-type

:::

## 日期时间类型

:::demo 日期、时间、日期时间等多种日期选择类型使用 `type="datePicker"`、`type="timePicker"`等，并通过 field 属性配置日期选择的具体类型和格式。

input-field/date-type

:::

## 其他一些类型等

:::demo `label`、`colorPicker`、`cascader`、`switch` 等其他一些类型

input-field/other-type

:::

## 自定义内容

可以通过插槽自定义字段的展示内容。

:::demo 可以通过default slot 插槽自定义内容，但必须设置`slot`属性为`true`，常用于复杂的自定义展示需求。

input-field/slot-type

:::

## API

### InputField 属性

| 属性名           | 说明                                                                                                                                                  | 类型                                                                                                                                                                                                                                                                                              | 默认值  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| v-model          | 绑定值                                                                                                                                                | ^[any]                                                                                                                                                                                                                                                                                            | -       |
| slot             | 是否使用插槽自定义内容                                                                                                                                | ^[boolean] / ^[string]                                                                                                                                                                                                                                                                            | false   |
| type             | 输入类型                                                                                                                                              | ^[enum]`'input' \| 'select' \| 'radio' \| 'checkbox' \| 'selectV2' \| 'checkSelect' \| 'label' \| 'inputNumber' \| 'datePicker' \| 'timePicker' \| 'timeSelect' \| 'slider' \| 'switch' \| 'imgUpload' \| 'webEditor' \| 'autocomplete' \| 'cascader' \| 'checkbox' \| 'colorPicker' \| 'upload'` | 'input' |
| data             | 选项数据                                                                                                                                              | ^[array]`Array<Record<string, any>>`                                                                                                                                                                                                                                                              | []      |
| option-value-key | data选项值value key属性名(type是select时有意义)                                                                                                       | ^[string]                                                                                                                                                                                                                                                                                         | value   |
| option-label-key | data选项值label key属性名(type是select时有意义)                                                                                                       | ^[string]                                                                                                                                                                                                                                                                                         | label   |
| props            | 组件其它属性对象，比如：`disabled`,当`type`是`input`时设置`maxlength`属性，也可直接设置组件属性然后透传给组件。具体参照element-plus对应组件的属性文档 | ^[object]                                                                                                                                                                                                                                                                                         | {}      |
| events           | 组件events对象，比如：当`type`是`input`时设置`blur`事件，也可直接设置组件事件然后透传给组件。具体参照element-plus对应组件的事件文档                   | ^[object]                                                                                                                                                                                                                                                                                         | {}      |

### InputField 插槽

| 插槽名  | 说明                             | 作用域 |
| ------- | -------------------------------- | ------ |
| default | 自定义默认内容，必须设置slot属性 | -      |

## 注意事项

1. 不同类型的输入字段支持的属性可能不同
2. 选项数据的格式需要包含 label 和 value 属性，或通过optionValueKey、optionLabelKey来指定
3. 自定义展示时需要自行处理数据绑定
4. 日期类型的值格式需要注意处理

---
title: CheckSelect
---

# CheckSelect 多选下拉框选择器

基于element-plus 扩展的下拉框选择器，是一个多选、可快捷全选、选项有复选框勾选的选择器。适用那些下拉框数据量不大，但需要快捷全选的场景。

## 基础用法

:::demo 适用广泛的基础多选，选项列表传`data`属性，支持`Array<number|string|object>`类型。默认`collapseTags`、`collapseTagsTooltip`、`filterable`选项为`true`。其`multiple`必须为`true`，如果自定义传值为`false`也会自动给覆盖为`true`值。

check-select/basic

:::

## 有禁用选项

:::demo 在`el-option`中，设定`disabled`值为`true`，即可禁用该选项。`data`如果是`Array<object>`类型，会默认取`value`、`label`属性，如果取其他类型的属性可以通过`option-value-key`、`option-label-key`属性指定。

check-select/disabled-option

:::

## CheckSelect API

### CheckSelect 属性

| 属性名           | 说明                                                             | 类型                                                   | 默认值 |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------ | ------ |
| v-model          | 选中项绑定值                                                     | ^[Array<string>] / ^[Array<number>] / ^[Array<object>] | —      |
| data             | 下拉选项数据                                                     | ^[Array<string>] / ^[Array<number>] / ^[Array<object>] | —      |
| option-value-key | 选中项绑定值                                                     | string                                                 | value  |
| option-label-key | 选中项绑定标签                                                   | string                                                 | label  |
| props            | element-plus的 Select 组件属性(具体请去element-plus文档官网查看) | object                                                 | —      |
| events           | element-plus的 Select 组件事件(具体请去element-plus文档官网查看) | object                                                 | —      |

### CheckSelect 事件

| 属性名  | 说明                 | 类型                              |
| ------- | -------------------- | --------------------------------- |
| changel | 选中值发生变化时触发 | ^[Function]`(value: any) => void` |

---
title: CheckSelect
---

# CheckSelect 多选下拉框选择器

基于 Element Plus 的 Select 组件扩展的下拉框选择器，是一个多选、可快捷全选、选项有复选框勾选的选择器。适用于那些下拉框数据量不大，但需要快捷全选的场景。

## 适用场景

- 下拉选项数据量不大（建议不超过 100 条）且需要多选
- 需要快捷全选/取消全选功能
- 需要折叠标签显示已选项
- 需要支持模糊搜索过滤

## 核心特性

- 自动开启多选模式（`multiple` 强制为 `true`）
- 默认开启折叠标签和模糊搜索
- 支持全选/取消全选
- 支持 `Array<string>`、`Array<number>`、`Array<object>` 三种数据类型
- 选项中可设置 `disabled` 禁用

## 基础用法

:::demo 适用广泛的基础多选，选项列表传 `data` 属性，支持 `Array<number|string|object>` 类型。默认 `collapseTags`、`collapseTagsTooltip`、`filterable` 选项为 `true`。其 `multiple` 必须为 `true`，如果自定义传值为 `false` 也会自动给覆盖为 `true` 值。

check-select/basic

:::

## 有禁用选项

:::demo 在 `el-option` 中，设定 `disabled` 值为 `true`，即可禁用该选项。`data` 如果是 `Array<object>` 类型，会默认取 `value`、`label` 属性，如果取其他类型的属性可以通过 `option-value-key`、`option-label-key` 属性指定。

check-select/disabled-option

:::

## 字符串类型数据

:::demo 当 `data` 为 `Array<string>` 类型时，选项的 `label` 和 `value` 都使用字符串本身。

check-select/string-data

:::

## 数字类型数据

:::demo 当 `data` 为 `Array<number>` 类型时，选项的 `label` 和 `value` 都使用数字本身。

check-select/number-data

:::

## change 事件

:::demo 通过 `change` 事件监听选中值的变化。

check-select/change-event

:::

## 空数据

:::demo 当 `data` 为空数组时，下拉框中无选项可展示。

check-select/empty-data

:::

## CheckSelect API

### CheckSelect 属性

| 属性名           | 说明                                                             | 类型                                                   | 默认值 |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------ | ------ |
| v-model          | 选中项绑定值                                                     | ^[Array<string>] / ^[Array<number>] / ^[Array<object>] | —      |
| data             | 下拉选项数据                                                     | ^[Array<string>] / ^[Array<number>] / ^[Array<object>] | —      |
| option-value-key | 选项值 value key 属性名（data 为 object 类型时生效）             | ^[string]                                              | value  |
| option-label-key | 选项标签 label key 属性名（data 为 object 类型时生效）           | ^[string]                                              | label  |
| props            | element-plus 的 Select 组件属性(具体请去 element-plus 文档官网查看) | ^[object]                                              | —      |
| events           | element-plus 的 Select 组件事件(具体请去 element-plus 文档官网查看) | ^[object]                                              | —      |

### CheckSelect 事件

| 事件名 | 说明                 | 类型                                                        |
| ------ | -------------------- | ----------------------------------------------------------- |
| change | 选中值发生变化时触发 | ^[Function]`(value: Array<object \| string \| number>) => void` |

## 注意事项

1. `multiple` 属性强制为 `true`，即使手动设置为 `false` 也会被覆盖
2. 默认开启 `collapseTags`、`collapseTagsTooltip`、`filterable`，可通过 `props` 属性覆盖
3. `data` 为 `Array<string>` 或 `Array<number>` 时，选项的 label 和 value 使用元素本身
4. `data` 为 `Array<object>` 时，通过 `option-value-key` 和 `option-label-key` 指定取值字段
5. 选项中设置 `disabled: true` 可禁用该选项

## 类型定义

```ts
export const checkSelectProps = buildProps({
    /** 下拉选项数据 */
    data: {
        type: Array as PropType<Array<Record<string, any> | string | number>>,
        required: true
    },
    /** 选项值 value key 属性名 */
    optionValueKey: {
        type: String,
        default: "value"
    },
    /** 选项标签 label key 属性名 */
    optionLabelKey: {
        type: String,
        default: "label"
    },
    /** element-plus 的 Select 组件属性 */
    props: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    /** element-plus 的 Select 组件事件 */
    events: {
        type: Object as PropType<Record<string, (...args: any[]) => any>>,
        default: () => ({})
    }
});

export type CheckSelectProps = NotReadonly<ExtractPublicPropTypes<typeof checkSelectProps>>;

export const checkSelectEmits = {
    /** 选中值发生变化时触发 */
    change: (value: Array<object | string | number>) => Array.isArray(value)
};

export type CheckSelectEmits = typeof checkSelectEmits;
```
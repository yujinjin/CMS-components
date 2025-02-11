---
title: ActionBar 操作栏
---

# ActionBar 操作栏

页面操作按钮栏，配置操作按钮列表实现新增、删除、导出等功能，并做了防重复提交操作。该组件通常会与`DataTable`组合使用。

## 基础用法

:::demo 通过 `buttons` 属性配置操作按钮列表。

action-bar/basic

:::

## 自定义图标及布局

:::demo 通过设置 `align` 属性来设置按钮的位置，通过 `buttons` 的 `customIcon`、`icon` 属性来自定义图标

action-bar/customer-icon

:::

## 复杂的自定义布局

:::demo 支持通过插槽自定义按钮内容，使用具名插槽自定义按钮内容，插槽名为`buttons` 的 `slot`属性。

action-bar/customer-layout

:::

## API

### ActionBar 属性

| 属性名      | 说明                                  | 类型                      | 默认值                                |
| ----------- | ------------------------------------- | ------------------------- | ------------------------------------- |
| buttons     | 按钮列表                              | ^[object]`ActionButton[]` | []                                    |
| select-rows | 当前选中的行数据列表                  | ^[boolean]                | false                                 |
| align       | 按钮默认位置,该位置会影响默认插槽内容 | ^[string]                 | ^[enum]`'center' \| 'left' \| 'right` |

### Button(ActionButton) 配置

| 属性名      | 说明                                                                                                           | 类型                                                                                 | 默认值 |
| ----------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------ |
| handle-code | 按钮操作CODE作为唯一标识                                                                                       | ^[string]                                                                            | -      |
| contents    | 按钮文本                                                                                                       | ^[string]                                                                            | -      |
| slot        | 自定义插槽名称（如有值其他选项无效）                                                                           | ^[string]                                                                            | -      |
| custom-icon | 自定义图标                                                                                                     | ^[string] / ^[Component]                                                             | -      |
| is-show     | 是否显示                                                                                                       | ^[boolean]                                                                           | true   |
| click       | 按钮点击事件                                                                                                   | ^[Function]`(selectRows: Array<any>, button: ActionButton) => Promise<void> \| void` | -      |
| ...         | 其他属性配置选项，具体见（[element-plus button文档](https://cn.element-plus.org/zh-CN/component/button.html)） | -                                                                                    | -      |

### ActionBar 插槽

| 插槽名        | 说明                                            | 作用域                              |
| ------------- | ----------------------------------------------- | ----------------------------------- |
| default       | 自定义额外的按钮内容                            | -                                   |
| [button.slot] | 自定义指定按钮的内容，插槽名为按钮的 `slot`属性 | ^[object]`{ button: ActionButton }` |

## 注意事项

1. 按钮权限控制需要配合权限管理系统使用
2. 自定义按钮插槽的优先级高于按钮配置
3. 建议不要配置过多的按钮，影响用户体验
4. 图标使用 Element Plus 的图标组件

## 类型定义

```ts
export type ActionButton = NotReadonly<Partial<ButtonProps>> & {
    /** 当前按钮操作CODE */
    handleCode?: string;

    /** 按钮文案内容 */
    contents?: string;

    /** 自定义插槽名称（如有值其他选项无效） */
    slot?: string;

    /** 自定义图标 */
    customIcon?: string | Component;

    /** 按钮是否正在加载 */
    // isLoading?: boolean;

    /** 是否显示(通过当前固定展示数目来判断是否展示) */
    isShow?: boolean;

    /** 按钮点击函数事件 */
    click?: (selectRows: Array<any>, button: ActionButton) => Promise<void> | void;
};
```

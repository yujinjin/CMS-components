---
title: ActionBar 操作栏
---

# ActionBar 操作栏

页面操作按钮栏，配置操作按钮列表实现新增、删除、导出等功能，并做了防重复提交操作。该组件通常会与 `DataTable` 组合使用。

## 适用场景

- 数据列表页面的操作按钮栏（新增、删除、导出等）
- 需要根据选中行状态控制按钮可用性
- 需要动态修改按钮列表
- 需要自定义按钮图标和布局

## 核心特性

- 通过 `buttons` 属性配置按钮列表
- 通过 `selectRows` 联动选中行数据
- 通过 `changeButtons` 方法动态修改按钮
- 支持自定义图标和插槽
- 支持 `align` 属性控制按钮对齐方式
- 内置防重复提交机制（按钮点击时自动显示 loading）

## 基础用法

:::demo 通过 `buttons` 属性配置操作按钮列表。

action-bar/basic

:::

## 自定义图标及布局

:::demo 通过设置 `align` 属性来设置按钮的位置，通过 `buttons` 的 `customIcon`、`icon` 属性来自定义图标

action-bar/customer-icon

:::

## 复杂的自定义布局

:::demo 支持通过插槽自定义按钮内容，使用具名插槽自定义按钮内容，插槽名为 `buttons` 的 `slot`属性。

action-bar/customer-layout

:::

## 选中行联动

:::demo 通过 `selectRows` 属性联动表格选中行数据，在按钮的 `click` 事件中可获取选中行。选中行为空时可在 click 函数中校验并提示。

action-bar/select-rows

:::

## 动态修改按钮

:::demo 通过 `changeButtons` 方法动态添加、删除或修改按钮属性。

action-bar/change-buttons

:::

## API

### ActionBar 属性

| 属性名      | 说明                                  | 类型                        | 默认值                                |
| ----------- | ------------------------------------- | --------------------------- | ------------------------------------- |
| buttons     | 按钮列表                              | ^[array]`ActionButton[]`    | []                                    |
| select-rows | 当前选中的行数据列表                  | ^[array]                    | []                                    |
| align       | 按钮默认位置,该位置会影响默认插槽内容 | ^[string]                   | ^[enum]`'center' \| 'left' \| 'right` |

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

### ActionBar 事件

| 事件名 | 说明 | 参数 |
| ------ | ---- | ---- |
| -      | ActionBar 不直接触发事件，按钮事件通过 `buttons.click` 配置 | - |

### ActionBar 方法

| 名称           | 说明                       | 类型                                                              |
| -------------- | -------------------------- | ----------------------------------------------------------------- |
| changeButtons  | 修改当前生成的按钮属性     | ^[Function]`(callback: (actionButtons: ActionButton[]) => void) => void` |

### ActionBar 插槽

| 插槽名        | 说明                                            | 作用域                              |
| ------------- | ----------------------------------------------- | ----------------------------------- |
| default       | 自定义额外的按钮内容                            | -                                   |
| [button.slot] | 自定义指定按钮的内容，插槽名为按钮的 `slot`属性 | ^[object]`{ button: ActionButton }` |

## 注意事项

1. 按钮点击时会自动显示 loading 状态（防重复提交），click 函数返回的 Promise 完成后 loading 自动消失
2. 自定义按钮插槽的优先级高于按钮配置
3. 建议不要配置过多的按钮，影响用户体验
4. 图标使用 Element Plus 的图标组件
5. `changeButtons` 回调函数中直接修改数组元素即可触发更新

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

    /** 是否显示(通过当前固定展示数目来判断是否展示) */
    isShow?: boolean;

    /** 按钮点击函数事件 */
    click?: (selectRows: Array<any>, button: ActionButton) => Promise<void> | void;
};

export type ActionButtonSlotScope = {
    button: ActionButton;
};

/** 列表操作栏实例 */
export interface ActionBarRef {
    /** 修改当前生成的button按钮值 */
    changeButtons: (callback: (actionButtons: ActionButton[]) => void) => void;
}
```
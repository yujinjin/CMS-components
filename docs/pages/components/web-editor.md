---
title: WebEditor 富文本编辑器
---

# WebEditor 富文本编辑器

基于 `Quill` 的富文本编辑器组件，提供所见即所得的内容编辑功能。支持文本格式化、图片上传、自定义工具栏等特性。

## 适用场景

- 需要在 Web 应用中提供富文本内容编辑功能
- 需要自定义工具栏按钮配置
- 需要在表单中使用且联动表单禁用状态
- 需要支持图片上传并自定义上传逻辑

## 核心特性

- 基于 Quill 引擎，支持常用的文本编辑功能（加粗、斜体、列表、链接等）
- 支持 `v-model` 双向数据绑定
- 支持 `disabled` 禁用/只读模式，与 `el-form` 禁用联动
- 支持 `onImgUpload` 自定义图片上传逻辑
- 支持 `toolbar` 自定义工具栏配置
- 支持默认插槽自定义额外功能区域

## 基础用法

基础的富文本编辑器用法，支持常用的文本编辑功能。

:::demo 默认的富文本编辑器组件，样式可直接定义到组件上。通过 `v-model` 进行双向数据绑定。

web-editor/basic

:::

## 只读模式

当需要展示富文本内容但不需要编辑时，可以使用只读模式。

:::demo 使用 `disabled` 属性来定义富文本编辑器是否被禁用。禁用后编辑器将变为只读状态，无法进行内容编辑。

web-editor/disabled

:::

## 图片上传

支持图片上传功能，可自定义上传接口和处理逻辑。

:::demo 使用 `onImgUpload` 钩子函数来实现自定义图片 HTTP 上传，返回图片的路径。支持同步或异步返回图片 URL。

web-editor/img-upload

:::

## 自定义内容

可以通过 default slot 插槽自定义编辑器的额外功能区域，常用于添加字数统计、额外按钮等功能。

:::demo 右下角添加一个全屏的图标

web-editor/default-slot

:::

## 自定义工具栏

可以通过 `toolbar` 属性自定义工具栏按钮配置，支持传入数组或对象。

:::demo 通过 `toolbar` 属性传入数组配置，仅保留需要的工具栏按钮。

web-editor/toolbar

:::

## 表单禁用联动

当在 `el-form` 中使用时，编辑器的禁用状态会自动跟随表单的 `disabled` 属性。

:::demo 当表单整体禁用时，编辑器也会自动变为只读模式。可通过 `disabled` 属性手动覆盖。

web-editor/form-disabled

:::

## API

### WebEditor 属性

| 属性名        | 说明                                     | 类型                                                  | 默认值 |
| ------------- | ---------------------------------------- | ----------------------------------------------------- | ------ |
| v-model       | 编辑器内容，可使用 v-model 双向绑定      | ^[string]                                             | -      |
| disabled      | 是否禁用编辑器，禁用后将变为只读模式     | ^[boolean]                                            | null   |
| toolbar       | 自定义工具栏配置，不传则使用默认配置     | ^[string] / ^[Array] / ^[object]                     | -      |
| on-img-upload | 图片上传处理函数，用于自定义图片上传逻辑 | ^[Function]`(file: any) => Promise<string> \| string` | -      |

### WebEditor 事件

| 事件名             | 说明               | 参数                    |
| ------------------ | ------------------ | ----------------------- |
| update:modelValue  | 编辑器内容变化时触发 | ^[string]`(value: string)` |

### WebEditor 插槽

| 插槽名  | 说明                                                           |
| ------- | -------------------------------------------------------------- |
| default | 自定义默认内容，可通过它来自定义实现显示统计字数或其他相关功能 |

## 注意事项

1. `disabled` 默认值为 `null`，在 `el-form` 中会自动联动表单的禁用状态
2. Quill 在 SSR（Node.js）环境中无法直接使用，项目通过 `web-editor-async.vue` 异步导入方案解决
3. `toolbar` 属性为 Quill 的 toolbar 配置，具体可参考 [Quill Toolbar 文档](https://quilljs.com/docs/modules/toolbar/)
4. `onImgUpload` 返回图片 URL（同步或异步均可），返回后编辑器会自动插入图片
5. 建议在使用时设置 `min-height` 和 `max-height` 样式以控制编辑器高度

## 类型定义

```ts
export type OnImgUploadFunction = (file: any) => Promise<string> | string;

export const webEditorProps = buildProps({
    /** 编辑器内容 */
    modelValue: String,
    /** 是否禁用编辑器（默认 null 会跟随 el-form 禁用状态） */
    disabled: {
        type: Boolean,
        default: null
    },
    /** 图片上传处理函数 */
    onImgUpload: {
        type: Function as PropType<OnImgUploadFunction>
    },
    /** 自定义工具栏配置，不传则使用默认配置 */
    toolbar: {
        type: [String, Array, Object] as PropType<string | Record<string, any> | any[]>
    }
});

export type WebEditorProps = NotReadonly<ExtractPublicPropTypes<typeof webEditorProps>>;
```
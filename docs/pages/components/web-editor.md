---
title: WebEditor 富文本编辑器
---

# WebEditor 富文本编辑器

基于 `Quill` 的富文本编辑器组件，提供所见即所得的内容编辑功能。

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

:::demo 使用 `onImgUpload` 钩子函数来实现自定义图片http上传，返回图片的路径。支持同步或异步返回图片URL。

web-editor/img-upload

:::

## 自定义内容

可以通过default slot 插槽自定义编辑器的额外功能区域，常用于添加字数统计、额外按钮等功能。

:::demo 右下角添加一个全屏的图标

web-editor/default-slot

:::

## API

### WebEditor 属性

| 属性名        | 说明                                     | 类型                                                  | 默认值 |
| ------------- | ---------------------------------------- | ----------------------------------------------------- | ------ |
| v-model       | 编辑器内容，可使用 v-model 双向绑定      | ^[string]                                             | -      |
| disabled      | 是否禁用编辑器，禁用后将变为只读模式     | ^[boolean]                                            | false  |
| on-img-upload | 图片上传处理函数，用于自定义图片上传逻辑 | ^[Function]`(file: any) => Promise<string> \| string` | -      |

### WebEditor 插槽

| 插槽名  | 说明                                                           |
| ------- | -------------------------------------------------------------- |
| default | 自定义默认内容，可通过它来自定义实现显示统计字数或其他相关功能 |

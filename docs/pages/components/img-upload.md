---
title: ImgUpload 图片上传
---

# ImgUpload 图片上传

提供了灵活且功能丰富的图片上传解决方案，支持单图/多图上传、裁剪、限制图片上传尺寸等特性。

## 适用场景

- 需要在表单中上传图片（头像、证件照等）
- 需要上传前裁剪图片
- 需要限制图片上传尺寸
- 需要拖拽上传图片
- 需要在表单禁用时联动禁用上传

## 核心特性

- 支持单图上传（`limit=1` 时 `v-model` 为字符串）和多图上传（`v-model` 为字符串或数组）
- 支持图片裁剪（基于 cropperjs）
- 支持拖拽上传
- 支持自定义上传接口
- 支持限制图片大小
- 支持 `el-form` 禁用联动

## 基础用法

:::demo 最简单的用法，用户可以点击上传按钮选择图片

img-upload/basic

:::

## 图片裁剪

:::demo 使用 `cropperProps` 属性来支持上传前对图片进行裁剪。注意：如果当前图片有设置裁剪功能每次上传的图片不支持多选文件，也就是说 `multiple` 会被强制设置为 `false `

img-upload/cropper

:::

## 拖拽上传

:::demo 设置 `uploadProps` 的属性来实现拖拽上传

img-upload/drag

:::

## 单图上传

:::demo 通过 `uploadProps.limit` 设置为 1 时为单图上传模式，`v-model` 绑定的值为图片 URL 字符串。

img-upload/single-upload

:::

## 限制上传大小

:::demo 通过 `max-size` 属性限制上传图片的大小（单位 KB），超出限制时会提示错误。

img-upload/max-size

:::

## 禁用状态

:::demo 通过 `uploadProps.disabled` 设置禁用状态。在 `el-form` 中使用时会自动联动表单禁用。

img-upload/disabled

:::

## API

### ImgUpload 属性

| 属性名                     | 说明                                                                                                                              | 类型                                                   | 默认值 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------ |
| v-model                    | 已上传的图片 URL（limit=1 时为字符串，否则为用 separator 分隔的字符串或字符串数组）                                               | ^[string] / ^[Array<string>]                          | -      |
| separator                  | 分隔符，v-model 为多图路径用分隔符隔开的字符串时使用                                                                               | ^[string]                                              | "\|"   |
| max-size                   | 上传图片的限制大小（KB）                                                                                                          | ^[number]                                              | 2048   |
| upload-request ^(required) | 上传图片的接口回调函数                                                                                                            | ^[Function]`(file: File) => Promise<string> \| string` | -      |
| upload-props               | 上传属性配置选项，具体见（[element-plus upload文档](https://cn.element-plus.org/zh-CN/component/upload.html#%E5%B1%9E%E6%80%A7)） | ^[UploadProps]                                         | -      |
| cropper-props              | 图片裁剪的配置选项，具体见（[cropperjs文档](https://github.com/fengyuanchen/cropperjs)）                                          | ^[object] / ^[boolean]                                 | false  |

### ImgUpload 插槽

| 插槽名  | 说明                   | 作用域 |
| ------- | ---------------------- | ------ |
| default | 自定义上传按钮默认内容 | -      |

## 注意事项

1. 当 `uploadProps.limit` 为 1 时，`v-model` 绑定字符串类型的图片 URL；大于 1 时，`v-model` 可以是分隔符连接的字符串或字符串数组
2. 启用裁剪功能后，`multiple` 会被强制设为 `false`，即每次只能上传一张图片
3. `uploadProps.disabled` 设为 `true` 时禁用上传；在 `el-form` 中且 `disabled` 未显式设置时，会跟随表单禁用状态
4. `max-size` 超出限制时会弹出错误提示，裁剪后的图片也会进行大小校验
5. 上传成功后组件会自动验证当前 `el-form-item`（触发 `change` 校验）

## 类型定义

```ts
export const imgUploadProps = buildProps({
    /** 上传属性配置选项 */
    uploadProps: {
        type: Object as PropType<Partial<UploadProps>>
    },
    /** 图片裁剪的配置选项，如果需要裁剪一次只能上传一张图片 */
    cropperProps: {
        type: [Boolean, Object] as PropType<boolean | Cropper.Options>,
        default: false
    },
    /** 上传图片的最大尺寸（单位KB） */
    maxSize: {
        type: Number,
        default: 2048
    },
    /** 分隔符，modelValue 可能是多个图片的路径用分隔符隔开的字符串 */
    separator: {
        type: String,
        default: "|"
    },
    /** 上传图片的接口回调函数（必传） */
    uploadRequest: {
        type: Function as PropType<(file: File) => Promise<string> | string>,
        required: true
    }
});

export type ImgUploadProps = NotReadonly<ExtractPublicPropTypes<typeof imgUploadProps>>;
```
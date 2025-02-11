---
title: ImgUpload 图片上传
---

# ImgUpload 图片上传

提供了灵活且功能丰富的图片上传解决方案，支持单图/多图上传、裁剪、限制图片上传尺寸特性。

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

## API

### ImgUpload 属性

| 属性名                     | 说明                                                                                                                              | 类型                                                   | 默认值 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------ |
| v-model                    | 已上传的文件列表                                                                                                                  | ^[string] / ^[array]                                   | -      |
| separator                  | 分隔符，modelValue可能是多个图片的路径用"\|"隔开的字符串                                                                          | ^[string]                                              | ['\|'] |
| max-size                   | 上传图片的限制大小（KB）                                                                                                          | ^[number]                                              | 2048   |
| upload-request ^(required) | 上传图片的接口回调函数                                                                                                            | ^[Function]`(file: File) => Promise<string> \| string` | -      |
| upload-props               | 上传属性配置选项，具体见（[element-plus upload文档](https://cn.element-plus.org/zh-CN/component/upload.html#%E5%B1%9E%E6%80%A7)） | ^[UploadProps]                                         | -      |
| cropper-props              | 图片裁剪的配置选项，具体见（[cropperjs文档](https://github.com/fengyuanchen/cropperjs)）                                          | ^[object] / ^[boolean]                                 | false  |

### ImgUpload 插槽

| 插槽名  | 说明           | 作用域 |
| ------- | -------------- | ------ |
| default | 自定义默认内容 | -      |

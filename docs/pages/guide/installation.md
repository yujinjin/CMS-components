---
title: 安装
---

# 安装

## 使用包管理器

我们建议您使用包管理器（如 NPM、[Yarn](https://classic.yarnpkg.com/lang/en/), [pnpm](https://pnpm.io/)）安装 cms-components，然后您就可以使用打包工具，例如 Vite 或 webpack。

### NPM

```shell
$ npm install @yujinjin/cms-components --save
```

### yarn

```shell
$ yarn add @yujinjin/cms-components
```

### pnpm

```shell
$ pnpm install @yujinjin/cms-components
```

## 浏览器直接引入

直接通过浏览器的 HTML 标签导入 cms-components，然后就可以使用了。

### unpkg

```html
<head>
    <!-- Import style -->
    <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
    <link rel="stylesheet" href="//unpkg.com/@yujinjin/cms-components/dist/index.css" />
    <!-- Import Vue 3 -->
    <script src="//unpkg.com/vue@3"></script>
    <!-- Import component library -->
    <script src="//unpkg.com/element-plus"></script>
    <!-- Import component library -->
    <script src="//unpkg.com/@yujinjin/cms-components"></script>
</head>
```

### jsDelivr

```html
<head>
    <!-- Import style -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/element-plus/dist/index.css" />
    <link rel="stylesheet" href="//cdn.jsdelivr.net/@yujinjin/cms-components/dist/index.css" />

    <!-- Import Vue 3 -->
    <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
    <!-- Import component library -->
    <script src="//cdn.jsdelivr.net/npm/element-plus"></script>
    <script src="//cdn.jsdelivr.net/npm/@yujinjin/cms-components"></script>
</head>
```

如果是通过包管理器安装，并希望配合打包工具使用，请阅读[下一节](/guide/quickstart)：快速开始。

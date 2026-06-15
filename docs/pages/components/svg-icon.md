---
title: SvgIcon
---

# SvgIcon 图标

常用的 SVG 文件图标组件，支持通过 SVG 雪碧图名称或 Vue 组件两种方式渲染图标。

## 适用场景

- 需要在项目中统一管理和使用 SVG 图标
- 需要动态调整图标大小和颜色
- 需要减少 HTTP 请求，优化页面加载性能（SVG 雪碧图方案）
- 需要更灵活的图标渲染方式（支持传入 Vue 组件）

## 核心特性

- 支持 `value` 属性传入 SVG 文件名或 Vue 组件
- 支持 `size` 属性调整图标大小（数字或字符串）
- 支持 `color` 属性自定义图标颜色
- 支持默认插槽自定义内容

## 使用方式

- 在使用它之前，需要在项目中安装支持引入 svg 文件处理的 loader 插件，例如：vite-svg-loader 依赖包，通过`value`属性传入图标组件。

## 项目配置

- 这里的给出了3种方案：
    1. 基于`vite`的使用`vite-svg-loader`插件，直接导入 svg 文件作为图标组件引用。
    2. 基于`vite`的使用`vite-plugin-svg-sprite`插件，将 svg 文件名作为图标的名称使用。
    3. 基于`webpack`的使用`svg-sprite-loader`插件，将 svg 文件名作为图标的名称使用。
       说明：第二种和第三种方案类似，他们都将 SVG 图片拼接成 SVG Sprites(SVG雪碧图)，放到页面中，其它地方通过 use 复用。其工作原理是利用 svg 的 symbol 元素，将每个 icon 包括在 symbol 中，通过 use 元素使用该 symbol 。这样可以减少 HTTP 请求，提高页面加载速度。

- 你可以根据项目实际情况选择或者选择其他的方案。

### 使用vite-svg-loader插件

#### 安装依赖包

```shell
# 选择一个你喜欢的包管理器

# NPM
$ npm install vite-svg-loader

# Yarn
$ yarn add vite-svg-loader

# pnpm
$ pnpm install vite-svg-loader
```

#### 配置vite.config.ts

```ts
// vite.config.ts
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

export default defineConfig({
    // ...
    plugins: [
        // ...
        svgLoader({
            defaultImport: "component"
        })
    ]
    // ...
});
```

#### 引入svg文件作为组件

当使用 `vite-svg-loader` 插件时，`value` 属性可以传入 Vue 组件：

```vue
<template>
    <!-- 通过 value 属性传入 SVG 组件 -->
    <svg-icon :value="IconExitFullScreen" :size="24" color="#409EFF" />
</template>
<script setup lang="ts">
import IconExitFullScreen from "@/assets/icons/exit-full-screen.svg";
</script>
```

```ts
// icon-svg.ts
import IconExitFullScreen from "@/assets/icons/exit-full-screen.svg";
import IconFold from "@/assets/icons/fold.svg";
import IconWarningSign from "@/assets/icons/warning-sign.svg";
import IconVueLogo from "@/assets/icons/vue-logo.svg";
import IconFullScreen from "@/assets/icons/full-screen.svg";

export { IconExitFullScreen, IconFold, IconWarningSign, IconVueLogo, IconFullScreen };
```

### 使用vite-plugin-svg-sprite插件

#### 安装依赖包

```shell
# 选择一个你喜欢的包管理器

# NPM
$ npm install vite-plugin-svg-sprite

# Yarn
$ yarn add vite-plugin-svg-sprite

# pnpm
$ pnpm install vite-plugin-svg-sprite
```

#### 配置vite.config.ts

```ts
// vite.config.ts
import { defineConfig } from "vite";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

export default defineConfig({
    // ...
    plugins: [
        // ...
        createSvgSpritePlugin({
            symbolId: "icon-[name]"
        })
    ]
    // ...
});
```

#### 引入所有的svg文件

- 从指定目录引入所有的svg文件

```ts
// main.ts

// 加载svg目录下的所有svg文件
const svgs = import.meta.glob("./svgs/*.svg");

// 遍历所有svg文件，加载所有的svg文件
Object.keys(svgs).forEach(async key => {
    await svgs[key]();
});
```

### 使用svg-sprite-loader插件

#### 安装依赖包

```shell
# 选择一个你喜欢的包管理器

# NPM
$ npm install svg-sprite-loader

# Yarn
$ yarn add svg-sprite-loader

# pnpm
$ pnpm install svg-sprite-loader
```

#### 配置webpack.config.js

```js
// webpack.config.js
export default {
    // ...
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: "svg-sprite-loader",
                include: [resolve("src/icons")],
                options: {
                    symbolId: "icon-[name]"
                }
            }
        ]
    }
    // ...
};
```

```js
// vue.config.js
export default {
    // ...
    chainWebpack: config => {
        // ...
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({ symbolId: "icon-[name]" })
            .end();
        // ...
    }
    // ...
};
```

#### 引入所有的svg文件

- 从指定目录引入所有的svg文件

```ts
// index.ts

// 加载svg目录下的所有svg文件
const svgs = require.context("./svg", true, /\.svg$/);

// 遍历所有svg文件，加载所有的svg文件
svgs.keys().map(svgs);
```

## 基础用法

:::demo 使用 vite-plugin-svg-sprite 插件，指定引入 svg 文件，在组件中直接指定 `value` 属性为 svg 文件名即可使用。

svg-icon/basic(svg-icon/svgs/exit-full-screen.svg|svg-icon/svgs/fold.svg|svg-icon/svgs/full-screen.svg)[hide-playground]

:::

## 目录导入所有svg文件

:::demo 该示例是基于 vite 的，从指定目录引入所有的 svg 文件。

svg-icon/all[hide-playground]

:::

## 自定义大小和颜色

:::demo 通过 `size` 属性设置图标大小（支持数字和字符串），通过 `color` 属性设置图标颜色。

svg-icon/size-color(svg-icon/svgs/exit-full-screen.svg|svg-icon/svgs/fold.svg|svg-icon/svgs/full-screen.svg)[hide-playground]

:::

## 空值与边界情况

:::demo 当 `value` 为空字符串或不匹配的 SVG 名称时，组件不会渲染图标内容。

svg-icon/empty-value(svg-icon/svgs/exit-full-screen.svg|svg-icon/svgs/fold.svg|svg-icon/svgs/full-screen.svg)[hide-playground]

:::

## SvgIcon API

### SvgIcon 属性

| 属性名 | 说明                             | 类型                     | 默认值 |
| ------ | -------------------------------- | ------------------------ | ------ |
| value  | svg 文件名或 Vue 组件            | ^[string] / ^[Component] | ""     |
| size   | 图标大小（数字为 px，字符串可带单位） | ^[string] / ^[number]    | ""     |
| color  | 图标颜色                         | ^[string]                | ""     |

### SvgIcon 插槽

| 插槽名  | 说明           | 作用域 |
| ------- | -------------- | ------ |
| default | 自定义默认内容 | -      |

## 注意事项

1. 使用 `vite-svg-loader` 方案时，`value` 属性传入 Vue 组件，适合需要动态渲染的场景
2. 使用 `vite-plugin-svg-sprite` 方案时，`value` 属性传入 SVG 文件名，适合图标数量较多、需要批量管理的场景
3. `size` 属性为数字时单位为 px，为字符串时可指定任意 CSS 单位（如 `"2em"`、`"32px"`）
4. `color` 属性仅对 SVG 雪碧图方案有效，对 Vue 组件类型的图标需要在 SVG 源文件中处理颜色
5. 当 `value` 为空字符串或未匹配的名称时，组件不会渲染任何内容

## 类型定义

```ts
export const svgIconProps = buildProps({
    /** svg 的 link 名称或 Vue 组件 */
    value: {
        type: [String, Object] as PropType<string | Component>,
        default: ""
    },
    /** 图标颜色 */
    color: {
        type: String,
        default: ""
    },
    /** 图标大小（数字为 px，字符串可带 CSS 单位） */
    size: {
        type: [String, Number] as PropType<string | number>,
        default: ""
    }
});

export type SvgIconProps = NotReadonly<ExtractPublicPropTypes<typeof svgIconProps>>;
```
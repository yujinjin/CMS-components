---
title: SvgIcon
---

# SvgIcon 图标

常用的SVG文件图标

## 使用方式

- 在使用它之前，需要在项目中安装支持引入svg文件处理的loader插件，例如：vite-svg-loader依赖包，通过`value`属性传入图标组件。

## 项目配置

- 这里的给出了3种方案：
    1. 基于`vite`的使用`vite-svg-loader`插件，直接导入svg文件作为图标组件引用。
    2. 基于`vite`的使用`vite-plugin-svg-sprite`插件，将svg文件名作为图标的名称使用。
    3. 基于`webpack`的使用`svg-sprite-loader`插件，将svg文件名作为图标的名称使用。
       说明：第二种和第三种方案类似，他们都将 SVG 图片拼接成 SVG Sprites(SVG雪碧图)，放到页面中，其它地方通过 use 复用。其工作原理是利用 svg 的 symbol 元素，将每个 icon 包括在 symbol 中，通过 use 元素使用该 symbol 。这样可以减少 HTTP 请求，提高页面加载速度。

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

:::demo 使用vite-plugin-svg-sprite插件，指定引入svg文件，在组件中直接指定`value`属性为svg文件名即可使用。

svg-icon/basic(svg-icon/svgs/exit-full-screen.svg|svg-icon/svgs/fold.svg|svg-icon/svgs/full-screen.svg)[hide-playground]

:::

## 目录导入所有svg文件

:::demo 该示例是基于vite的，从指定目录引入所有的svg文件。

svg-icon/all[hide-playground]

:::

## SvgIcon API

### SvgIcon 属性

| 属性名 | 说明              | 类型                     | 默认值 |
| ------ | ----------------- | ------------------------ | ------ |
| value  | svg文件名/svg组件 | ^[string] / ^[Component] | -      |
| size   | 图标大小          | ^[string] / ^[number]    | -      |
| color  | 图标颜色          | ^[string]                | -      |

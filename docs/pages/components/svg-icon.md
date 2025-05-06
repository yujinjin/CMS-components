---
title: SvgIcon
---

# SvgIcon 图标

常用的SVG文件图标

## 使用方式

-   在使用它之前，需要在项目中安装支持引入svg文件处理的loader插件，例如：vite-plugin-svg-sprite依赖包。通过`value`属性传入svg文件名就可以使用了。

## 项目配置

-   这里的给出了2种方案，一种是基于`vite`的使用`vite-plugin-svg-sprite`插件方案，另一种是基于`webpack`的使用`svg-sprite-loader`插件方案。他们都将 SVG 图片拼接成 SVG Sprites(SVG雪碧图)，放到页面中，其它地方通过 use 复用。其工作原理是利用 svg 的 symbol 元素，将每个 icon 包括在 symbol 中，通过 use 元素使用该 symbol 。这样可以减少 HTTP 请求，提高页面加载速度。

-   你可以根据项目实际情况选择或者选择其他的方案。

### vite

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

-   从指定目录引入所有的svg文件

```ts
// main.ts

// 加载svg目录下的所有svg文件
const svgs = import.meta.glob("./svgs/*.svg");

// 遍历所有svg文件，加载所有的svg文件
Object.keys(svgs).forEach(async key => {
    await svgs[key]();
});
```

### webpack

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

-   从指定目录引入所有的svg文件

```ts
// index.ts

// 加载svg目录下的所有svg文件
const svgs = require.context("./svg", true, /\.svg$/);

// 遍历所有svg文件，加载所有的svg文件
svgs.keys().map(svgs);
```

## 基础用法

:::demo 指定引入svg文件，在组件中直接指定`value`属性为svg文件名即可使用。

svg-icon/basic(svg-icon/svgs/exit-full-screen.svg|svg-icon/svgs/fold.svg|svg-icon/svgs/full-screen.svg)[hide-playground]

:::

## 目录导入所有svg文件

:::demo 该示例是基于vite的，从指定目录引入所有的svg文件。

svg-icon/all[hide-playground]

:::

## SvgIcon API

### SvgIcon 属性

| 属性名 | 说明      | 类型      | 默认值 |
| ------ | --------- | --------- | ------ |
| value  | svg文件名 | ^[string] | —      |

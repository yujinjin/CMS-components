# CMS-components

内容管理系统组件库

## 1.安装

```
npm install --save @yujinjin/cms-components
```

## 2.快速开始

## 3.项目目录结构

```
├── docs(文档)
│   ├── .vitepress(vitepress配置目录)
│   │   ├── plugins(markdown文档中使用的特殊内容转换成自定义插件内容)
│   │   │   ├── demo.ts (markdown文档中演示例子插件)
│   │   │   ├── table-wrapper.ts (markdown文档table内容添加样式)
│   │   │   ├── tooltip.ts (markdown文档中提示内容插件)
│   │   │   ├── .....ts (markdown文档中其他插件)
│   │   │   └── index.ts (markdown文档中引入的插件入口)
│   │   ├── theme (自定义文档主题，在这里引入自定义插件)
│   │   │   ├── components (markdown文档中的引入的组件列表)
│   │   │   ├── fonts (markdown文档定义的icon列表)
│   │   │   ├── style (markdown文档样式)
│   │   │   └── index.ts (自定义文档主题入口)
│   │   ├── utils
│   │   └── config.ts (配置入口)
│   ├── examples (markdown文档中引入的示例列表)
│   │   ├── input-field (input-field组件的示例列表)
│   │   │   ├── input.vue
│   │   │   ├── select.vue
│   │   │   └── ....vue
│   │   ├── ... (组件1的示例列表)
│   │   │   └── ....vue
│   │   └── ... (组件2的示例列表)
│   │       └── ....vue
│   ├── pages (markdown文档列表)
│   │   ├── input-field.md (input-field组件页面文档)
│   │   ├── ....md (组件1页面文档)
│   │   └── ....md (组件2页面文档)
│   ├── public (静态资源服务的文件夹)
│   ├── typings (声明文件)
│   ├── tsconfig.json
│   └── package.json (name: @yujinjin/cms-components-docs)
│       ├── dev (本地运行文档服务)
│       ├── preview (文档预览)
│       └── build (文档构建)
├── packages
│   ├── components          # 组件库
│   │   ├── input-field (表单输入字段组件)
│   │   │   ├── __tests__
│   │   │   ├── index.ts (组件库导出文件)
│   │   │   └── src
│   │   │       ├── input-field.ts
│   │   │       └── input-field.vue (组件内容)
│   │   ├── img-upload (图片上传组件，支持裁剪、旋转、SVGA)
│   │   │   ├── __tests__
│   │   │   ├── index.ts (组件库导出文件)
│   │   │   └── src
│   │   │       ├── img-upload.ts
│   │   │       └── img-upload.vue (组件内容)
│   │   ├── .... (组件1)
│   │   │   ├── __tests__
│   │   │   ├── index.ts (组件库导出文件)
│   │   │   └── src
│   │   │       ├── ....ts
│   │   │       └── ....vue (组件内容)
│   │   ├── index.ts (所有的组件库集合列表)
│   │   └── package.json (name: @yujinjin/cms-components-modules)
│   │       ├── test命令 (组件库测试)
│   │       └── test:coverage命令 (测试覆盖率)
│   ├── style          # 组件库样式
│   │   ├── index.scss (组件库样式入口文件)
│   │   ├── input-field.scss
│   │   └── ....scss
│   ├── main (组件入口)
│   │   ├── component.ts  (所有的组件库（插件）集合列表)
│   │   ├── index.ts
│   │   └── package.json (name: @yujinjin/cms-components)
│   ├── utils (工具库)
│   │   ├── index.ts
│   │   └── package.json (name: @yujinjin/cms-components-utils)
│   ├── scripts (脚本)
│   │   ├── tasks
│   │   │   └── index.ts
│   │   ├── utils
│   │   │   ├── constants.ts
│   │   │   ├── get-package-upgrade-version.ts
│   │   │   ├── process.ts
│   │   │   └── console.ts
│   │   ├── build.ts
│   │   ├── publish.ts
│   │   └── package.json (name: @yujinjin/cms-components-scripts)
│           ├── build命令 (组件库构建)
│           ├── build:style命令 (组件库样式构建)
│           └── publish命令 (组件库发布)
├── play(在线演示)
│   ├── src
│   ├── vite.config.ts (vite配置)
│   └── package.json (name: @yujinjin/cms-components-play)
│       └── dev (本地运行服务)
├── playground (演练场)
├── typings(声明文件)
│   ├── global.d.ts
│   └── vue-shims.d.ts
├── dist(打包目录)
│   ├── types(临时生成的声明文件)
│   ├── cms-commponents(打包的组件NPM目录)
│   ├── playground(打包的playground目录)
│   └── docs(组件文档目录)
├── commitlint.config.js
├── CHANGELOG.md
├── README.md
├── vitest.config.ts
└── package.json (无name)
    ├── clear
    ├── build
    ├── build:style
    ├── publish
    ├── test (组件库测试)
    ├── test:coverage (组件库测试覆盖情况)
    ├── coverage
    ├── docs:dev
    ├── docs:build
    ├── docs:preview
    ├── format
    ├──
    ├──
    ├──
    ├── prepare
    ├── lint (组件库lint)
    └── lint:fix

```

TODO: 全面梳理packages目录下最小源码结构，验证组件库的所有任务命令的正确性
-- 1. 完善组件库、样式、单元测试
-- 2.梳理各个package.json 内的依赖包和命令
-- 2.组件库 build
-- 3.组件库单元测试
-- 4.发布组件包

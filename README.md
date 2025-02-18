# CMS Components

CMS Components 是一个基于 Vue 3 和 Element Plus 的组件库，旨在为开发者提供一套高效、灵活且易于使用的 UI 组件，帮助快速构建现代化的管理系统和应用程序。

## 文档

[这里](https://yujinjin.github.io/cms-components/docs) 可以查看在线文档。

## Playground

[这里](https://yujinjin.github.io/cms-components/playground) 可以尝试快速体验和测试CMS Components 的各种功能。

## 特性

-   **基于 Vue 3**: 利用 Vue 3 的响应式特性和组合 API，提供更好的开发体验。
-   **Element Plus 兼容**: 组件库基于 Element Plus，提供了一致的设计风格和用户体验。
-   **丰富的组件**: 提供多种常用组件，如表单、表格、弹窗、搜索框等，满足日常开发需求。
-   **灵活的配置**: 组件支持丰富的配置选项，允许开发者根据需求自定义组件行为和样式。
-   **良好的文档**: 提供详细的文档和示例，帮助开发者快速上手和使用组件。
-   **TypeScript 支持**: 使用 TypeScript 开发，提供完整的类型定义。
-   **主题定制**: 支持自定义主题，可以根据项目需求调整样式。
-   **按需加载**: 支持按需引入组件，优化项目体积。

## 环境支持

-   现代浏览器和 IE11
-   Vue 3.4+
-   Element Plus 2.8+
-   TypeScript 5.5+
-   Node.js 18+

## 技术栈

### 核心技术
- **Vue 3**: 使用 Vue 3 Composition API 开发
- **TypeScript**: 采用 TypeScript 进行类型安全的开发
- **Element Plus**: 基于 Element Plus UI 框架扩展
- **Vite**: 使用 Vite 构建开发环境

### 构建工具
- **Rollup**: 用于组件库的打包构建
- **pnpm**: 包管理器，采用 monorepo 结构管理项目
- **Gulp**: 自动化构建工具，协调各个构建任务

### 开发工具
- **VitePress**: 文档站点构建
- **Vitest**: 单元测试框架
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **Husky**: Git Hooks 管理
- **commitlint**: Git 提交信息规范化

### 样式开发
- **Sass**: CSS 预处理器
- **Less**: CSS 预处理器
- **PostCSS**: CSS 后处理器

### 依赖库
- **Quill**: 富文本编辑器
- **Cropper.js**: 图片裁剪功能
- **clipboard**: 剪贴板操作

## 安装

### 使用包管理器

我们建议您使用包管理器（如 NPM、Yarn、pnpm）安装 CMS Components，然后您就可以使用打包工具，例如 Vite 或 Webpack。

#### NPM

```shell
$ npm install @yujinjin/cms-components --save
```

#### Yarn

```shell
$ yarn add @yujinjin/cms-components
```

#### pnpm

```shell
$ pnpm install @yujinjin/cms-components
```

### 浏览器直接引入

直接通过浏览器的 HTML 标签导入 CMS Components，然后就可以使用了。

#### unpkg

```html
<head>
    <!-- Import style -->
    <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
    <link rel="stylesheet" href="//unpkg.com/@yujinjin/cms-components/dist/index.css" />
    <!-- Import Vue 3 -->
    <script src="//unpkg.com/vue@3"></script>
    <!-- Import component library -->
    <script src="//unpkg.com/element-plus"></script>
    <script src="//unpkg.com/@yujinjin/cms-components"></script>
</head>
```

#### jsDelivr

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

## 快速开始

本节将介绍如何在项目中使用 CMS Components。

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```ts
// main.ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import CMSComponents from "@yujinjin/cms-components";
import "@yujinjin/cms-components/dist/index.css";

const app = createApp(App);

app.use(ElementPlus);
app.use(CMSComponents);
app.mount("#app");
```

### 手动导入

您可以选择手动导入所需的组件，以减小打包体积。

```ts
import { InputForm, SearchForm } from "@yujinjin/cms-components";
```

## 组件列表

-   **SvgIcon**: SVG文件图标组件。
-   **CheckSelect**: 多选下拉框选择组件，可快捷全选、选项有复选框勾选的选择器。适用那些下拉框数据量不大，但需要快捷全选的场景。
-   **ImgUpload**: 图片上传组件，支持单图/多图上传、裁剪、限制图片上传尺寸特性。
-   **WebEditor**: 富文本编辑器组件，基于 `Quill` 的富文本编辑器组件，提供所见即所得的内容编辑功能。
-   **InputField**: 动态表单输入字段组件，支持多种输入类型,如文本、数字、单选、多选等，主要是和`InputForm`组件组合使用。
-   **SearchField**: 动态表单搜索字段组件，支持多种输入类型,如文本、数字、单选、多选等，主要是和`SearchForm`组件组合使用。
-   **ActionBar**: 操作栏组件，提供常用操作按钮的配置。
-   **InputForm**: 动态表单组件，支持多种输入类型和验证。
-   **SearchForm**: 搜索表单组件，支持多种搜索条件和自定义操作。
-   **DataTable**: 数据表格组件，支持排序、筛选、分页等功能。
-   **DialogForm**: 弹窗表单组件，支持表单验证和自定义内容。
-   **SearchPage**: 搜索页面组件，结合搜索表单和数据表格，提供完整的搜索功能。

### 本地开发

```bash
# 克隆项目
git clone https://github.com/yujinjin/CMS-components.git

# 安装依赖
pnpm install

# 构建组件库
pnpm build

# 构建文档
pnpm docs:build

# 启动文档开发服务
pnpm docs:dev

# 启动组件演示环境
pnpm play:dev

# 运行单元测试
pnpm test:ui

# 运行测试并查看覆盖率
pnpm coverage
```

## 贡献

欢迎任何形式的贡献！如果您发现了 bug 或有改进建议，请提交 issue 或 pull request。

## License

该项目使用 MIT 许可证，详细信息请查看 [LICENSE](./LICENSE) 文件。

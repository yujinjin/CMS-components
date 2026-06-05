# CMS Components

<p align="center">
  <strong>基于 Vue 3 + Element Plus 的内容管理系统组件库</strong>
</p>

<p align="center">
  <a href="https://yujinjin.github.io/cms-components/docs">📖 在线文档</a> ·
  <a href="https://yujinjin.github.io/cms-components/playground">🎮 在线演练场</a> ·
  <a href="https://github.com/yujinjin/CMS-components/issues">🐛 问题反馈</a>
</p>

---

## 简介

CMS Components 是一套面向**内容管理系统（CMS）**场景的 Vue 3 组件库，基于 Element Plus 扩展，提供从搜索、表单、表格到弹窗等完整的业务组件链。组件库采用 **Monorepo** 架构管理，使用 **TypeScript** 全量开发，支持**按需引入**和**完整引入**两种方式，并提供完善的类型定义、文档和演练场。

## 特性

- 🧩 **Vue 3 Composition API** — 全面拥抱 Vue 3 组合式 API，提供更好的逻辑复用与类型推导
- 🎨 **Element Plus 扩展** — 基于 Element Plus 二次封装，保持一致的设计风格，增强业务场景适配
- 📦 **Monorepo 架构** — 使用 pnpm workspace 管理多包，职责清晰、独立迭代
- 🔒 **TypeScript 全量支持** — 源码及产物均提供完整的类型定义（`.d.ts`）
- 🌳 **按需引入** — 支持 ES Module Tree Shaking，优化产物体积
- 🧪 **单元测试** — 基于 Vitest + Vue Test Utils，每个组件配备测试用例
- 📖 **VitePress 文档** — 提供交互式组件文档与代码示例
- 🎮 **在线演练场** — 基于 Vue REPL，支持浏览器内实时编辑与预览
- 🛠 **工程化规范** — ESLint + Prettier + Husky + commitlint 全链路代码质量保障
- 🎨 **主题定制** — 使用 Sass/Less 预处理器，支持样式变量覆盖与主题定制

## 环境要求

| 依赖 | 版本 |
|------|------|
| Node.js | ≥ 18 |
| Vue | ≥ 3.4 |
| Element Plus | ≥ 2.8 |
| TypeScript | ≥ 5.5 |

## 技术栈

### 核心框架

- **Vue 3** — 使用 Composition API 开发
- **TypeScript** — 全量类型安全开发
- **Element Plus** — 基础 UI 框架
- **@vueuse/core** — 组合式实用函数库

### 构建工具

- **Vite** — 开发服务器与 Playground 构建
- **Rollup** — 组件库产物打包（ES Module / CommonJS / UMD）
- **Gulp** — 构建任务编排（拷贝、打包、类型生成、样式处理）
- **pnpm** — 包管理器 + Monorepo workspace

### 样式方案

- **Sass** — 主样式预处理器
- **Less** — 辅助样式预处理器
- **PostCSS** — CSS 后处理

### 关键依赖

- **Quill 2.x** — 富文本编辑器（WebEditor 组件）
- **Cropper.js** — 图片裁剪（ImgUpload 组件）
- **@yujinjin/utils** — 通用工具函数库
- **fflate** — 高性能压缩库

### 开发工具链

- **VitePress** — 文档站点生成
- **Vitest** — 单元测试框架
- **@vue/test-utils** — Vue 组件测试工具
- **ESLint 9** — 代码质量检查（Flat Config）
- **Prettier** — 代码格式化
- **Husky** — Git Hooks 管理
- **commitlint** — 提交信息规范化
- **lint-staged** — 暂存区代码检查

## 项目架构

```
CMS-components/
├── packages/                    # Monorepo 子包
│   ├── components/              # 📦 @yujinjin/cms-components-modules  组件源码
│   │   ├── svg-icon/            #   SVG 图标组件
│   │   ├── check-select/        #   下拉复选框组件
│   │   ├── img-upload/          #   图片上传组件
│   │   ├── web-editor/          #   富文本编辑器组件
│   │   ├── input-field/         #   输入字段组件
│   │   ├── search-field/        #   搜索字段组件
│   │   ├── action-bar/          #   操作栏组件
│   │   ├── data-table/          #   数据表格组件
│   │   ├── input-form/          #   动态表单组件
│   │   ├── search-form/         #   搜索表单组件
│   │   ├── dialog-form/         #   弹窗表单组件
│   │   └── search-page/         #   搜索页面组件
│   ├── main/                    # 📦 @yujinjin/cms-components-main    组件库入口与打包产物
│   ├── style/                   # 📦 @yujinjin/cms-components-style   组件样式源码（Sass）
│   ├── utils/                   # 📦 @yujinjin/cms-components-utils   内部工具函数
│   └── scripts/                 # 📦 @yujinjin/cms-components-scripts 构建/发布/清理脚本
├── docs/                        # 📖 VitePress 文档站点
│   ├── .vitepress/              #   VitePress 配置与自定义主题
│   ├── examples/                #   组件示例代码
│   └── pages/                   #   文档页面（指南 + 组件文档）
├── play/                        # 🎮 组件开发调试环境（Vite Dev Server）
├── playground/                  # 🌐 在线演练场（基于 @vue/repl）
├── typings/                     # 全局类型声明
├── dist/                        # 构建产物输出目录
│   ├── cms-components/          #   组件库产物（ES / Lib / UMD）
│   ├── docs/                    #   文档站点产物
│   ├── playground/              #   演练场产物
│   ├── packages/                #   子包产物
│   └── types/                   #   类型声明产物
├── pnpm-workspace.yaml          # pnpm 工作区配置
├── tsconfig.base.json           # TypeScript 基础配置
├── eslint.config.js             # ESLint Flat Config
├── commitlint.config.js         # 提交信息规范配置
└── package.json                 # 根项目配置
```

### 子包说明

| 包名 | 说明 | 是否发布 |
|------|------|----------|
| `@yujinjin/cms-components-modules` | 组件源码，包含 12 个业务组件 | ❌ 内部包 |
| `@yujinjin/cms-components-main` | 组件库入口，负责全局注册与导出 | ✅ **发布包**（npm 包名：`@yujinjin/cms-components`） |
| `@yujinjin/cms-components-style` | 组件样式源码（Sass） | ❌ 内部包 |
| `@yujinjin/cms-components-utils` | 内部工具函数（`buildProps`、`escapeStringRegexp`、`isString`） | ❌ 内部包 |
| `@yujinjin/cms-components-scripts` | 构建、清理、发布脚本 | ❌ 内部包 |

## 组件列表

### 基础组件

| 组件 | 说明 | 关键特性 |
|------|------|----------|
| **SvgIcon** | SVG 图标组件 | 支持 SVG Sprite / 内联组件 / 自定义颜色与尺寸 |
| **CheckSelect** | 下拉复选框组件 | 多选下拉框 + 全选快捷操作 + 复选框勾选 |
| **ImgUpload** | 图片上传组件 | 单图/多图上传 + Cropper.js 裁剪 + 尺寸限制 + 自定义上传接口 |
| **WebEditor** | 富文本编辑器组件 | 基于 Quill 2.x + 自定义图片上传 + 异步加载模式 |

### 字段组件

| 组件 | 说明 | 支持的字段类型 |
|------|------|---------------|
| **InputField** | 动态输入字段组件 | `input` `select` `selectV2` `checkSelect` `datePicker` `timePicker` `timeSelect` `inputNumber` `radio` `slider` `switch` `imgUpload` `webEditor` `autocomplete` `cascader` `checkbox` `colorPicker` `upload` `label` |
| **SearchField** | 搜索字段组件 | `input` `inputNumber` `select` `checkSelect` `datePicker` |

### 业务组件

| 组件 | 说明 | 关键特性 |
|------|------|----------|
| **ActionBar** | 操作栏组件 | 配置化按钮列表 + 选中行联动 + 自定义图标/插槽 + 动态按钮修改 |
| **InputForm** | 动态表单组件 | 多列布局 + 字段级验证 + 字段联动 + 动态字段修改 + 表单值获取/设置 |
| **SearchForm** | 搜索表单组件 | 折叠/展开 + 搜索/重置 + 自定义按钮 + 字段值变化事件 + 默认值 |
| **DataTable** | 数据表格组件 | 自动查询 + 分页 + 列类型扩展（序号/操作/日期/枚举/图片） + 列显示控制 + 数据加工 |
| **DialogForm** | 弹窗表单组件 | 弹窗 + 表单一体化 + 按钮配置化 + 表单验证 + 动态字段/按钮修改 |
| **SearchPage** | 搜索页面组件 | SearchForm + ActionBar + DataTable 组合 + 搜索/选择联动 + 列显示控制 |

### 组件关系图

```
SearchPage（搜索页面）
├── SearchForm（搜索表单）
│   └── SearchField（搜索字段）
│       └── CheckSelect（下拉复选框）
├── ActionBar（操作栏）
└── DataTable（数据表格）
    ├── TableColumnNumber（数字列）
    ├── TableColumnAction（操作列）
    ├── TableColumnDate（日期列）
    ├── TableColumnEnum（枚举列）
    └── TableColumnImage（图片列）

DialogForm（弹窗表单）
└── InputForm（动态表单）
    └── InputField（输入字段）
        ├── CheckSelect（下拉复选框）
        ├── ImgUpload（图片上传）
        └── WebEditor（富文本编辑器）

SvgIcon（图标） — 独立基础组件
```

## 安装

### 包管理器安装（推荐）

```bash
# pnpm
pnpm add @yujinjin/cms-components

# npm
npm install @yujinjin/cms-components --save

# yarn
yarn add @yujinjin/cms-components
```

### CDN 引入

#### unpkg

```html
<head>
  <!-- Element Plus 样式 -->
  <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
  <!-- CMS Components 样式 -->
  <link rel="stylesheet" href="//unpkg.com/@yujinjin/cms-components/dist/index.css" />
  <!-- Vue 3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- Element Plus -->
  <script src="//unpkg.com/element-plus"></script>
  <!-- CMS Components -->
  <script src="//unpkg.com/@yujinjin/cms-components"></script>
</head>
```

#### jsDelivr

```html
<head>
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/element-plus/dist/index.css" />
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/@yujinjin/cms-components/dist/index.css" />
  <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
  <script src="//cdn.jsdelivr.net/npm/element-plus"></script>
  <script src="//cdn.jsdelivr.net/npm/@yujinjin/cms-components"></script>
</head>
```

## 快速开始

### 完整引入

```ts
// main.ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import CMSComponents from "@yujinjin/cms-components";
import "@yujinjin/cms-components/dist/index.css";
import App from "./App.vue";

const app = createApp(App);
app.use(ElementPlus);
app.use(CMSComponents);
app.mount("#app");
```

### 按需引入

```ts
// 手动导入所需组件，配合 Tree Shaking 自动优化产物体积
import { InputForm, SearchForm, DataTable, DialogForm } from "@yujinjin/cms-components";
```

### 组件实例方法

部分组件通过 `ref` 暴露了实例方法，支持命令式操作：

```ts
// InputForm 实例方法
const inputFormRef = ref<InputFormRef>();
inputFormRef.value?.getInputValue();           // 获取表单值
inputFormRef.value?.setInputPropertyValue();   // 设置字段值
inputFormRef.value?.changeFormFields();        // 动态修改字段
inputFormRef.value?.validate();                // 表单验证

// DataTable 实例方法
const dataTableRef = ref<DataTableRef>();
dataTableRef.value?.queryDataList();                      // 查询数据
dataTableRef.value?.initTableMaxHeight();                 // 初始化最大高度
dataTableRef.value?.updateTableColumnsShowStatus();       // 更新列显示状态

// SearchPage 实例方法
const searchPageRef = ref<SearchPageRef>();
searchPageRef.value?.query();                            // 搜索查询
searchPageRef.value?.getSearchingValue();                // 获取实时搜索值
searchPageRef.value?.getSearchedValue();                 // 获取已搜索值
searchPageRef.value?.changeFormFields();                 // 修改搜索字段
searchPageRef.value?.changeButtons();                    // 修改操作按钮
searchPageRef.value?.updateTableColumnsShowStatus();     // 更新列显示状态
```

## 本地开发

### 环境准备

```bash
# 1. 全局安装 pnpm
npm i pnpm -g

# 2. 克隆项目
git clone https://github.com/yujinjin/CMS-components.git

# 3. 安装依赖
pnpm install
```

### 开发命令

```bash
# 启动组件调试环境（play）— 端口 8000
pnpm play:dev

# 启动在线演练场（playground）— 端口 8090
pnpm playground:dev

# 启动文档开发服务
pnpm docs:dev

# 构建组件库
pnpm build

# 构建文档站点
pnpm docs:build

# 预览文档产物
pnpm docs:preview

# 构建演练场
pnpm playground:build

# 运行单元测试
pnpm test

# 运行测试 UI 面板
pnpm test:ui

# 运行测试并生成覆盖率
pnpm coverage

# 代码格式化
pnpm format

# 代码质量检查
pnpm lint

# 代码质量检查并自动修复
pnpm lint:fix

# 清理构建产物
pnpm clear

# 发布组件库
pnpm publish
```

## 构建产物

组件库通过 Rollup + Gulp 构建流程，输出以下产物：

```
dist/cms-components/
├── es/                    # ES Module 产物
│   ├── index.mjs          #   ES Module 入口
│   ├── index.d.ts         #   类型声明
│   └── *.mjs              #   按需引入的组件模块
├── lib/                   # CommonJS 产物
│   ├── index.js           #   CJS 入口
│   ├── index.d.ts         #   类型声明
│   └── *.js               #   按需引入的组件模块
├── dist/                  # UMD / IIFE 产物
│   ├── index.full.js      #   完整 UMD 包（含所有依赖）
│   └── index.css          #   完整样式包
└── global.d.ts            # 全局类型声明
```

## 提交规范

项目使用 [commitlint](https://commitlint.js.org/) 规范 Git 提交信息，配合 Husky 在 `commit-msg` 和 `pre-commit` 钩子自动校验。

### 提交格式

```
git commit -m "<type>(<scope>): <subject>"
```

### Type 类别

| Type | 说明 |
|------|------|
| `feat` | 新增功能 |
| `fix` | Bug 修复 |
| `ui` | UI 样式调整 |
| `docs` | 文档更新 |
| `style` | 代码格式调整（不影响功能） |
| `refactor` | 代码重构 |
| `perf` | 性能优化 |
| `build` | 构建相关 |
| `ci` | CI/CD 相关 |
| `chore` | 其他杂项 |
| `revert` | 回退提交 |
| `test` | 测试相关 |

### Scope 类别

| Scope | 说明 |
|-------|------|
| `components` | 组件相关 |
| `playground` | 演练场相关 |
| `docs` | 文档相关 |
| `play` | 调试环境相关 |
| `examples` | 示例相关 |
| `all` | 全局/跨模块 |

### 示例

```bash
git commit -m "feat(components): [action-bar] 增加自定义图标功能"
git commit -m "fix(components): [data-table] 修复分页参数计算错误"
git commit -m "chore(all): 项目框架搭建"
```

## 版本历史

详见 [CHANGELOG.md](./CHANGELOG.md)

| 版本 | 日期 | 主要变更 |
|------|------|----------|
| 0.0.3 | — | 当前开发版本 |
| 0.0.2 | 2025-05-08 | 增加 `types.d.ts` 类型声明、修复文档构建问题 |
| 0.0.1 | 2025-02-21 | 初始发布，包含 12 个组件 + 文档 + 演练场 |

## 开发指南

详细的开发说明请参阅 [DEVELOPMENT.md](./DEVELOPMENT.md)，包含：

- 项目启动与运行
- 代码基础架构说明
- 组件开发规范
- 构建流程详解

## 贡献

欢迎任何形式的贡献！如果您发现了 Bug 或有改进建议：

1. 提交 [Issue](https://github.com/yujinjin/CMS-components/issues) 描述问题
2. Fork 项目并创建特性分支
3. 提交 Pull Request，确保通过 ESLint 检查和测试

## License

[MIT](./LICENSE) © 2024-present jack yu
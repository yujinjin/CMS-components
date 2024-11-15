# CMS-components

开发说明

### 1. 启动运行

-   执行 npm i pnpm -g 全局安装 pnpm;
-   执行 pnpm i -w 全局安装包

### 2. 代码基础架构说明

```bash
|-- docs                               //
    |-- .vitepress
    |-- examples
    |-- pages
    |-- public
    |-- typings
|-- publish                               //
|-- packages                               //
|-- play                               //
|-- scripts                               //
|-- typings                               //
```

### 2. docs

dev 是开发模式启动 vitepress；
build 为打包；
serve 是对打包后的结果启动服务预览。
命令参数中的 docs 就是上面在根目录创建的目录名 docs。

### 3. 提交规范

使用 commitlint 规范每一次的 commit，用来自动生成 changeLog 文件，方便代码管理。

#### 3.1 提交格式

```
git commit -m <type>(<scope>): <subject>
```

#### 3.2 常用 type 类别

type ：用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？总结以下 11 种类型：

-   主要 type
    -   feat：新增功能
    -   fix：bug 修复
-   次要 type
    -   docs：文档更新
    -   style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
    -   refactor：重构代码(既没有新增功能，也没有修复 bug)
    -   build：构造工具或者外部依赖的改动，例如 webpack，npm，pom
    -   ui：CSS 样式调整
-   特殊 type
    -   ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle 等)的提交
    -   revert：代码回退
    -   perf：性能优化，提高性能的代码更改，比如提升性能、体验
    -   test：添加或修改代码测试
    -   chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改

当一次改动包括主要 type 与次要 type 时，统一采用主要 type。

optional scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。

description：一句话描述此次提交的主要内容，做到言简意赅。

#### 3.3 示例

```
git commit -m 'feat(components): [action-bar]增加 xxx 功能'
git commit -m 'fix(components): [action-bar]修复 xxx 功能'
```

### 4. 引用包说明

| 包名                  | 说明                                                                    |
| --------------------- | ----------------------------------------------------------------------- |
| eslint-plugin-unicorn | 整合社区一些很棒的 eslint 规则，比如我会用来规范关于文件命名的方式。    |
| czg-git               | git 提交提供交互式的工具                                                |
| c8                    | 使用 node.js 的内置 coverage 输出覆盖率                                 |
| consola               | 简单来说，还是个能让 terminal 的输出信息的样式,让终端提示更明显。       |
| jsdom                 | jsdom 可以在 node.js 库中，使用类似 dom 原生 API 的方式，操作 html 内容 |

### 5. elements plus 代码分析

projRoot: "/"
pkgRoot: "/packages"
compRoot: "/packages/components"
themeRoot: "/packages/theme-chalk"
hookRoot: "/packages/hooks"
localeRoot: "/packages/locale"
directiveRoot: "/packages/directives"
epRoot: "/packages/element-plus"
utilRoot: "/packages/utils"
buildRoot: "/internal/build"

docRoot: "/docs"
vpRoot: "/docs/.vitepress"

buildOutput: "/dist"
epOutput: "/dist/element-plus"

projPackage: "/package.json"
compPackage: "/packages/components/package.json"
themePackage: "/packages/theme-chalk/package.json"
hookPackage: "/packages/hooks/package.json"
localePackage: "/packages/locale/package.json"
directivePackage: "/packages/directives/package.json"
epPackage: "/packages/element-plus/package.json"
utilPackage: "/packages/utils/package.json"
docPackage: "/docs/package.json"

export const PKG_PREFIX = '@element-plus'
export const PKG_NAME = 'element-plus'
export const PKG_CAMELCASE_NAME = 'ElementPlus'
export const PKG_CAMELCASE_LOCAL_NAME = 'ElementPlusLocale'
export const PKG_BRAND_NAME = 'Element Plus'
export const REPO_OWNER = 'element-plus'
export const REPO_NAME = 'element-plus'
export const REPO_PATH = `${REPO_OWNER}/${REPO_NAME}`
export const REPO_BRANCH = 'dev'

/dist/element-plus/package.json
/dist/element-plus/README.md
/dist/element-plus/global.d.ts
internal/build stub$ unbuild --stub
internal/build-constants stub$ unbuild --stub
internal/build-utils stub$ unbuild --stub    
internal/build stub: i Stubbing @element-plus/build
internal/build-utils stub: i Stubbing @element-plus/build-utils        
internal/build-constants stub: i Stubbing @element-plus/build-constants
internal/build stub: Done
internal/build-constants stub: Done
internal/build-utils stub: Done

// element-plus 打包流程
export default series(
withTaskName('clean', () => run('pnpm run clean')), // 删除dist文件夹
withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })), // 递归生成dist/element-plus

parallel(
runTask('buildModules'), // 单个组件打包 esm模块和cjs模块
runTask('buildFullBundle'), // 合并打包 esm模块和umd模块
runTask('generateTypesDefinitions'), // 生成对应的类型声明文件并放到dist/type文件夹下
runTask('buildHelper'), // 生成vetur插件和webstorm的帮助文档
series( // 将所有scss文件编译成css文件，并通过文件流放到合适的地方
withTaskName('buildThemeChalk', () =>
run('pnpm run --filter ./packages/\*\* build --parallel')
),
copyFullStyle // 将dist/element-plus/theme-chalk/index.css拷贝到dist/element-plus/dist/index.css
)
),
// 将dist/type下的声明文件分别拷贝到esm、cjs模块文件夹下
// 将根目录下global.d.ts、README.md、packages/element-plus/package.json拷贝到dist/element-plus下
parallel(copyTypesDefinitions, copyFiles)
)
const AutoImport = require('unplugin-auto-import/vite');//实现vue函数的自动导入
const Components = require('unplugin-vue-components/vite'); //实现vue组件库的自动按需导入
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers'); // ui库解析器，自动导入ui库,该插件内置了大多数流行库解析器，比如 Element Plus Ant Design Vue等，这样在使用ui组件库时，就不需要手动引入

### 6. 部分依赖模块说明

-   1.@rollup/plugin-alias
    用途: rollup 路径别名配置

-   2.@rollup/plugin-node-resolve
    用途: 用于解析 node_modules 中第三方模块

-   3.@rollup/plugin-commonjs
    用途: 用于将CommonJS模块转换为ES6，以便 Rollup 解析处理

-   4.@vitejs/plugin-vue
    用途: 解析 Vue SFC (VUE3-Single File Component)

-   5.@vitejs/plugin-vue-jsx
    用途: Vue 3 JSX 支持

-   6.vite-plugin-dts
    用途: 用于在 库模式 中从 .ts(x) 或 .vue 源文件生成类型文件（\*.d.ts）的 Vite 插件

-   7.cssnano
    用途: 用于确保最终生成的 用于生产环境的 CSS 样式表文件尽可能的小

-   2.@rollup/plugin-node-resolve
    用途: 用于解析 node_modules 中第三方模块

-   2.@rollup/plugin-node-resolve
    用途: 用于解析 node_modules 中第三方模块

#### TODO: 研究为什么element-plus组件明明没有定义defineExpose，但ref实例还能为啥能获取到所有的属性（比如：$data、$el）

##### 参考资料如下：

-   [实践 Vue3 组件库-如何实现组件打包与组件声明文件(打包篇一)](https://juejin.cn/post/7137902538103193613)
-   [Vexip UI(Vue 3 组件)](https://github.com/vexip-ui/vexip-ui/tree/main)
-   [实现一个vue3组件库 - 打包和发布](https://juejin.cn/post/7261566651606663223)
-   [sss ui plus(Vue 3 组件)](https://github.com/lastertd/sss-ui-plus/tree/dev)
-   [Vexip UI(Vue 3 组件)](https://github.com/vexip-ui/vexip-ui/tree/main)
-   [使用Rollup+Typescript 构建属于自己的Vue3组件库](https://github.com/AlwaysLoveme/rollup-ts-vue3)
-   [如何用 Rollup 打包 Vue3.x UI 组件](https://juejin.cn/post/7178357462779559973)
-   [用 Rollup 打包 Vue3.x UI 组件](https://github.com/rollup-build-components/icon-select-vue3.x/tree/main)
-   [Git钩子工具 - husky | lint-staged | commitlint](http://yq2048.cn/?post=33)
-   [git eslint-config-vue 示例1](https://github.com/teojs/eslint-config-vue/blob/main/index.mjs)
-   [vuejs core 源码](https://github.com/vuejs/core)
-   [eslint中文文档](https://eslint.nodejs.cn/docs/latest/rules/strict)
-   [typescript-eslint 官网](https://typescript-eslint.io/)
-   [typescript-eslint 中文](https://typescript.eslint.org.cn/)

### 7. 增加一个组件的开发步骤

-   1.开发一个组件(packages/components)

    -   1. 定义组件所用到的props、emits等相关实例(/:name/src/:name.ts)
    -   2. 定义组件内容(/:name/src/:name.vue)
    -   3. 定义组件的入口文件(/:name/index.ts)
    -   4. 编写组件的测试文件(/:name/**tests**/:name.test.tsx)
    -   5. 入口文件导出组件(/index.ts)

-   2.组件库入口文件引入组件(packages/main/components.ts)

-   3.docs:
    -   1.组件的vue示例代码(/examples/)
    -   2.编写组件的MD文档(/pages/)
    -   3.配置文档的路由地址(/.vitepress/config.ts)

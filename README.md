# CMS-components

内容管理系统组件库

### 1. 启动运行

-   执行 npm i pnpm -g 全局安装 pnpm;
-   执行 pnpm i -w 全局安装包

### 2. docs

dev 是开发模式启动 vitepress；build 为打包；serve 是对打包后的结果启动服务预览。命令参数中的 docs 就是上面在根目录创建的目录名 docs。

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

---
title: 快速开始
---

# 快速开始

本节将介绍如何在项目中使用 cms-components。

## 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

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

## 手动导入

这个示例展示了如何使用 SearchForm 组件创建一个基础的表单：

```vue
<template>
    <search-form :fields="fields" :is-show-collapse="false" @search="handleSearch" />
</template>

<script setup lang="ts">
import { type SearchFormField, SearchForm } from "@yujinjin/cms-components/index";
import "@yujinjin/cms-components/style/search-form/style.css";

const fields: SearchFormField[] = [
    { name: "keyword", label: "关键词", type: "input" },
    {
        name: "status",
        label: "状态",
        type: "select",
        value: "1",
        data: [
            { label: "启用", value: "1" },
            { label: "禁用", value: "0" }
        ]
    },
    { name: "date", label: "日期", defaultValue: new Date(), type: "datePicker" }
];

const handleSearch = (data: any) => {
    console.log("搜索数据:", data);
};
</script>
```

## TypeScript 支持

组件提供了完整的 TypeScript 类型定义，主要类型包括：

```ts
interface InputFormField {
    name: string;
    label: string;
    type?: "input" | "radio" | "label" | string;
    trim?: boolean;
    data?: Array<{ label: string; value: string | number }>;
    formItemProps?: Record<string, any>;
    slot?: string;
    [key: string]: any;
}

interface InputFormProps {
    fields: InputFormField[];
    modelValue?: Record<string, any>;
    loading?: boolean;
    [key: string]: any;
}
```

## 进阶用法

### 自定义表单项

```vue
<template>
    <input-form v-model="formData" :fields="fields">
        <template #custom="{ value }">
            <div class="custom-field">
                {{ value }}
                <el-button>自定义操作</el-button>
            </div>
        </template>
    </input-form>
</template>

<script setup>
const fields = [
    {
        name: "custom",
        label: "自定义字段",
        slot: "custom"
    }
];
</script>
```

### 表单验证

```ts
// 异步验证示例
const fields = [
    {
        name: "username",
        label: "用户名",
        formItemProps: {
            rules: [
                {
                    validator: async (rule: any, value: string) => {
                        if (!value) {
                            throw new Error("请输入用户名");
                        }
                        // 模拟异步验证
                        const exists = await checkUserExists(value);
                        if (exists) {
                            throw new Error("用户名已存在");
                        }
                    },
                    trigger: "blur"
                }
            ]
        }
    }
];
```

## 注意事项

1. 确保已正确安装并配置 Element Plus
2. 组件依赖 Vue 3.3+ 版本
3. 使用 TypeScript 时需要配置 `tsconfig.json` 支持装饰器语法
4. 按需引入时需要手动引入相应的样式文件

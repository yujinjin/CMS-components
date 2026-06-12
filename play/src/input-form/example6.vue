<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:00:00
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-17 10:55:08
 * @项目的路径: \CMS-components\play\src\input-form\example6.vue
 * @描述: input-form组件的自定义布局示例
-->
<template>
    <div class="example-page">
        <h3>自定义布局</h3>
        <p class="demo-desc">通过 fields 的 span 属性配置表单项的栅格布局，实现多列排列的自定义表单</p>
        <input-form ref="inputFormRef" :value="formData" :fields="fields" label-width="100px"></input-form>
        <div class="button-panel">
            <el-button @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handlePreview">预览</el-button>
        </div>
        <el-dialog v-model="previewVisible" title="预览" width="500px">
            <pre>{{ JSON.stringify(inputFormRef?.getInputValue(), null, 2) }}</pre>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type InputFormField, type InputFormRef, InputForm } from "@yujinjin/cms-components-main/index";

const inputFormRef = ref<InputFormRef>();

const formData = ref({
    title: "",
    content: "",
    tags: [],
    status: "draft",
    publishTime: ""
});

const fields: InputFormField[] = [
    { name: "title", label: "标题", type: "input", span: 12, rules: [{ required: true, message: "请填写标题" }] },
    { name: "publishTime", label: "发布时间", span: 12, type: "datePicker" },
    {
        name: "tags",
        label: "标签",
        span: 12,
        type: "checkSelect",
        data: [
            { label: "技术", value: "tech" },
            { label: "生活", value: "life" },
            { label: "工作", value: "work" }
        ]
    },
    {
        name: "status",
        label: "状态",
        type: "radio",
        span: 12,
        data: [
            { label: "草稿", value: "draft" },
            { label: "发布", value: "published" }
        ]
    },
    { name: "content", label: "内容", props: { type: "textarea", style: { width: "100%" } } }
];

const previewVisible = ref(false);

const handleReset = () => {
    formData.value = {
        title: "",
        content: "",
        tags: [],
        status: "draft",
        publishTime: ""
    };
};

const handlePreview = () => {
    previewVisible.value = true;
};
</script>

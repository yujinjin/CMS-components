<template>
    <div class="demo-box">
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
import { type InputFormField, type InputFormRef } from "@yujinjin/cms-components/index";

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
<style lang="scss" scoped>
.button-panel {
    margin-top: 24px;
    text-align: center;
}
</style>

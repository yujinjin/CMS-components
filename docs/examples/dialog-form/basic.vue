<template>
    <div class="demo-box">
        <el-button type="primary" @click="handleAdd">新增</el-button>

        <dialog-form ref="dialogFormRef" :is-show="visible" :input-form-props="{ fields }" :dialog-props="{ title: '新增用户' }" :buttons="buttons" @close="visible = false" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { DialogForm, type DialogFormButton, type InputFormField, type DialogFormRef } from "@yujinjin/cms-components-main/index";

const visible = ref(false);

const dialogFormRef = ref<DialogFormRef>();

const fields: InputFormField[] = [
    { name: "name", label: "姓名", type: "input", rules: [{ required: true, message: "请输入姓名" }] },
    { name: "age", label: "年龄", type: "inputNumber" },
    { name: "email", label: "邮箱", type: "input" }
];

const handleAdd = () => {
    visible.value = true;
};

const handleSubmit = async (data: any) => {
    await dialogFormRef.value?.validate();
    ElMessage.info(`提交数据: ${JSON.stringify(data)}`);
};

const handleCancel = () => {
    ElMessage.info("取消");
};

const buttons = ref<DialogFormButton[]>([
    { type: "primary", contents: "提交", click: handleSubmit },
    { type: "danger", contents: "取消", click: handleCancel }
]);
</script>

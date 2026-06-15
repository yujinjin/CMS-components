<template>
    <div class="demo-box">
        <el-button type="primary" @click="handleOpen">打开弹窗（阻止关闭）</el-button>
        <dialog-form ref="dialogFormRef" :is-show="visible" :input-form-props="{ fields, value: formData }" :dialog-props="{ title: '阻止关闭示例' }" :buttons="buttons" @close="visible = false" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type DialogFormRef, type DialogFormButton, type InputFormField } from "@yujinjin/cms-components-main/index";

const visible = ref(false);
const dialogFormRef = ref<DialogFormRef>();

const formData = ref({
    name: "",
    age: null
});

const fields: InputFormField[] = [
    { name: "name", label: "姓名", type: "input", rules: [{ required: true, message: "请输入姓名" }] },
    { name: "age", label: "年龄", type: "inputNumber" }
];

const handleOpen = () => {
    formData.value = { name: "", age: null };
    visible.value = true;
};

const handleSubmit = async (data: any) => {
    // 验证不通过时返回 false，阻止弹窗自动关闭
    try {
        await dialogFormRef.value?.validate();
        ElMessage.success(`提交成功: ${JSON.stringify(data)}`);
        // 验证通过，不返回 false，弹窗自动关闭
    } catch {
        ElMessage.error("验证失败，弹窗不会关闭");
        return false; // 返回 false 阻止关闭
    }
};

const handleCancel = () => {
    ElMessage.info("取消操作");
};

const buttons: DialogFormButton[] = [
    { type: "primary", contents: "提交", click: handleSubmit },
    { contents: "取消", click: handleCancel }
];
</script>

<template>
    <div class="demo-box">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="warning" @click="handleEdit">编辑</el-button>

        <dialog-form v-if="visible" ref="dialogFormRef" :input-form-props="inputFormData" :dialog-props="{ title: dialogTitle }" :buttons="buttons" @close="visible = false" />
    </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { ElMessage } from "element-plus";
import { type DialogFormButton, type InputFormProps, type DialogFormRef } from "@yujinjin/cms-components-main/index";

const visible = ref(false);
const isEdit = ref(false);
const dialogFormRef = ref<DialogFormRef>();

const inputFormData = reactive<InputFormProps>({
    isLoading: false,
    value: {
        name: "",
        age: null,
        email: "",
        status: "1"
    },
    fields: [
        { name: "name", label: "姓名", type: "input", rules: [{ required: true, message: "请输入姓名" }] },
        { name: "age", label: "年龄", type: "inputNumber" },
        { name: "email", label: "邮箱", type: "input" },
        {
            name: "status",
            label: "状态",
            type: "radio",
            data: [
                { label: "启用", value: "1" },
                { label: "禁用", value: "0" }
            ]
        }
    ]
});

const dialogTitle = computed(() => (isEdit.value ? "编辑用户" : "新增用户"));

const handleAdd = () => {
    isEdit.value = false;
    inputFormData.value = {
        name: "",
        age: null,
        email: "",
        status: "1"
    };
    visible.value = true;
};

const handleEdit = () => {
    isEdit.value = true;
    // 模拟加载数据
    inputFormData.isLoading = true;
    setTimeout(() => {
        inputFormData.value = {
            name: "张三",
            age: 25,
            email: "zhangsan@example.com",
            status: "1"
        };
        inputFormData.isLoading = false;
    }, 1000);
    visible.value = true;
};

const handleSubmit = async (data: any) => {
    await dialogFormRef.value?.validate();
    ElMessage.info(`${isEdit.value ? "编辑数据:" : "新增数据:"}: ${JSON.stringify(data)}`);
};

const handleCancel = () => {
    ElMessage.info("取消");
};

const buttons = ref<DialogFormButton[]>([
    { type: "primary", contents: "提交", click: handleSubmit },
    { type: "danger", contents: "取消", click: handleCancel }
]);
</script>

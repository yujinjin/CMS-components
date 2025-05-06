<template>
    <div class="demo-box">
        <input-form ref="inputFormRef" :value="formData" :fields="fields" :props="{ rules }" label-width="120px" />
        <div class="button-panel">
            <el-button @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, type FormRules } from "element-plus";
import { type InputFormField, type InputFormRef } from "@yujinjin/cms-components-main/index";

const inputFormRef = ref<InputFormRef>();

const formData = ref({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: ""
});

const fields: InputFormField[] = [
    { name: "username", label: "用户名", type: "input" },
    { name: "password", label: "密码", props: { type: "password" } },
    { name: "confirmPassword", label: "确认密码", props: { type: "password" } },
    { name: "email", label: "邮箱", type: "input" },
    { name: "phone", label: "手机号", type: "input" }
];

const rules: FormRules = {
    username: [
        { required: true, message: "请输入用户名" },
        { min: 3, max: 20, message: "长度在 3 到 20 个字符" }
    ],
    password: [
        { required: true, message: "请输入密码" },
        { min: 6, message: "密码不能少于 6 个字符" }
    ],
    confirmPassword: [
        { required: true, message: "请确认密码" },
        {
            validator: (rule: any, value: string, callback: any) => {
                if (value !== inputFormRef.value?.getInputValue()?.password) {
                    callback(new Error("两次输入密码不一致"));
                }
                callback();
            }
        }
    ],
    email: [
        { required: true, message: "请输入邮箱地址" },
        { type: "email", message: "请输入正确的邮箱地址" }
    ],
    phone: [
        { required: true, message: "请输入手机号" },
        { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" }
    ]
};
const handleReset = () => {
    inputFormRef.value?.getFormRef().resetFields();
    formData.value = {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: ""
    };
};

const handleSubmit = async (data: any) => {
    await inputFormRef.value?.validate();
    ElMessage.success("提交数据:" + JSON.stringify(inputFormRef.value?.getInputValue()));
};
</script>
<style scoped>
.button-panel {
    margin-top: 24px;
    text-align: center;
}
</style>

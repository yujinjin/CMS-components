<template>
    <div class="demo-box">
        <el-button type="primary" @click="handleOpen">打开表单</el-button>

        <dialog-form v-if="visible" ref="dialogFormRef" :input-form-props="inputFormData" :dialog-props="{ title: '用户注册' }" :buttons="buttons" @close="visible = false" />
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { type DialogFormRef, type DialogFormButton, type InputFormProps, DialogForm } from "@yujinjin/cms-components/index";

const visible = ref(false);

const dialogFormRef = ref<DialogFormRef>();

const inputFormData = reactive<InputFormProps>({
    isLoading: false,
    value: {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: ""
    },
    fields: [
        { name: "username", label: "用户名", type: "input", rules: [{ required: true, message: "请输入用户名" }] },
        { name: "password", label: "密码", props: { type: "password" }, rules: [{ required: true, message: "请输入密码" }] },
        {
            name: "confirmPassword",
            label: "确认密码",
            type: "input",
            props: { type: "password" },
            rules: [
                { required: true, message: "请确认密码" },
                {
                    validator: (rule: any, value: string) => {
                        if (value !== dialogFormRef.value?.getInputValue().password) {
                            return new Error("两次输入密码不一致");
                        }
                        return true;
                    }
                }
            ]
        },
        {
            name: "email",
            label: "邮箱",
            type: "input",
            rules: [
                { required: true, message: "请输入邮箱地址" },
                { type: "email", message: "请输入正确的邮箱地址" }
            ]
        },
        {
            name: "phone",
            label: "手机号",
            type: "input",
            rules: [
                { required: true, message: "请输入手机号" },
                { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" }
            ]
        }
    ]
});

const handleOpen = () => {
    visible.value = true;
};

const handleSubmit = async (data: any) => {
    await dialogFormRef.value?.validate();
    ElMessage.info("提交数据:" + JSON.stringify(data));
};

const handleCancel = () => {
    ElMessage.info("取消");
};

const buttons = ref<DialogFormButton[]>([
    { type: "primary", contents: "提交", click: handleSubmit },
    { type: "danger", contents: "取消", click: handleCancel }
]);
</script>

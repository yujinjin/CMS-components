<template>
    <div class="demo-box">
        <input-form ref="inputFormRef" :value="formData" :fields="fields" label-width="100px" />
        <div class="button-panel">
            <el-button type="primary" @click="handleValidate">验证表单</el-button>
            <el-button @click="handleGetValue">获取表单数据</el-button>
            <el-button @click="handleSetValue">设置字段值</el-button>
            <el-button @click="handleChangeFields">动态修改字段</el-button>
        </div>
        <div v-if="resultInfo" class="result-info">
            <p>{{ resultInfo }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type InputFormField, type InputFormRef } from "@yujinjin/cms-components-main/index";

const inputFormRef = ref<InputFormRef>();
const resultInfo = ref("");

const formData = ref<Record<string, any>>({
    name: "张三",
    age: 18,
    email: "test@example.com"
});

const fields: InputFormField[] = [
    { name: "name", label: "姓名", type: "input", rules: [{ required: true, message: "请输入姓名" }] },
    { name: "age", label: "年龄", type: "inputNumber" },
    { name: "email", label: "邮箱", type: "input" }
];

const handleValidate = async () => {
    try {
        await inputFormRef.value?.validate();
        ElMessage.success("验证通过");
        resultInfo.value = "验证通过";
    } catch {
        ElMessage.error("验证失败");
        resultInfo.value = "验证失败";
    }
};

const handleGetValue = () => {
    const value = inputFormRef.value?.getInputValue();
    resultInfo.value = `表单数据: ${JSON.stringify(value)}`;
};

const handleSetValue = () => {
    inputFormRef.value?.setInputPropertyValue("name", "李四");
    resultInfo.value = "已设置 name 为 '李四'";
};

const handleChangeFields = () => {
    inputFormRef.value?.changeFormFields(formFields => {
        // 动态隐藏 email 字段
        const emailField = formFields.find(f => f.name === "email");
        if (emailField) {
            emailField.isShow = false;
        }
    });
    resultInfo.value = "已隐藏 email 字段";
};
</script>
<style scoped>
.button-panel {
    margin-top: 16px;
    padding-left: 100px;
}

.result-info {
    margin-top: 12px;
    padding: 12px;
    background-color: #f5f7fa;
    border-radius: 4px;
}

.result-info p {
    margin: 0;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
</style>

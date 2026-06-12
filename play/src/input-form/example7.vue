<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2026-06-11 10:00:00
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2026-06-11 10:00:00
 * @项目的路径: \CMS-components\play\src\input-form\example7.vue
 * @描述: input-form组件的expose方法演示示例
-->
<template>
    <div class="example-page">
        <h3>expose 方法演示</h3>
        <p class="demo-desc">展示 InputFormRef 的所有 expose 方法：getInputValue、setInputPropertyValue、changeFormFields、validate、getFormRef</p>
        <input-form ref="inputFormRef" :value="formData" :fields="fields" label-width="100px" />

        <div class="button-panel">
            <el-button type="primary" @click="handleGetInputValue">getInputValue</el-button>
            <el-button type="success" @click="handleSetInputPropertyValue">setInputPropertyValue</el-button>
            <el-button type="warning" @click="handleChangeFormFields">changeFormFields</el-button>
            <el-button type="danger" @click="handleValidate">validate</el-button>
            <el-button type="info" @click="handleGetFormRef">getFormRef</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type InputFormField, type InputFormRef, InputForm } from "@yujinjin/cms-components-main/index";

// 获取 inputForm 实例引用
const inputFormRef = ref<InputFormRef>();

// 表单数据
const formData = ref({
    name: "",
    age: null,
    gender: "",
    birthday: ""
});

// 表单字段配置
const fields: InputFormField[] = [
    { name: "name", label: "姓名", type: "input", rules: [{ required: true, message: "请输入姓名" }] },
    { name: "age", label: "年龄", type: "inputNumber" },
    {
        name: "gender",
        label: "性别",
        type: "select",
        data: [
            { label: "男", value: "male" },
            { label: "女", value: "female" }
        ]
    },
    { name: "birthday", label: "生日", type: "datePicker" }
];

/** 获取表单值 */
const handleGetInputValue = () => {
    const value = inputFormRef.value?.getInputValue();
    ElMessage.info("getInputValue: " + JSON.stringify(value));
};

/** 设置表单属性值 */
const handleSetInputPropertyValue = () => {
    inputFormRef.value?.setInputPropertyValue("name", "张三");
    inputFormRef.value?.setInputPropertyValue("gender", "male");
    ElMessage.success("已设置 name=张三, gender=male");
};

/** 修改表单字段属性 */
const handleChangeFormFields = () => {
    inputFormRef.value?.changeFormFields(formFields => {
        // 隐藏生日字段
        const birthdayField = formFields.find(f => f.name === "birthday");
        if (birthdayField) {
            birthdayField.isShow = !birthdayField.isShow;
        }
    });
    ElMessage.info("已切换 birthday 字段的显示状态");
};

/** 表单验证 */
const handleValidate = async () => {
    try {
        await inputFormRef.value?.validate();
        ElMessage.success("验证通过");
    } catch {
        ElMessage.error("验证失败");
    }
};

/** 获取 form ref */
const handleGetFormRef = () => {
    const formRef = inputFormRef.value?.getFormRef();
    ElMessage.info("getFormRef: " + (formRef ? "已获取 FormInstance" : "未获取到（组件未挂载）"));
};
</script>

<template>
    <div class="demo-box">
        <input-form :value="formData" :fields="fields" :is-loading="loading" label-width="100px" />
        <el-button @click="toggleLoading">切换加载状态</el-button>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type InputFormField } from "@yujinjin/cms-components-main/index";

const loading = ref(false);

const toggleLoading = () => {
    loading.value = !loading.value;
};

const formData = ref({
    name: "",
    age: null,
    email: ""
});

const fields: InputFormField[] = [
    { name: "name", label: "姓名", type: "input", rules: [{ required: true, message: "请输入姓名" }] },
    { name: "age", label: "年龄", type: "inputNumber" },
    { name: "email", label: "邮箱", type: "input" }
];
</script>

<template>
    <div class="demo-box">
        <input-form :value="formData" :fields="fields" label-width="120px" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type InputFormField } from "@yujinjin/cms-components/index";

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

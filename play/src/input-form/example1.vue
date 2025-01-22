<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:28:15
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-17 09:53:41
 * @项目的路径: \CMS-components\play\src\input-form\example1.vue
 * @描述: input-form组件的基础用法示例
-->
<template>
    <div class="example-page">
        <h3>基础用法</h3>
        <input-form :value="formData" :fields="fields" label-width="120px" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type InputFormField, InputForm } from "@yujinjin/cms-components/index";

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
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

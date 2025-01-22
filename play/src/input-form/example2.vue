<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:28:50
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-17 11:40:14
 * @项目的路径: \CMS-components\play\src\input-form\example2.vue
 * @描述: input-form组件的不同类型的表单项示例
-->
<template>
    <div class="example-page">
        <h3>不同类型的表单项</h3>
        <input-form :value="formData" :fields="fields" label-width="100px" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type InputFormField, InputForm } from "@yujinjin/cms-components/index";
import img from "./head-photo-04.jpg";

const formData = ref({
    name: "",
    gender: "",
    birthday: "",
    hobbies: [],
    avatar: "",
    description: ""
});

const uploadRequest = async (file: File) => {
    return img;
};

const fields: InputFormField[] = [
    { name: "name", label: "姓名", type: "input", rules: [{ required: true, message: "请输入姓名" }] },
    {
        name: "gender",
        label: "性别",
        type: "radio",
        data: [
            { label: "男", value: "male" },
            { label: "女", value: "female" }
        ]
    },
    { name: "birthday", label: "生日", type: "datePicker" },
    {
        name: "hobbies",
        label: "爱好",
        type: "checkbox",
        data: [
            { label: "阅读", value: "reading" },
            { label: "运动", value: "sports" },
            { label: "音乐", value: "music" }
        ]
    },
    { name: "avatar", label: "头像", type: "imgUpload", props: { uploadRequest } },
    { name: "description", label: "描述", props: { type: "textarea" } }
];
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

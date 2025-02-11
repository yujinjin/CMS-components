<template>
    <div class="demo-box">
        <input-form :value="formData" :fields="fields" label-width="100px" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type InputFormField } from "@yujinjin/cms-components/index";
import { withBase } from "vitepress";

const formData = ref({
    name: "",
    gender: "",
    birthday: "",
    hobbies: [],
    avatar: "",
    description: ""
});

const uploadRequest = async (file: File) => {
    return withBase("/03.jpeg");
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

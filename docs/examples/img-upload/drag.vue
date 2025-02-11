<template>
    <div class="demo-box">
        <img-upload v-model="values" :upload-request="uploadRequest" :upload-props="{ drag: true }">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                Drop file here or
                <em>click to upload</em>
            </div>
        </img-upload>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { withBase } from "vitepress";

const values = ref(withBase("/03.jpeg") + "|" + withBase("/03.jpeg"));

const uploadRequest = async (file: File) => {
    return withBase("/03.jpeg");
};
</script>

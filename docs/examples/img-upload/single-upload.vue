<template>
    <div class="demo-box">
        <p>单图上传（limit=1）：</p>
        <img-upload v-model="singleValue" :upload-request="uploadRequest" :upload-props="{ limit: 1 }" />
        <p class="value-info">当前值（字符串）：{{ singleValue }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { withBase } from "vitepress";

const singleValue = ref("");

const uploadRequest = async (file: File) => {
    return withBase("/03.jpeg");
};
</script>
<style scoped>
.value-info {
    margin-top: 8px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
</style>

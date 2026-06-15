<template>
    <div class="demo-box">
        <p>限制上传大小为 500KB：</p>
        <img-upload v-model="values" :upload-request="uploadRequest" :max-size="500" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { withBase } from "vitepress";

const values = ref([]);

const uploadRequest = async (file: File) => {
    return withBase("/03.jpeg");
};
</script>

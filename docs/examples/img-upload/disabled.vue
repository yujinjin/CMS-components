<template>
    <div class="demo-box">
        <p>禁用状态：</p>
        <img-upload v-model="values" :upload-request="uploadRequest" :upload-props="{ disabled: true }" />
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

<template>
    <div class="demo-box">
        <img-upload v-model="values" :upload-request="uploadRequest" />
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

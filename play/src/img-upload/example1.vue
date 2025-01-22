<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-19 16:10:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-13 10:30:26
 * @项目的路径: \CMS-components\play\src\img-upload\example1.vue
 * @描述: img-upload组件的基础用法示例
-->
<template>
    <div class="example-page">
        <h3>基础用法</h3>
        <img-upload v-model="values" :upload-request="uploadRequest" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ImgUpload } from "@yujinjin/cms-components/index";
import img from "./03.jpeg";

const values = ref([]);

const uploadRequest = async (file: File) => {
    return img;
};
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

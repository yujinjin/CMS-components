<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:31:05
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 10:53:55
 * @项目的路径: \CMS-components\play\src\img-upload\example3.vue
 * @描述: img-upload组件的图片裁剪示例
-->
<template>
    <div class="example-page">
        <h3>图片裁剪</h3>
        <img-upload v-model="values" :upload-request="uploadRequest" cropper-props />
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

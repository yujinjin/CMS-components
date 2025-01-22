<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:31:43
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 10:54:18
 * @项目的路径: \CMS-components\play\src\img-upload\example4.vue
 * @描述: img-upload组件的自定义裁剪参数示例
-->
<template>
    <div class="example-page">
        <h3>自定义裁剪参数</h3>
        <img-upload
            v-model="values"
            :upload-request="uploadRequest"
            :cropper-props="{
                aspectRatio: 16 / 9,
                minCropBoxWidth: 200,
                minCropBoxHeight: 200
            }"
        />
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

<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-19 16:10:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-13 10:30:26
 * @项目的路径: \CMS-components\play\src\img-upload\example3.vue
 * @描述: img-upload组件图片裁剪示例
-->
<template>
    <div class="example-page">
        <h3>图片裁剪</h3>
        <p class="demo-desc">设置 cropperProps 启用图片裁剪功能</p>
        <div class="demo-block">
            <img-upload v-model="values" :upload-request="uploadRequest" :cropper-props="{ aspectRatio: 1 }" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ImgUpload } from "@yujinjin/cms-components-main/index";
import img from "./03.jpeg";

const values = ref([]);

const uploadRequest = async (file: File) => {
    return img;
};
</script>

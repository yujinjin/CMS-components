<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-19 16:10:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-13 10:30:26
 * @项目的路径: \CMS-components\play\src\img-upload\example5.vue
 * @描述: img-upload组件拖拽上传示例
-->
<template>
    <div class="example-page">
        <h3>拖拽上传</h3>
        <p class="demo-desc">通过 uploadProps.drag 启用拖拽上传模式</p>
        <div class="demo-block">
            <img-upload v-model="values" :upload-request="uploadRequest" :upload-props="{ drag: true }" />
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

<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-19 16:10:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-13 10:30:26
 * @项目的路径: \CMS-components\play\src\img-upload\example2.vue
 * @描述: img-upload组件限制上传数量示例
-->
<template>
    <div class="example-page">
        <h3>限制上传数量</h3>
        <p class="demo-desc">通过 uploadProps.limit 限制最大上传数量</p>
        <div class="demo-block">
            <img-upload v-model="values" :upload-request="uploadRequest" :upload-props="{ limit: 3 }" />
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

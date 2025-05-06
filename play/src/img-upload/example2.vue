<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:30:32
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 10:52:46
 * @项目的路径: \CMS-components\play\src\img-upload\example2.vue
 * @描述: img-upload组件的限制上传数量示例
-->
<template>
    <div class="example-page">
        <h3>限制上传数量</h3>
        <img-upload v-model="values" :upload-request="uploadRequest" :upload-props="{ limit: 3 }" />
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
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

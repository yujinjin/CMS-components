<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:34:31
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 11:20:24
 * @项目的路径: \CMS-components\play\src\img-upload\example5.vue
 * @描述: img-upload组件的拖拽上传示例
-->
<template>
    <div class="example-page">
        <h3>拖拽上传</h3>
        <img-upload v-model="values" :upload-request="uploadRequest" :upload-props="{ drag: true }">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                Drop file here or
                <em>click to upload</em>
            </div>
        </img-upload>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ImgUpload } from "@yujinjin/cms-components-main/index";
import { UploadFilled } from "@element-plus/icons-vue";
import img from "./03.jpeg";

const values = ref([img, img]);

const uploadRequest = async (file: File) => {
    return img;
};
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

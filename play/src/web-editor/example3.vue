<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:13:11
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 15:00:37
 * @项目的路径: \CMS-components\play\src\web-editor\example3.vue
 * @描述: web-editor组件的图片上传示例
-->
<template>
    <div class="example-page">
        <h3>图片上传</h3>
        <web-editor v-model="content" :on-img-upload="handleUploadImage" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { WebEditor } from "@yujinjin/cms-components/index";

const content = ref("<p>这是一个支持图片上传的富文本编辑器示例</p>");

const handleUploadImage = async (file: File) => {
    // 这里是上传图片的逻辑，这里只是模拟上传
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
            resolve(e.target!.result as string);
            ElMessage.success("图片上传成功");
        };
        reader.onerror = e => {
            reject(e);
            ElMessage.error("图片上传失败");
        };
        reader.readAsDataURL(file);
    });
};
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

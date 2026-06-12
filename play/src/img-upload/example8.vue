<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: img-upload 组件 - 禁用与大小限制示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>禁用状态</h3>
            <p class="demo-desc">设置 disabled 属性禁用上传操作，用户无法添加或删除图片</p>
            <div class="demo-block">
                <img-upload v-model="disabledValues" :upload-request="uploadRequest" disabled />
            </div>
        </div>

        <div class="demo-section">
            <h3>文件大小限制</h3>
            <p class="demo-desc">通过 uploadProps.size 限制上传文件大小（单位 KB），超出限制时提示错误</p>
            <div class="demo-block">
                <img-upload v-model="sizeLimitValues" :upload-request="uploadRequest" :upload-props="{ size: 100 }" />
            </div>
        </div>

        <div class="demo-section">
            <h3>禁用 + 大小限制组合</h3>
            <p class="demo-desc">同时设置禁用和大小限制，适用于只读预览场景</p>
            <div class="demo-block">
                <img-upload v-model="combinedValues" :upload-request="uploadRequest" disabled :upload-props="{ size: 100 }" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ImgUpload } from "@yujinjin/cms-components-main/index";
import img from "./03.jpeg";

const disabledValues = ref([img]);
const sizeLimitValues = ref([]);
const combinedValues = ref([img]);

const uploadRequest = async (file: File) => {
    return img;
};
</script>

<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: img-upload 组件 - 单图上传示例（limit:1, 字符串 modelValue）
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>单图上传（limit: 1）</h3>
            <p class="demo-desc">设置 limit 为 1 时，只能上传一张图片，modelValue 为字符串类型而非数组</p>
            <div class="demo-block">
                <img-upload v-model="stringValue" :upload-request="uploadRequest" :upload-props="{ limit: 1 }" />
                <div class="value-display">字符串 modelValue：{{ stringValue }}</div>
            </div>
        </div>

        <div class="demo-section">
            <h3>单图上传（有初始值）</h3>
            <p class="demo-desc">已有图片时再次上传会替换原图</p>
            <div class="demo-block">
                <img-upload v-model="stringValueWithInit" :upload-request="uploadRequest" :upload-props="{ limit: 1 }" />
                <div class="value-display">字符串 modelValue：{{ stringValueWithInit }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ImgUpload } from "@yujinjin/cms-components-main/index";
import img from "./03.jpeg";

const stringValue = ref("");
const stringValueWithInit = ref(img);

const uploadRequest = async (file: File) => {
    return img;
};
</script>

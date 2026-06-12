<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: img-upload 组件 - 数组模式与自定义分隔符示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>数组 modelValue</h3>
            <p class="demo-desc">modelValue 为数组类型时，每个元素是一个图片 URL。与字符串模式（用分隔符拼接）不同</p>
            <div class="demo-block">
                <img-upload v-model="arrayValues" :upload-request="uploadRequest" :upload-props="{ limit: 3 }" />
                <div class="value-display">数组 modelValue：{{ arrayValues }}</div>
            </div>
        </div>

        <div class="demo-section">
            <h3>自定义分隔符</h3>
            <p class="demo-desc">默认分隔符为 "|"，可通过 separator prop 自定义。字符串 modelValue 中多个 URL 用分隔符连接</p>
            <div class="demo-block">
                <img-upload v-model="separatorValues" :upload-request="uploadRequest" separator="," :upload-props="{ limit: 3 }" />
                <div class="value-display">字符串 modelValue（逗号分隔）：{{ separatorValues }}</div>
            </div>
        </div>

        <div class="demo-section">
            <h3>字符串 modelValue（默认分隔符）</h3>
            <p class="demo-desc">默认分隔符 "|" 拼接多个图片 URL</p>
            <div class="demo-block">
                <img-upload v-model="stringValues" :upload-request="uploadRequest" :upload-props="{ limit: 3 }" />
                <div class="value-display">字符串 modelValue（|分隔）：{{ stringValues }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ImgUpload } from "@yujinjin/cms-components-main/index";
import img from "./03.jpeg";

const arrayValues = ref<string[]>([img]);
const separatorValues = ref(img);
const stringValues = ref(img);

const uploadRequest = async (file: File) => {
    return img;
};
</script>

<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:11:31
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 14:30:35
 * @项目的路径: \CMS-components\play\src\web-editor\example1.vue
 * @描述: web-editor组件的基础用法示例
-->
<template>
    <div class="example-page">
        <h3>基础用法</h3>
        <web-editor v-model="content" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { WebEditor } from "@yujinjin/cms-components-main/index";

const content = ref("<p>这是一个基础的富文本编辑器示例</p>");
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

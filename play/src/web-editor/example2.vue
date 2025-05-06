<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:14:38
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 15:11:34
 * @项目的路径: \CMS-components\play\src\web-editor\example2.vue
 * @描述: web-editor组件的自定义高度示例
-->
<template>
    <div class="example-page">
        <h3>自定义高度</h3>
        <web-editor v-model="content" style="min-height: 200px; max-height: 400px" placeholder="请输入内容..." />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { WebEditor } from "@yujinjin/cms-components-main/index";

const content = ref("");
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

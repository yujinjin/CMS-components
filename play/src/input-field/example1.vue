<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-26 11:07:34
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 20:43:00
 * @项目的路径: \CMS-components\play\src\input-field\example1.vue
 * @描述: input-field组件的基础用法示例
-->
<template>
    <div class="example-page">
        <h3>基础用法</h3>
        <input-field v-model="value" placeholder="请输入" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { InputField } from "@yujinjin/cms-components-main/index";

const value = ref("");
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;

    :deep(.el-input) {
        width: 350px;
    }
}
</style>

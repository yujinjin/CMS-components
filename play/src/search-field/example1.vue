<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:19:17
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 15:18:48
 * @项目的路径: \CMS-components\play\src\search-field\example1.vue
 * @描述: search-field组件的基础用法示例
-->
<template>
    <div class="example-page">
        <h3>基础用法</h3>
        <search-field v-model="value" placeholder="请输入搜索内容" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { SearchField } from "@yujinjin/cms-components-main/index";

const value = ref("");
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

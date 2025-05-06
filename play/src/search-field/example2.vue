<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:21:13
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 15:33:41
 * @项目的路径: \CMS-components\play\src\search-field\example2.vue
 * @描述: search-field组件的不同尺寸示例
-->
<template>
    <div class="example-page">
        <h3>不同尺寸</h3>
        <div class="demo-block">
            <search-field v-model="value" size="large" placeholder="大尺寸" />
            <search-field v-model="value" placeholder="默认尺寸" />
            <search-field v-model="value" size="small" placeholder="小尺寸" />
        </div>
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
.demo-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>

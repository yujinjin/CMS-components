<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:21:13
 * @最后修改作者: yujinjin-jk
 * @最后修改时间: 2026-06-11
 * @项目的路径: \CMS-components\play\src\search-field\example2.vue
 * @描述: search-field组件的不同尺寸示例
-->
<template>
    <div class="example-page">
        <!-- 不同尺寸 -->
        <section class="demo-section">
            <h3>不同尺寸</h3>
            <p class="demo-desc">通过 size 属性控制搜索字段尺寸</p>
            <div class="demo-block">
                <search-field v-model="value" size="large" placeholder="大尺寸" />
                <search-field v-model="value" placeholder="默认尺寸" />
                <search-field v-model="value" size="small" placeholder="小尺寸" />
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { SearchField } from "@yujinjin/cms-components-main/index";

const value = ref("");
</script>
<style lang="scss" scoped>
.demo-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>

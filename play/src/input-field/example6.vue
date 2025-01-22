<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:43:02
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 14:28:42
 * @项目的路径: \CMS-components\play\src\input-field\example6.vue
 * @描述: input-field组件的不同尺寸示例
-->
<template>
    <div class="example-page">
        <h3>不同尺寸</h3>
        <div class="demo-block">
            <input-field v-model="value" size="large" placeholder="大尺寸" />
            <input-field v-model="value" placeholder="默认尺寸" />
            <input-field v-model="value" size="small" placeholder="小尺寸" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { InputField } from "@yujinjin/cms-components/index";

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

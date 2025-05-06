<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:01:39
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-13 16:17:05
 * @项目的路径: \CMS-components\play\src\check-select\example2.vue
 * @描述: check-select组件禁用选项示例
-->
<template>
    <div class="example-page">
        <h3>禁用选项</h3>
        <check-select v-model="values" :data="data" option-value-key="id" option-label-key="name" />
    </div>
</template>
<script setup lang="ts">
import { CheckSelect } from "@yujinjin/cms-components-main/index";
import { ref } from "vue";

const values = ref(["1", "2"]);
const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (value, index) => ({ id: index.toString(), name: `option ${index}`, disabled: true }));
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

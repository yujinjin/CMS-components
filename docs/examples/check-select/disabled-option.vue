<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-15 11:35:56
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-15 14:25:38
 * @项目的路径: \CMS-components\docs\examples\check-select\disabled-option.vue
 * @描述: check-select 禁用选项示例
-->
<template>
    <div class="demo-box">
        <check-select v-model="value" :data="data" option-value-key="id" option-label-key="name" style="width: 240px" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const value = ref();
const data: Array<{ id: string; name: string; disabled: boolean }> = Array.from({ length: 20 }, (value, index) => ({
    id: `option${index}`,
    name: `选项 ${index}`,
    disabled: index % 2 === 0
}));
</script>
<style lang="scss" scoped>
.demo-box {
    padding: 12px;
}
</style>

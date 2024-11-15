<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-15 11:35:56
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-15 16:01:19
 * @项目的路径: \CMS-components\docs\examples\check-select\basic.vue
 * @描述: check-select基础示例
-->
<template>
    <div class="demo-box">
        <check-select v-model="value" :data="data" style="width: 240px" />

        <check-select v-model="value" :data="data2" style="width: 240px" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const value = ref(["1", "2"]);
const data: Array<string> = Array.from({ length: 10 }, (value, index) => `option ${index}`);

const data2: Array<{ value: string; label: string }> = Array.from({ length: 10 }, (value, index) => ({ value: index.toString(), label: `选项 ${index}` }));
</script>
<style lang="scss" scoped>
.demo-box {
    padding: 12px;
}
</style>

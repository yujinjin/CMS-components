<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-05 10:10:53
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-05 17:08:28
 * @项目的路径: \CMS-components\play\src\check-select\example1.vue
 * @描述: check-select组件实例
-->
<template>
    <div class="example-page">
        <check-select v-model="values" :data="data" option-value-key="id" option-label-key="name" />
    </div>
</template>
<script setup lang="ts">
import { CheckSelect } from "@yujinjin/cms-components/index";
import { ref } from "vue";

const values = ref(["1", "2"]);
const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (value, index) => ({ id: index.toString(), name: `option ${index}` }));

setTimeout(() => {
    // eslint-disable-next-line no-console
    console.info(">>>>>>>>>", values.value);
}, 1000);
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

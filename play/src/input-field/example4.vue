<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:41:45
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 20:58:50
 * @项目的路径: \CMS-components\play\src\input-field\example4.vue
 * @描述: input-field组件的日期时间类型示例
-->
<template>
    <div class="example-page">
        <h3>日期时间类型</h3>
        <div class="demo-block">
            <input-field v-model="value1" type="datePicker" placeholder="选择日期" />
            <input-field v-model="value2" type="datePicker" :props="{ type: 'datetime' }" placeholder="选择日期时间" />
            <input-field v-model="value3" type="timePicker" placeholder="选择时间" />
            <input-field v-model="value4" type="datePicker" :props="{ type: 'daterange' }" start-placeholder="开始日期" end-placeholder="结束日期" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { InputField } from "@yujinjin/cms-components-main/index";

const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
const value4 = ref([]);
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

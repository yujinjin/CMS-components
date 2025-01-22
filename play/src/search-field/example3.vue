<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:24:21
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 21:55:18
 * @项目的路径: \CMS-components\play\src\search-field\example5.vue
 * @描述: search-field组件的自定义前后缀示例
-->
<template>
    <div class="example-page">
        <h3>不同的类型</h3>
        <div class="demo-block">
            <search-field v-model="value1" type="select" :data="options" placeholder="下拉选择" />
            <search-field v-model="value2" type="inputNumber" placeholder="数字输入" />
            <search-field v-model="value3" type="checkSelect" :data="options" placeholder="多选下拉" />
            <search-field v-model="value4" type="datePicker" :props="{ type: 'daterange' }" start-placeholder="开始日期" end-placeholder="结束日期" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { SearchField } from "@yujinjin/cms-components/index";

const value1 = ref("");
const value2 = ref();
const value3 = ref([]);
const value4 = ref([]);

const options = [
    { label: "选项1", value: "1" },
    { label: "选项2", value: "2" },
    { label: "选项3", value: "3" }
];
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

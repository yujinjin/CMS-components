<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:40:44
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 11:49:54
 * @项目的路径: \CMS-components\play\src\input-field\example3.vue
 * @描述: input-field组件的选择类型示例
-->
<template>
    <div class="example-page">
        <h3>选择类型</h3>
        <div class="demo-block">
            <input-field v-model="value1" type="select" :data="options" placeholder="下拉选择" />
            <input-field v-model="value2" type="radio" :data="options" />
            <input-field v-model="value3" type="checkbox" :data="options" />
            <input-field v-model="value4" type="checkSelect" :data="options" placeholder="多选下拉" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { InputField } from "@yujinjin/cms-components-main/index";

const value1 = ref("");
const value2 = ref("");
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

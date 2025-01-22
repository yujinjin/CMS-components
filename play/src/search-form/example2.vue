<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:38:44
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-17 17:50:48
 * @项目的路径: \CMS-components\play\src\search-form\example2.vue
 * @描述: search-form组件的展开收起示例
-->
<template>
    <div class="example-page">
        <h3>展开收起</h3>
        <search-form :fields="fields" />
    </div>
</template>
<script setup lang="ts">
import { type SearchFormField, SearchForm } from "@yujinjin/cms-components/index";

const fields: SearchFormField[] = [
    { name: "name", label: "名称", type: "input" },
    {
        name: "status",
        label: "状态",
        type: "select",
        data: [
            { label: "启用", value: "1" },
            { label: "禁用", value: "0" }
        ]
    },
    {
        name: "type",
        label: "类型",
        type: "select",
        data: [
            { label: "类型1", value: "1" },
            { label: "类型2", value: "2" }
        ]
    },
    { name: "date", label: "日期", type: "datePicker" },
    { name: "category", label: "分类", type: "input" },
    { name: "tag", label: "标签", type: "input" },
    { name: "price", label: "价格", type: "inputNumber" }
];
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:36:21
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-20 10:06:58
 * @项目的路径: \CMS-components\play\src\search-form\example1.vue
 * @描述: search-form组件的基础用法示例
-->
<template>
    <div class="example-page">
        <h3>基础用法</h3>
        <search-form :fields="fields" :is-show-collapse="false" @search="handleSearch" />
    </div>
</template>
<script setup lang="ts">
import { type SearchFormField, SearchForm } from "@yujinjin/cms-components/index";

const fields: SearchFormField[] = [
    { name: "keyword", label: "关键词", type: "input" },
    {
        name: "status",
        label: "状态",
        type: "select",
        value: "1",
        data: [
            { label: "启用", value: "1" },
            { label: "禁用", value: "0" }
        ]
    },
    { name: "date", label: "日期", defaultValue: new Date(), type: "datePicker" }
];

const handleSearch = (data: any) => {
    console.log("搜索数据:", data);
};
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

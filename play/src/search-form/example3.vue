<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:40:05
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-17 17:49:50
 * @项目的路径: \CMS-components\play\src\search-form\example3.vue
 * @描述: search-form组件的自定义按钮示例
-->
<template>
    <div class="example-page">
        <h3>自定义按钮</h3>
        <search-form :fields="fields" :buttons="buttons" @search="handleSearch"></search-form>
    </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { type SearchFormField, type SearchFormButton, SearchForm } from "@yujinjin/cms-components-main/index";

const fields: SearchFormField[] = [
    { name: "keyword", label: "关键词", type: "input" },
    {
        name: "status",
        label: "状态",
        type: "select",
        data: [
            { label: "启用", value: "1" },
            { label: "禁用", value: "0" }
        ]
    },
    { name: "date", label: "日期", type: "datePicker" }
];

const handleSearch = (data: any) => {
    console.log("搜索数据:", data);
};

const handleExport = () => {
    ElMessage.success("开始导出数据");
};

const handleBatchDelete = () => {
    ElMessage.warning("请先选择要删除的数据");
};

const buttons: SearchFormButton[] = [
    { contents: "导出", type: "success", click: handleExport },
    { contents: "批量删除", type: "warning", click: handleBatchDelete }
];
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

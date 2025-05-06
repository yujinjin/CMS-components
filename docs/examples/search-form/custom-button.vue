<template>
    <div class="demo-box">
        <search-form :fields="fields" :buttons="buttons" @search="handleSearch"></search-form>
    </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { type SearchFormField, type SearchFormButton } from "@yujinjin/cms-components-main/index";

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
    ElMessage.success("搜索数据:" + JSON.stringify(data));
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

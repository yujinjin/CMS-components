<template>
    <div class="demo-box">
        <search-form :fields="fields" :is-show-collapse="false" @search="handleSearch" />
    </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { type SearchFormField } from "@yujinjin/cms-components/index";

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
    ElMessage.success("搜索数据:" + JSON.stringify(data));
};
</script>

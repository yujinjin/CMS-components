<template>
    <div class="demo-box">
        <search-form :fields="fields" />
    </div>
</template>
<script setup lang="ts">
import { type SearchFormField } from "@yujinjin/cms-components-main/index";

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

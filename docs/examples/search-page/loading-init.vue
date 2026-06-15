<template>
    <div class="demo-box">
        <p>isLoadingForInit=true 时，页面不会自动查询数据：</p>
        <el-button @click="handleInit">手动触发初始化查询</el-button>
        <search-page ref="searchPageRef" :is-loading-for-init="isLoadingForInit" :search-form-props="searchFormProps" :data-table-props="dataTableProps" />
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { type SearchFormProps, type DataTableProps, type SearchPageRef } from "@yujinjin/cms-components-main/index";

const isLoadingForInit = ref(true);
const searchPageRef = ref<SearchPageRef>();

const searchFormProps = reactive<SearchFormProps>({
    fields: [
        { name: "keyword", label: "关键词", type: "input" },
        {
            name: "status",
            label: "状态",
            type: "select",
            data: [
                { label: "启用", value: "1" },
                { label: "禁用", value: "0" }
            ]
        }
    ]
});

const dataTableProps: DataTableProps = {
    columns: [
        { prop: "id", label: "ID", width: 80 },
        { prop: "name", label: "名称" },
        { prop: "status", label: "状态" }
    ],
    query: async (params: any) => {
        console.log("查询参数:", params);
        return {
            rows: [
                { id: 1, name: "测试1", status: "启用" },
                { id: 2, name: "测试2", status: "禁用" }
            ],
            total: 2
        };
    }
};

const handleInit = () => {
    isLoadingForInit.value = false;
    searchPageRef.value?.query(true);
};
</script>

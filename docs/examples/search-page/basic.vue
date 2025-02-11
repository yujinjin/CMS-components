<template>
    <div class="demo-box">
        <search-page :search-form-props="searchFormProps" :data-table-props="dataTableProps" />
    </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { SearchPage, type SearchFormProps, type DataTableProps } from "@yujinjin/cms-components/index";

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
        { prop: "status", label: "状态" },
        { prop: "createTime", label: "创建时间" }
    ],
    query: async (params: any) => {
        console.log("查询参数:", params);
        // 模拟接口请求
        return {
            rows: [
                { id: 1, name: "测试1", status: "启用", createTime: "2024-01-01" },
                { id: 2, name: "测试2", status: "禁用", createTime: "2024-01-02" }
            ],
            total: 2
        };
    }
};
</script>

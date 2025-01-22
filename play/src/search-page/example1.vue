<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:55:27
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-20 15:26:55
 * @项目的路径: \CMS-components\play\src\search-page\example1.vue
 * @描述: search-page组件的基础用法示例
-->
<template>
    <div class="example-page">
        <h3>基础用法</h3>
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
        // 模拟接口请求
        console.log("查询参数:", params);
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
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

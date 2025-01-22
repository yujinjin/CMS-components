<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:57:20
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 10:32:54
 * @项目的路径: \CMS-components\play\src\search-page\example3.vue
 * @描述: search-page组件的自定义搜索项示例
-->
<template>
    <div class="example-page">
        <h3>自定义搜索项</h3>
        <search-page ref="searchPageRef" :search-form-props="searchFormProps" :action-bar-props="actionBarProps" :data-table-props="dataTableProps">
            <template #searchForm_custom="{ field }">
                <div class="custom-range">
                    <el-input-number v-model="field.value.min" :min="0" placeholder="最小值" />
                    <span class="separator">-</span>
                    <el-input-number v-model="field.value.max" :min="0" placeholder="最大值" />
                </div>
            </template>
        </search-page>
    </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { SearchPage, type SearchFormProps, type DataTableProps, type ActionBarProps } from "@yujinjin/cms-components/index";

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
        {
            name: "tags",
            label: "标签",
            type: "checkSelect",
            data: [
                { label: "标签1", value: "1" },
                { label: "标签2", value: "2" }
            ]
        },
        { name: "dateRange", label: "日期范围", props: { type: "daterange" }, type: "datePicker" },
        {
            name: "price",
            label: "价格区间",
            type: "inputNumber",
            props: {
                min: 0,
                max: 9999
            }
        },
        { name: "range", label: "范围", slot: "searchForm_custom", value: { min: null, max: null } }
    ]
});

const actionBarProps = reactive<ActionBarProps>({
    buttons: [
        {
            type: "success",
            contents: "新增",
            click: () => {
                ElMessage.success("点击了新增按钮");
            }
        },
        {
            type: "warning",
            contents: "导出",
            click: () => {
                ElMessage.success("点击了导出按钮");
            }
        }
    ]
});

const dataTableProps: DataTableProps = {
    columns: [
        { prop: "id", label: "ID", width: 80 },
        { prop: "name", label: "名称" },
        { prop: "type", label: "类型" },
        { prop: "status", label: "状态" },
        { prop: "price", label: "价格" },
        { prop: "createTime", label: "创建时间" }
    ],
    query: async (params: any) => {
        // 模拟接口请求
        console.log("查询参数:", params);
        return {
            rows: [
                { id: 1, name: "测试1", type: "类型1", status: "启用", price: 100, createTime: "2024-01-01" },
                { id: 2, name: "测试2", type: "类型2", status: "禁用", price: 200, createTime: "2024-01-02" }
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

<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: data-table 组件 - 无分页与查询加工示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>无分页模式</h3>
            <p class="demo-desc">设置 isShowPagination 为 false 时，不显示分页，query 返回完整数据数组</p>
            <data-table :query="queryAll" :columns="columns" :is-show-pagination="false" style="height: 250px" />
        </div>

        <div class="demo-section">
            <h3>查询参数加工</h3>
            <p class="demo-desc">queryParametersProcess 在查询前对参数进行加工，如添加默认参数、格式化日期等</p>
            <data-table :query="queryWithProcess" :columns="columns" :query-parameters-process="parametersProcess" style="height: 250px" />
        </div>

        <div class="demo-section">
            <h3>查询结果加工</h3>
            <p class="demo-desc">queryResponseProcess 在查询后对结果进行加工，如数据转换、字段映射等</p>
            <data-table :query="queryWithResponseProcess" :columns="columns" :query-response-process="responseProcess" style="height: 250px" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { DataTable } from "@yujinjin/cms-components-main/index";
import { type DataTableColumn } from "@yujinjin/cms-components-main/index";

const columns: DataTableColumn[] = [
    { prop: "id", label: "ID", width: 80 },
    { prop: "name", label: "名称" },
    { prop: "status", label: "状态" }
];

// 模拟数据
const mockData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `项目${i + 1}`,
    status: i % 3 === 0 ? "进行中" : i % 3 === 1 ? "已完成" : "待审核"
}));

// 无分页查询：返回完整数组
const queryAll = () => {
    return Promise.resolve(mockData);
};

// 查询参数加工
const queryWithProcess = (params: any) => {
    console.log("查询参数（加工后）:", params);
    const { pageNo, pageSize, ...rest } = params;
    return Promise.resolve({
        rows: mockData.slice((pageNo - 1) * pageSize, pageNo * pageSize),
        total: mockData.length
    });
};

const parametersProcess = (params: any) => {
    // 添加默认参数
    return { ...params, status: "active", timestamp: Date.now() };
};

// 查询结果加工
const queryWithResponseProcess = (params: any) => {
    const { pageNo = 1, pageSize = 20 } = params;
    return Promise.resolve({
        rows: mockData.slice((pageNo - 1) * pageSize, pageNo * pageSize),
        total: mockData.length
    });
};

const responseProcess = (data: any) => {
    // 对结果进行加工：给每行添加序号前缀
    if (data.rows) {
        data.rows = data.rows.map((row: any, index: number) => ({
            ...row,
            name: `[${index + 1}] ${row.name}`
        }));
    }
    return data;
};
</script>

<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: data-table 组件 - 自定义列插槽示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>自定义列内容（slot）</h3>
            <p class="demo-desc">通过 column 的 slot 属性指定插槽名称，自定义列的渲染内容</p>
            <data-table :query="query" :columns="slotColumns" style="height: 300px">
                <template #nameSlot="{ row }">
                    <el-tag :type="row.status === '进行中' ? 'primary' : row.status === '已完成' ? 'success' : 'warning'">
                        {{ row.name }}
                    </el-tag>
                </template>
                <template #statusSlot="{ row }">
                    <el-badge :type="row.status === '进行中' ? 'primary' : row.status === '已完成' ? 'success' : 'warning'" is-dot />
                    <span style="margin-left: 6px">{{ row.status }}</span>
                </template>
            </data-table>
        </div>

        <div class="demo-section">
            <h3>自定义列头（slotHeader）</h3>
            <p class="demo-desc">通过 column 的 slotHeader 属性指定插槽名称，自定义列头的渲染内容</p>
            <data-table :query="query" :columns="headerSlotColumns" style="height: 300px">
                <template #nameHeader>
                    <span style="color: #409eff; font-weight: bold">名称 (自定义列头)</span>
                </template>
                <template #statusHeader>
                    <el-tooltip content="项目的当前处理状态" placement="top">
                        <span style="cursor: help; color: #e6a23c">状态 (?)</span>
                    </el-tooltip>
                </template>
            </data-table>
        </div>
    </div>
</template>
<script setup lang="ts">
import { DataTable } from "@yujinjin/cms-components-main/index";
import { type DataTableColumn } from "@yujinjin/cms-components-main/index";

const mockData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `项目${i + 1}`,
    status: i % 3 === 0 ? "进行中" : i % 3 === 1 ? "已完成" : "待审核"
}));

const query = (params: any) => {
    const { pageNo = 1, pageSize = 20 } = params;
    return Promise.resolve({
        rows: mockData.slice((pageNo - 1) * pageSize, pageNo * pageSize),
        total: mockData.length
    });
};

const slotColumns: DataTableColumn[] = [
    { prop: "id", label: "ID", width: 80 },
    { prop: "name", label: "名称", slot: "nameSlot" },
    { prop: "status", label: "状态", slot: "statusSlot" }
];

const headerSlotColumns: DataTableColumn[] = [
    { prop: "id", label: "ID", width: 80 },
    { prop: "name", label: "名称", slotHeader: "nameHeader" },
    { prop: "status", label: "状态", slotHeader: "statusHeader" }
];
</script>

<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: data-table 组件 - 空数据与手动查询示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>空数据状态</h3>
            <p class="demo-desc">query 返回空数据时，表格显示空状态</p>
            <data-table :query="queryEmpty" :columns="columns" style="height: 250px" />
        </div>

        <div class="demo-section">
            <h3>手动查询（autoInitQuery: false）</h3>
            <p class="demo-desc">设置 autoInitQuery 为 false 时，表格不自动查询。需要手动调用 queryDataList 触发</p>
            <el-button type="primary" @click="manualQuery">手动查询</el-button>
            <el-button @click="manualQueryInit">查询并重置页码</el-button>
            <data-table ref="dataTableRef" :query="queryManual" :columns="columns" :auto-init-query="false" style="height: 250px" />
        </div>

        <div class="demo-section">
            <h3>search 事件</h3>
            <p class="demo-desc">查询开始/结束时触发 search 事件，参数为 boolean（true=正在查询，false=查询完成）</p>
            <data-table :query="queryWithDelay" :columns="columns" style="height: 250px" @search="handleSearch" />

            <div class="event-log">
                <h4>事件日志：</h4>
                <ul>
                    <li v-for="(log, index) in eventLogs" :key="index">{{ log }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type DataTableColumn, type DataTableRef, DataTable } from "@yujinjin/cms-components-main/index";

const columns: DataTableColumn[] = [
    { prop: "id", label: "ID", width: 80 },
    { prop: "name", label: "名称" },
    { prop: "status", label: "状态" }
];

const dataTableRef = ref<DataTableRef>();

const mockData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `项目${i + 1}`,
    status: i % 3 === 0 ? "进行中" : i % 3 === 1 ? "已完成" : "待审核"
}));

// 空数据查询
const queryEmpty = () => {
    return Promise.resolve({
        rows: [],
        total: 0
    });
};

// 手动查询
const queryManual = (params: any) => {
    const { pageNo = 1, pageSize = 20 } = params;
    return Promise.resolve({
        rows: mockData.slice((pageNo - 1) * pageSize, pageNo * pageSize),
        total: mockData.length
    });
};

const manualQuery = () => {
    dataTableRef.value?.queryDataList(false);
    ElMessage.info("手动查询（不重置页码）");
};

const manualQueryInit = () => {
    dataTableRef.value?.queryDataList(true);
    ElMessage.info("手动查询并重置页码");
};

// 带延迟的查询（模拟网络延迟）
const queryWithDelay = (params: any) => {
    const { pageNo = 1, pageSize = 20 } = params;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                rows: mockData.slice((pageNo - 1) * pageSize, pageNo * pageSize),
                total: mockData.length
            });
        }, 1000);
    });
};

const eventLogs = ref<string[]>([]);

const addLog = (message: string) => {
    eventLogs.value.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
    if (eventLogs.value.length > 10) {
        eventLogs.value.pop();
    }
};

const handleSearch = (isSearching: boolean) => {
    addLog(`search 事件: ${isSearching ? "开始查询" : "查询完成"}`);
};
</script>
<style lang="scss" scoped>
.event-log {
    ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            padding: 4px 0;
            color: #909399;
            font-size: 13px;
        }
    }
}
</style>

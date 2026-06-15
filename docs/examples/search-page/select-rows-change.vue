<template>
    <div class="demo-box">
        <search-page :search-form-props="searchFormProps" :data-table-props="dataTableProps" @select-rows-change="handleSelectRowsChange" />
        <div class="event-log">
            <h4>selectRowsChange 事件日志：</h4>
            <ul>
                <li v-for="(log, index) in eventLogs" :key="index">{{ log }}</li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { type SearchFormProps, type DataTableProps } from "@yujinjin/cms-components-main/index";

const eventLogs = ref<string[]>([]);

const addLog = (message: string) => {
    eventLogs.value.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
    if (eventLogs.value.length > 5) {
        eventLogs.value.pop();
    }
};

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
    columns: [{ type: "selection" }, { prop: "id", label: "ID", width: 80 }, { prop: "name", label: "名称" }, { prop: "status", label: "状态" }],
    query: async () => {
        return {
            rows: [
                { id: 1, name: "测试1", status: "启用" },
                { id: 2, name: "测试2", status: "禁用" },
                { id: 3, name: "测试3", status: "启用" }
            ],
            total: 3
        };
    }
};

const handleSelectRowsChange = (rows: Array<Record<string, any>>) => {
    addLog(`选中行数: ${rows.length}，内容: ${JSON.stringify(rows.map(r => r.name))}`);
};
</script>
<style scoped>
.event-log {
    margin-top: 20px;
    padding: 12px;
    background-color: #f5f7fa;
    border-radius: 4px;
}

.event-log h4 {
    margin: 0 0 12px;
    color: #606266;
}

.event-log ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.event-log ul li {
    padding: 4px 0;
    color: #909399;
    font-size: 14px;
}
</style>

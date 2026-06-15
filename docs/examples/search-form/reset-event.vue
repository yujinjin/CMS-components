<template>
    <div class="demo-box">
        <search-form :fields="fields" :is-show-collapse="false" @search="handleSearch" @reset="handleReset" />
        <div class="event-log">
            <h4>事件日志：</h4>
            <ul>
                <li v-for="(log, index) in eventLogs" :key="index">{{ log }}</li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type SearchFormField } from "@yujinjin/cms-components-main/index";

const eventLogs = ref<string[]>([]);

const addLog = (message: string) => {
    eventLogs.value.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
    if (eventLogs.value.length > 5) {
        eventLogs.value.pop();
    }
};

const fields: SearchFormField[] = [
    { name: "keyword", label: "关键词", type: "input" },
    {
        name: "status",
        label: "状态",
        type: "select",
        value: "1",
        defaultValue: "1",
        data: [
            { label: "启用", value: "1" },
            { label: "禁用", value: "0" }
        ]
    }
];

const handleSearch = (data: any) => {
    addLog(`搜索: ${JSON.stringify(data)}`);
};

const handleReset = (data: any) => {
    addLog(`重置: ${JSON.stringify(data)}（值恢复为 defaultValue）`);
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

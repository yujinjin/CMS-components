<template>
    <div class="demo-box">
        <check-select v-model="value" :data="data" style="width: 240px" @change="handleChange" />
        <div class="event-log">
            <h4>change 事件日志：</h4>
            <ul>
                <li v-for="(log, index) in eventLogs" :key="index">{{ log }}</li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const value = ref(["1", "2"]);
const data: Array<{ value: string; label: string }> = Array.from({ length: 10 }, (_, index) => ({
    value: index.toString(),
    label: `选项 ${index}`
}));

const eventLogs = ref<string[]>([]);

const addLog = (message: string) => {
    eventLogs.value.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
    if (eventLogs.value.length > 5) {
        eventLogs.value.pop();
    }
};

const handleChange = (val: Array<object | string | number>) => {
    addLog(`选中值变化: ${JSON.stringify(val)}`);
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

<template>
    <div class="demo-box">
        <search-field v-model="keyword" type="input" placeholder="请输入关键词" @change="handleChange" />
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

const keyword = ref("");
const eventLogs = ref<string[]>([]);

const addLog = (message: string) => {
    eventLogs.value.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
    if (eventLogs.value.length > 5) {
        eventLogs.value.pop();
    }
};

// search-field 的 change 事件：输入值变化时触发
const handleChange = (val: any) => {
    addLog(`值变化: ${val}`);
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

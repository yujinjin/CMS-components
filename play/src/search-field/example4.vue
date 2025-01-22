<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:23:27
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 21:54:12
 * @项目的路径: \CMS-components\play\src\search-field\example4.vue
 * @描述: search-field组件的事件监听示例
-->
<template>
    <div class="example-page">
        <h3>事件监听</h3>
        <search-field v-model="value" placeholder="请输入搜索内容" @search="handleSearch" @change="handleChange" @blur="handleBlur" @focus="handleFocus" />
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
import { SearchField } from "@yujinjin/cms-components/index";

const value = ref("");
const eventLogs = ref<string[]>([]);

const addLog = (message: string) => {
    eventLogs.value.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
    if (eventLogs.value.length > 5) {
        eventLogs.value.pop();
    }
};

const handleSearch = (val: string) => {
    addLog(`搜索: ${val}`);
};

const handleChange = (val: string) => {
    addLog(`内容变化: ${val}`);
};

const handleFocus = () => {
    addLog("获得焦点");
};

const handleBlur = () => {
    addLog("失去焦点");
};
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
.event-log {
    margin-top: 20px;
    padding: 12px;
    background-color: #f5f7fa;
    border-radius: 4px;

    h4 {
        margin: 0 0 12px;
        color: #606266;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
            padding: 4px 0;
            color: #909399;
            font-size: 14px;
        }
    }
}
</style>

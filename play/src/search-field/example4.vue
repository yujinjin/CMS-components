<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:23:27
 * @最后修改作者: yujinjin-jk
 * @最后修改时间: 2026-06-11
 * @项目的路径: \CMS-components\play\src\search-field\example4.vue
 * @描述: search-field组件的事件监听示例
-->
<template>
    <div class="example-page">
        <!-- 事件监听 -->
        <section class="demo-section">
            <h3>事件监听</h3>
            <p class="demo-desc">search-field 支持 search、change、blur、focus 等事件，用于监听搜索交互行为</p>
            <div class="demo-block">
                <search-field v-model="value" placeholder="请输入搜索内容" @search="handleSearch" @change="handleChange" @blur="handleBlur" @focus="handleFocus" />
            </div>
            <div class="event-log">
                <h4>事件日志：</h4>
                <ul>
                    <li v-for="(log, index) in eventLogs" :key="index">{{ log }}</li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { SearchField } from "@yujinjin/cms-components-main/index";

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

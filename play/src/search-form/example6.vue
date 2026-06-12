<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:43:23
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-20 11:51:06
 * @项目的路径: \CMS-components\play\src\search-form\example6.vue
 * @描述: search-form组件的事件监听示例
-->
<template>
    <div class="example-page">
        <h3>事件监听</h3>
        <p class="demo-desc">监听 search、reset、change 等事件，获取搜索表单的交互状态与数据变化</p>
        <search-form :fields="fields" @search="handleSearch" @reset="handleReset" @change="handleChange" />
        <div class="event-log">
            <h4>事件日志</h4>
            <el-input v-model="eventLog" type="textarea" :rows="5" readonly />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type SearchFormField, SearchForm } from "@yujinjin/cms-components-main/index";

const eventLog = ref("");

const fields: SearchFormField[] = [
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
    { name: "date", label: "日期", type: "datePicker" }
];

const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    eventLog.value = `[${time}] ${message}\n${eventLog.value}`;
};

const handleSearch = (data: any) => {
    addLog(`搜索事件: ${JSON.stringify(data)}`);
};

const handleReset = () => {
    addLog("重置事件触发");
};

const handleChange = (field: any) => {
    addLog(`字段变化: ${field.name} = ${JSON.stringify(field.value)}`);
};
</script>

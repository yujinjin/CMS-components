<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @最后修改作者: yujinjin-jk
 * @最后修改时间: 2026-06-11
 * @描述: search-field 组件 - 禁用与边界情况示例
-->
<template>
    <div class="example-page">
        <!-- 禁用状态 -->
        <section class="demo-section">
            <h3>禁用状态</h3>
            <p class="demo-desc">通过 props.disabled 控制各类型搜索字段的禁用状态</p>
            <div class="demo-block">
                <search-field v-model="value1" :props="{ disabled: true }" placeholder="禁用输入" />
                <search-field v-model="value2" type="select" :data="options" :props="{ disabled: true }" placeholder="禁用选择" />
                <search-field v-model="value3" type="datePicker" :props="{ disabled: true }" placeholder="禁用日期" />
            </div>
        </section>

        <!-- 空数据 -->
        <section class="demo-section">
            <h3>空数据</h3>
            <p class="demo-desc">data 为空数组时，select 和 checkSelect 无选项可选</p>
            <div class="demo-block">
                <search-field v-model="value4" type="select" :data="[]" placeholder="空数据选择" />
                <search-field v-model="value5" type="checkSelect" :data="[]" placeholder="空数据多选" />
            </div>
        </section>

        <!-- change 事件 -->
        <section class="demo-section">
            <h3>change 事件</h3>
            <p class="demo-desc">search-field 额外触发了 change 事件（input-field 没有），在值变化时触发</p>
            <div class="demo-block">
                <search-field v-model="value6" placeholder="输入触发 change" @change="handleChange" />
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

const value1 = ref("禁用内容");
const value2 = ref("");
const value3 = ref("");
const value4 = ref("");
const value5 = ref<string[]>([]);
const value6 = ref("");

const options = [
    { label: "选项1", value: "1" },
    { label: "选项2", value: "2" }
];

const eventLogs = ref<string[]>([]);

const addLog = (message: string) => {
    eventLogs.value.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
    if (eventLogs.value.length > 10) {
        eventLogs.value.pop();
    }
};

const handleChange = (value: string) => {
    addLog(`change 事件: ${value}`);
};
</script>
<style lang="scss" scoped>
.demo-block {
    display: flex;
    gap: 12px;
}
</style>

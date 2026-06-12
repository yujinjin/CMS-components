<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: check-select 组件 - 事件监听示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>change 事件</h3>
            <p class="demo-desc">选中值变化时触发 change 事件，返回当前选中的值数组</p>
            <div class="demo-block">
                <check-select v-model="values" :data="data" option-value-key="id" option-label-key="name" @change="handleChange" />
            </div>
        </div>

        <div class="demo-section">
            <h3>events prop 自定义事件</h3>
            <p class="demo-desc">通过 events prop 可以传递 Element Plus Select 的原生事件，如 visible-change、remove-tag 等</p>
            <div class="demo-block">
                <check-select v-model="values2" :data="data" option-value-key="id" option-label-key="name" :events="{ 'visible-change': handleVisibleChange, 'remove-tag': handleRemoveTag }" />
            </div>
        </div>

        <div class="demo-section">
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
import { CheckSelect } from "@yujinjin/cms-components-main/index";

const values = ref<string[]>(["1"]);
const values2 = ref<string[]>(["1", "2"]);
const data = Array.from({ length: 10 }, (_, index) => ({ id: index.toString(), name: `选项 ${index}` }));

const eventLogs = ref<string[]>([]);

const addLog = (message: string) => {
    eventLogs.value.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
    if (eventLogs.value.length > 10) {
        eventLogs.value.pop();
    }
};

const handleChange = (value: string[]) => {
    addLog(`change 事件: [${value.join(", ")}]`);
};

const handleVisibleChange = (visible: boolean) => {
    addLog(`下拉框${visible ? "打开" : "关闭"}`);
};

const handleRemoveTag = (tag: string) => {
    addLog(`移除标签: ${tag}`);
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
            color: #64748b;
            font-size: 13px;
        }
    }
}
</style>

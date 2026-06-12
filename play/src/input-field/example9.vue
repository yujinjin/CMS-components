<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: input-field 组件 - 禁用与事件示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>禁用状态</h3>
            <p class="demo-desc">通过 props.disabled 控制各类型字段的禁用状态</p>
            <div class="demo-block">
                <div class="field-group">
                    <div class="field-item">
                        <span class="field-label">input 禁用：</span>
                        <input-field v-model="value1" :props="{ disabled: true }" placeholder="禁用输入框" />
                    </div>
                    <div class="field-item">
                        <span class="field-label">select 禁用：</span>
                        <input-field v-model="value2" type="select" :data="options" :props="{ disabled: true }" placeholder="禁用选择" />
                    </div>
                    <div class="field-item">
                        <span class="field-label">switch 禁用：</span>
                        <input-field v-model="value3" type="switch" :props="{ disabled: true }" />
                    </div>
                    <div class="field-item">
                        <span class="field-label">datePicker 禁用：</span>
                        <input-field v-model="value4" type="datePicker" :props="{ disabled: true }" placeholder="禁用日期" />
                    </div>
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h3>events prop 自定义事件</h3>
            <p class="demo-desc">通过 events prop 传递 Element Plus 组件的原生事件</p>
            <div class="demo-block">
                <div class="field-group">
                    <div class="field-item">
                        <span class="field-label">input（focus/blur）：</span>
                        <input-field v-model="value5" :events="{ focus: handleFocus, blur: handleBlur }" placeholder="点击聚焦/失焦" />
                    </div>
                    <div class="field-item">
                        <span class="field-label">select（visible-change）：</span>
                        <input-field v-model="value6" type="select" :data="options" :events="{ 'visible-change': handleVisibleChange }" placeholder="展开/收起" />
                    </div>
                </div>
            </div>
        </div>

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
import { InputField } from "@yujinjin/cms-components-main/index";

const value1 = ref("禁用内容");
const value2 = ref("");
const value3 = ref(true);
const value4 = ref("");
const value5 = ref("");
const value6 = ref("");

const options = [
    { label: "选项1", value: "1" },
    { label: "选项2", value: "2" },
    { label: "选项3", value: "3" }
];

const eventLogs = ref<string[]>([]);

const addLog = (message: string) => {
    eventLogs.value.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
    if (eventLogs.value.length > 10) {
        eventLogs.value.pop();
    }
};

const handleFocus = () => addLog("input 获得焦点");
const handleBlur = () => addLog("input 失去焦点");
const handleVisibleChange = (visible: boolean) => addLog(`select ${visible ? "展开" : "收起"}`);
</script>
<style lang="scss" scoped>
.field-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.field-item {
    display: flex;
    align-items: center;
    gap: 12px;

    .field-label {
        min-width: 120px;
        font-size: 14px;
        color: #606266;
    }

    :deep(.el-input),
    :deep(.el-select) {
        width: 250px;
    }
}

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

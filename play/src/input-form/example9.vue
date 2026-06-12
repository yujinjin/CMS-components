<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2026-06-11 10:00:00
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2026-06-11 10:00:00
 * @项目的路径: \CMS-components\play\src\input-form\example9.vue
 * @描述: input-form组件的值初始化与fieldValueChange事件示例
-->
<template>
    <div class="example-page">
        <h3>值初始化与 fieldValueChange 事件</h3>
        <p class="demo-desc">通过 value prop 初始化表单值，监听 fieldValueChange 事件获取字段值变化</p>

        <input-form :value="formData" :fields="fields" label-width="100px" @field-value-change="handleFieldValueChange" />

        <div class="event-log">
            <h4>事件日志</h4>
            <div class="log-list">
                <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
                    {{ log }}
                </div>
                <div v-if="eventLogs.length === 0" class="log-empty">暂无事件日志，修改表单值后可查看</div>
            </div>
            <el-button size="small" @click="eventLogs = []">清空日志</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type InputFormField, InputForm } from "@yujinjin/cms-components-main/index";

// 表单数据（带初始值）
const formData = ref({
    name: "张三",
    age: 25,
    gender: "male",
    birthday: ""
});

// 表单字段配置
const fields: InputFormField[] = [
    { name: "name", label: "姓名", type: "input" },
    { name: "age", label: "年龄", type: "inputNumber" },
    {
        name: "gender",
        label: "性别",
        type: "select",
        data: [
            { label: "男", value: "male" },
            { label: "女", value: "female" }
        ]
    },
    { name: "birthday", label: "生日", type: "datePicker" }
];

// 事件日志
const eventLogs = ref<string[]>([]);

/** 字段值变化事件处理 */
const handleFieldValueChange = (field: InputFormField, fieldValue: any, formFields: InputFormField[], inputFormValue: Record<string, any>) => {
    const log = `[${new Date().toLocaleTimeString()}] 字段 "${field.label || field.name}" 值变化为: ${JSON.stringify(fieldValue)}`;
    eventLogs.value.unshift(log);
    // 最多保留 20 条日志
    if (eventLogs.value.length > 20) {
        eventLogs.value.pop();
    }
};
</script>
<style lang="scss" scoped>
.log-list {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 8px;
}
.log-item {
    font-size: 12px;
    color: #606266;
    padding: 4px 0;
    border-bottom: 1px dashed #ebeef5;
}
.log-empty {
    font-size: 12px;
    color: #c0c4cc;
    padding: 8px 0;
}
</style>

<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2026-06-11 10:00:00
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2026-06-11 10:00:00
 * @项目的路径: \CMS-components\play\src\dialog-form\example7.vue
 * @描述: dialog-form组件的expose方法与事件示例
-->
<template>
    <div class="example-page">
        <h3>expose 方法与事件</h3>
        <p class="demo-desc">演示 getInputValue、validate、changeButtons 方法，以及 close 和 fieldValueChange 事件。</p>

        <div class="button-panel">
            <el-button type="primary" @click="handleOpen">打开弹窗表单</el-button>
        </div>

        <div v-if="visible" class="button-panel">
            <el-button type="primary" @click="handleGetInputValue">getInputValue</el-button>
            <el-button type="success" @click="handleValidate">validate</el-button>
            <el-button type="warning" @click="handleChangeButtons">changeButtons</el-button>
        </div>

        <dialog-form
            v-if="visible"
            ref="dialogFormRef"
            :input-form-props="{ fields, value: formData }"
            :dialog-props="{ title: 'expose 方法演示' }"
            :buttons="buttons"
            @close="handleClose"
            @field-value-change="handleFieldValueChange"
        />

        <div class="event-log">
            <h4>事件日志</h4>
            <div class="log-list">
                <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
                    {{ log }}
                </div>
                <div v-if="eventLogs.length === 0" class="log-empty">暂无事件日志</div>
            </div>
            <el-button size="small" @click="eventLogs = []">清空日志</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type DialogFormRef, type DialogFormButton, type InputFormField, DialogForm } from "@yujinjin/cms-components-main/index";

// 弹窗是否可见
const visible = ref(false);

// 弹窗表单实例引用
const dialogFormRef = ref<DialogFormRef>();

// 表单数据
const formData = ref({
    name: "",
    age: null,
    gender: ""
});

// 表单字段配置
const fields: InputFormField[] = [
    { name: "name", label: "姓名", type: "input", rules: [{ required: true, message: "请输入姓名" }] },
    { name: "age", label: "年龄", type: "inputNumber" },
    {
        name: "gender",
        label: "性别",
        type: "select",
        data: [
            { label: "男", value: "male" },
            { label: "女", value: "female" }
        ]
    }
];

/** 提交按钮 */
function handleSubmit() {
    return dialogFormRef.value
        ?.validate()
        .then(() => {
            const value = dialogFormRef.value?.getInputValue();
            ElMessage.success("提交成功: " + JSON.stringify(value));
            return true;
        })
        .catch(() => {
            ElMessage.error("验证失败");
            return false;
        });
}

// 按钮配置
const buttons = ref<DialogFormButton[]>([
    { type: "primary", contents: "确认", click: handleSubmit },
    {
        contents: "取消",
        click: () => {
            visible.value = false;
        }
    }
]);

// 事件日志列表
const eventLogs = ref<string[]>([]);

/** 添加日志 */
const addLog = (type: string, detail: string) => {
    const log = `[${new Date().toLocaleTimeString()}] [${type}] ${detail}`;
    eventLogs.value.unshift(log);
    if (eventLogs.value.length > 30) {
        eventLogs.value.pop();
    }
};

/** 打开弹窗 */
const handleOpen = () => {
    formData.value = { name: "", age: null, gender: "" };
    visible.value = true;
};

/** 关闭事件 */
const handleClose = () => {
    visible.value = false;
    addLog("close", "弹窗已关闭");
};

/** 字段值变化事件 */
const handleFieldValueChange = (field: InputFormField, fieldValue: any) => {
    addLog("fieldValueChange", `字段 "${field.label || field.name}" 值变化为: ${JSON.stringify(fieldValue)}`);
};

/** 获取表单值 */
const handleGetInputValue = () => {
    const value = dialogFormRef.value?.getInputValue();
    ElMessage.info("getInputValue: " + JSON.stringify(value));
};

/** 表单验证 */
const handleValidate = async () => {
    try {
        await dialogFormRef.value?.validate();
        ElMessage.success("验证通过");
    } catch {
        ElMessage.error("验证失败");
    }
};

/** 修改按钮配置 */
const handleChangeButtons = () => {
    dialogFormRef.value?.changeButtons(btns => {
        // 动态添加一个"重置"按钮
        const hasReset = btns.some(b => b.handleCode === "RESET");
        if (!hasReset) {
            btns.push({
                contents: "重置表单",
                handleCode: "RESET",
                click: () => {
                    formData.value = { name: "", age: null, gender: "" };
                    ElMessage.info("表单已重置");
                }
            });
            ElMessage.success("已添加重置按钮");
        } else {
            const index = btns.findIndex(b => b.handleCode === "RESET");
            btns.splice(index, 1);
            ElMessage.info("已移除重置按钮");
        }
    });
};
</script>
<style lang="scss" scoped>
/* 事件日志区内部样式 - 不属于全局样式系统 */
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

<template>
    <div class="demo-box">
        <el-button type="primary" @click="handleOpen">打开弹窗</el-button>
        <dialog-form ref="dialogFormRef" :is-show="visible" :input-form-props="{ fields, value: formData }" :dialog-props="{ title: '编辑用户' }" :buttons="buttons" @close="handleClose" />
        <div class="event-log">
            <h4>close 事件日志：</h4>
            <ul>
                <li v-for="(log, index) in eventLogs" :key="index">{{ log }}</li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type DialogFormRef, type DialogFormButton, type InputFormField } from "@yujinjin/cms-components-main/index";

const visible = ref(false);
const dialogFormRef = ref<DialogFormRef>();
const eventLogs = ref<string[]>([]);

const formData = ref({
    name: "张三",
    age: 18,
    email: "test@example.com"
});

const fields: InputFormField[] = [
    { name: "name", label: "姓名", type: "input", rules: [{ required: true, message: "请输入姓名" }] },
    { name: "age", label: "年龄", type: "inputNumber" },
    { name: "email", label: "邮箱", type: "input" }
];

const addLog = (message: string) => {
    eventLogs.value.unshift(`${new Date().toLocaleTimeString()} - ${message}`);
    if (eventLogs.value.length > 5) {
        eventLogs.value.pop();
    }
};

const handleOpen = () => {
    visible.value = true;
};

const handleClose = () => {
    visible.value = false;
    addLog("弹窗关闭");
};

const handleSubmit = async (data: any) => {
    await dialogFormRef.value?.validate();
    ElMessage.success(`提交数据: ${JSON.stringify(data)}`);
};

const buttons: DialogFormButton[] = [
    { type: "primary", contents: "提交", click: handleSubmit },
    {
        contents: "取消",
        click: () => {
            ElMessage.info("取消");
        }
    }
];
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

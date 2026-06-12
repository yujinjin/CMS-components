<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: action-bar 组件 - changeButtons 方法示例
-->
<template>
    <div class="example-page">
        <h3>changeButtons 方法</h3>
        <p class="demo-desc">changeButtons 方法接收一个回调函数，回调参数为当前按钮列表，可在回调中直接修改按钮数组来实现动态更新</p>
        <div class="demo-block">
            <action-bar ref="actionBarRef" :buttons="buttons"></action-bar>
        </div>
        <div class="button-panel">
            <el-button @click="switchToEdit">切换到编辑模式</el-button>
            <el-button @click="switchToView">切换到查看模式</el-button>
            <el-button @click="switchToDefault">恢复默认</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type ActionButton, ActionBar } from "@yujinjin/cms-components-main/index";

const actionBarRef = ref<InstanceType<typeof ActionBar>>();

const buttons = ref<ActionButton[]>([
    { contents: "新增", type: "primary", handleCode: "ADD" },
    { contents: "删除", handleCode: "DELETE" }
]);

const switchToEdit = () => {
    actionBarRef.value?.changeButtons(actionButtons => {
        actionButtons.splice(0, actionButtons.length);
        actionButtons.push({ contents: "保存", type: "primary", handleCode: "SAVE" });
        actionButtons.push({ contents: "取消", handleCode: "CANCEL" });
    });
    ElMessage.info("已切换到编辑模式");
};

const switchToView = () => {
    actionBarRef.value?.changeButtons(actionButtons => {
        actionButtons.splice(0, actionButtons.length);
        actionButtons.push({ contents: "导出", handleCode: "EXPORT" });
        actionButtons.push({ contents: "打印", handleCode: "PRINT" });
    });
    ElMessage.info("已切换到查看模式");
};

const switchToDefault = () => {
    actionBarRef.value?.changeButtons(actionButtons => {
        actionButtons.splice(0, actionButtons.length);
        actionButtons.push({ contents: "新增", type: "primary", handleCode: "ADD" });
        actionButtons.push({ contents: "删除", handleCode: "DELETE" });
    });
    ElMessage.info("已恢复默认按钮");
};
</script>

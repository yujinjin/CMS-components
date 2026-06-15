<template>
    <div class="demo-box">
        <action-bar ref="actionBarRef" :buttons="buttons" />
        <div class="button-panel">
            <el-button type="primary" @click="handleAddButton">添加按钮</el-button>
            <el-button @click="handleRemoveButton">删除最后一个按钮</el-button>
            <el-button @click="handleDisableButton">禁用新增按钮</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type ActionButton, type ActionBarRef } from "@yujinjin/cms-components-main/index";

const actionBarRef = ref<ActionBarRef>();

const buttons: ActionButton[] = [
    {
        contents: "新增",
        type: "primary",
        handleCode: "ADD",
        click: () => {
            ElMessage.info("新增");
        }
    },
    {
        contents: "编辑",
        handleCode: "EDIT",
        click: () => {
            ElMessage.info("编辑");
        }
    }
];

const handleAddButton = () => {
    actionBarRef.value?.changeButtons(btns => {
        btns.push({
            contents: "导出",
            handleCode: "EXPORT",
            click: () => {
                ElMessage.info("导出");
            }
        });
    });
    ElMessage.success("添加了导出按钮");
};

const handleRemoveButton = () => {
    actionBarRef.value?.changeButtons(btns => {
        if (btns.length > 0) {
            btns.pop();
        }
    });
    ElMessage.success("删除了最后一个按钮");
};

const handleDisableButton = () => {
    actionBarRef.value?.changeButtons(btns => {
        const addButton = btns.find(b => b.handleCode === "ADD");
        if (addButton) {
            addButton.disabled = true;
        }
    });
    ElMessage.success("新增按钮已禁用");
};
</script>
<style scoped>
.button-panel {
    margin-top: 16px;
}
</style>

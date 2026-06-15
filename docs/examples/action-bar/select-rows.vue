<template>
    <div class="demo-box">
        <action-bar :buttons="buttons" :select-rows="selectedRows" />
        <div class="info-panel">
            <p>选中行数：{{ selectedRows.length }}</p>
            <p>注意：批量删除按钮设置了 selectRows，需选中行后才有效果</p>
        </div>
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="status" label="状态" />
        </el-table>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type ActionButton } from "@yujinjin/cms-components-main/index";

const selectedRows = ref<any[]>([]);

const buttons: ActionButton[] = [
    {
        contents: "新增",
        type: "primary",
        handleCode: "ADD",
        click: () => {
            ElMessage.info("新增操作");
        }
    },
    {
        contents: "批量删除",
        type: "danger",
        handleCode: "BATCH_DELETE",
        click: rows => {
            if (!rows || rows.length === 0) {
                ElMessage.warning("请先选择要删除的数据");
                return;
            }
            ElMessage.info(`删除 ${rows.length} 条数据`);
        }
    }
];

const tableData = ref([
    { name: "张三", status: "启用" },
    { name: "李四", status: "禁用" },
    { name: "王五", status: "启用" }
]);

const handleSelectionChange = (rows: any[]) => {
    selectedRows.value = rows;
};
</script>
<style scoped>
.info-panel {
    margin-bottom: 12px;
    padding: 12px;
    background-color: #f5f7fa;
    border-radius: 4px;
}

.info-panel p {
    margin: 4px 0;
    color: #606266;
    font-size: 14px;
}
</style>

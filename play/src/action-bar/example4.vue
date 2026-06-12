<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: action-bar 组件 - selectRows 联动示例
-->
<template>
    <div class="example-page">
        <h3>selectRows 联动</h3>
        <p class="demo-desc">按钮的 click 函数接收 selectRows 参数，可根据选中行数动态控制按钮行为</p>
        <div class="demo-block">
            <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="status" label="状态" />
            </el-table>
            <action-bar :buttons="buttons" :select-rows="selectedRows" />
        </div>
        <div class="info-display">当前选中行数：{{ selectedRows.length }}</div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type ActionButton, ActionBar } from "@yujinjin/cms-components-main/index";

const selectedRows = ref<any[]>([]);

const tableData = [
    { id: 1, name: "项目A", status: "进行中" },
    { id: 2, name: "项目B", status: "已完成" },
    { id: 3, name: "项目C", status: "待审核" },
    { id: 4, name: "项目D", status: "进行中" }
];

const buttons = ref<ActionButton[]>([
    {
        contents: "新增",
        type: "primary",
        click: (rows: any[]) => {
            ElMessage.info(`新增操作，当前选中 ${rows.length} 行`);
        }
    },
    {
        contents: "批量删除",
        click: async (rows: any[]) => {
            if (rows.length === 0) {
                ElMessage.warning("请先选择要删除的行");
                return;
            }
            ElMessage.success(`删除 ${rows.length} 行：${rows.map((r: any) => r.name).join(", ")}`);
        }
    },
    {
        contents: "导出选中",
        click: (rows: any[]) => {
            if (rows.length === 0) {
                ElMessage.warning("请先选择要导出的行");
                return;
            }
            ElMessage.success(`导出 ${rows.length} 行数据`);
        }
    }
]);

const handleSelectionChange = (rows: any[]) => {
    selectedRows.value = rows;
};
</script>

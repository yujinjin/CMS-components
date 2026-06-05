<template>
    <div class="demo-box">
        <data-table :columns="columns" :query="queryList" :events="{ rowClick: handleRowClick, sortChange: handleSortChange }" @selection-change="handleSelectionChange"></data-table>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type DataTableColumn } from "@yujinjin/cms-components-main/index";

const selectedRows = ref<Array<any>>([]);

function handleEdit(row: any) {
    ElMessage.success(`编辑：${row.name}`);
}

function handleDelete(row: any) {
    ElMessage.success(`删除：${row.name}`);
}

const columns = ref<DataTableColumn<any>[]>([
    { type: "selection" },
    { prop: "id", label: "ID", width: 80 },
    { prop: "name", label: "名称", sortable: true },
    { prop: "age", label: "年龄", sortable: true },
    { prop: "address", label: "地址" },
    {
        type: "action",
        width: 200,
        buttons: [
            { contents: "编辑", handleCode: "EDIT", click: handleEdit },
            { contents: "删除", handleCode: "DELETE", click: handleDelete }
        ]
    }
]);

const queryList = async () => {
    return {
        rows: [
            { id: 1, name: "张三", age: 18, address: "北京市" },
            { id: 2, name: "李四", age: 20, address: "上海市" }
        ],
        total: 2
    };
};

function handleSelectionChange(rows: any[]) {
    selectedRows.value = rows;
}

function handleRowClick(row: any) {
    ElMessage.info(`点击了行：${row.name}`);
}

function handleSortChange({ prop, order }: any) {
    ElMessage.info(`排序：${prop} ${order}`);
}
</script>

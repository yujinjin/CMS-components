<template>
    <div class="demo-box">
        <div>
            <el-button @click="handleResetColumns">设置‘名称’列隐藏</el-button>
        </div>
        <data-table ref="tableRef" :columns="columns" :query="queryList"></data-table>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type DataTableRef, type DataTableColumn } from "@yujinjin/cms-components/index";

const tableRef = ref<DataTableRef>();

const columns = ref<DataTableColumn<any>[]>([
    { prop: "id", label: "ID", width: 80, fixed: true },
    { prop: "name", label: "名称", width: 80 },
    { prop: "age", label: "年龄", width: 80 },
    { prop: "email", label: "邮箱", width: 180 },
    { prop: "phone", label: "电话", width: 120 },
    { prop: "address", label: "地址", width: 120 },
    { prop: "remark", label: "备注", width: 80 }
]);

const queryList = async () => {
    return {
        rows: [
            { id: 1, name: "张三", age: 18, email: "zhangsan@example.com", phone: "13800138000", address: "北京市", remark: "备注1" },
            { id: 2, name: "李四", age: 20, email: "lisi@example.com", phone: "13800138001", address: "上海市", remark: "备注2" }
        ],
        total: 2
    };
};

function handleResetColumns() {
    tableRef.value?.updateTableColumnsShowStatus(["id", "age", "email", "phone", "address", "remark"]);
}
</script>

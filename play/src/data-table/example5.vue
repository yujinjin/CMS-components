<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:52:48
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-13 17:14:04
 * @项目的路径: \CMS-components\play\src\data-table\example5.vue
 * @描述: data-table组件设置隐藏列示例
-->
<template>
    <div class="example-page">
        <h3>设置隐藏列</h3>
        <div>
            <el-button @click="handleResetColumns">设置‘名称’列隐藏</el-button>
        </div>
        <data-table ref="tableRef" :columns="columns" :query="queryList"></data-table>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { DataTable, type DataTableRef, type DataTableColumn } from "@yujinjin/cms-components-main/index";

const tableRef = ref<DataTableRef>();

const columns = ref<DataTableColumn<any>[]>([
    { prop: "id", label: "ID", width: 80, fixed: true },
    { prop: "name", label: "名称" },
    { prop: "age", label: "年龄" },
    { prop: "email", label: "邮箱" },
    { prop: "phone", label: "电话" },
    { prop: "address", label: "地址" },
    { prop: "remark", label: "备注" }
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
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

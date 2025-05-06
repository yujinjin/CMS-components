<template>
    <div class="demo-box">
        <data-table :columns="columns" :query="queryList">
            <template #dataTable_name="{ row }">
                <el-tag>{{ row.name }}</el-tag>
            </template>
        </data-table>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type DataTableColumn } from "@yujinjin/cms-components-main/index";

const columns = ref<DataTableColumn<any>[]>([
    { type: "selection" },
    { prop: "id", label: "ID", width: 80 },
    { prop: "name", label: "名称", slot: "dataTable_name" },
    { prop: "age", label: "年龄" },
    { prop: "address", label: "地址" },
    {
        type: "action",
        width: 150,
        buttons: [
            { contents: "编辑", handleCode: "EDIT" },
            { contents: "删除", handleCode: "DELETE" }
        ]
    }
]);

const queryList = async () => {
    return new Promise(resolve =>
        setTimeout(
            () =>
                resolve({
                    rows: [
                        { id: 1, name: "张三", age: 18, address: "北京市" },
                        { id: 2, name: "李四", age: 20, address: "上海市" }
                    ],
                    total: 2
                }),
            500
        )
    );
};
</script>

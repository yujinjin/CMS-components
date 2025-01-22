<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:48:19
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-13 16:44:57
 * @项目的路径: \CMS-components\play\src\data-table\example1.vue
 * @描述: data-table组件基础用法示例
-->
<template>
    <div class="example-page">
        <h3>基础用法</h3>
        <data-table :columns="columns" :query="queryList">
            <template #dataTable_name="{ row }">
                <el-tag>{{ row.name }}</el-tag>
            </template>
        </data-table>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { DataTable } from "@yujinjin/cms-components/index";
import { type DataTableColumn } from "@yujinjin/cms-components/index";

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
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

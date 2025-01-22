<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:49:46
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-13 16:49:02
 * @项目的路径: \CMS-components\play\src\data-table\example2.vue
 * @描述: data-table组件自定义列类型示例
-->
<template>
    <div class="example-page">
        <h3>自定义列类型</h3>
        <data-table :columns="columns" :query="queryList">
            <template #dataTable_status="{ row }">
                <el-tag :type="row.status === 1 ? 'success' : 'danger'">{{ row.status === 1 ? "启用" : "禁用" }}</el-tag>
            </template>
        </data-table>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { DataTable } from "@yujinjin/cms-components/index";
import { type DataTableColumn } from "@yujinjin/cms-components/index";

const columns = ref<DataTableColumn<any>[]>([
    { prop: "id", label: "ID", width: 80 },
    { prop: "name", label: "名称" },
    { prop: "date", label: "日期", type: "date" },
    { prop: "date", label: "时间", type: "date", formate: "HH:mm:ss" },
    { prop: "price", label: "价格", type: "number", digit: 2 },
    { prop: "status", label: "状态", slot: "dataTable_status" },
    { prop: "image", label: "图片", type: "image" }
]);

const queryList = async () => {
    return {
        rows: [
            { id: 1, name: "商品1", date: "2024-01-01 12:00:00", time: "12:00:00", price: 99.99, status: 1, image: "https://example.com/image1.jpg" },
            { id: 2, name: "商品2", date: "2024-01-02 12:00:00", time: "13:00:00", price: 199.99, status: 0, image: "https://example.com/image2.jpg" }
        ],
        total: 2
    };
};
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

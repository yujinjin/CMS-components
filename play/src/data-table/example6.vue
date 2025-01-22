<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:53:36
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-22 11:49:47
 * @项目的路径: \CMS-components\play\src\data-table\example6.vue
 * @描述: data-table组件展开行示例
-->
<template>
    <div class="example-page">
        <h3>展开行</h3>
        <data-table :columns="columns" :query="queryList">
            <template #expand="{ row }">
                <div class="expand-detail">
                    <p>
                        <strong>详细地址：</strong>
                        {{ row.fullAddress }}
                    </p>
                    <p>
                        <strong>个人简介：</strong>
                        {{ row.description }}
                    </p>
                    <p>
                        <strong>创建时间：</strong>
                        {{ row.createTime }}
                    </p>
                </div>
            </template>
        </data-table>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { DataTable } from "@yujinjin/cms-components/index";
import { type DataTableColumn } from "@yujinjin/cms-components/index";

const columns = ref<DataTableColumn<any>[]>([
    { type: "expand", slot: "expand" },
    { prop: "id", label: "ID", width: 80 },
    { prop: "name", label: "名称" },
    { prop: "age", label: "年龄" },
    { prop: "address", label: "地址" }
]);

const queryList = async () => {
    return {
        rows: [
            {
                id: 1,
                name: "张三",
                age: 18,
                address: "北京市",
                fullAddress: "北京市朝阳区xxx街道xxx号",
                description: "这是一段个人简介...",
                createTime: "2024-01-01 12:00:00"
            },
            {
                id: 2,
                name: "李四",
                age: 20,
                address: "上海市",
                fullAddress: "上海市浦东新区xxx街道xxx号",
                description: "这是另一段个人简介...",
                createTime: "2024-01-02 13:00:00"
            }
        ],
        total: 2
    };
};
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
.expand-detail {
    padding: 12px;
    p {
        margin: 8px 0;
    }
}
</style>

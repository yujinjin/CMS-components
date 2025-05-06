<template>
    <div class="demo-box">
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
import { type DataTableColumn } from "@yujinjin/cms-components-main/index";

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

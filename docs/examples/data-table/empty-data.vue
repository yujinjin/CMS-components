<template>
    <div class="demo-box">
        <data-table :columns="columns" :query="queryList" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type DataTableColumn } from "@yujinjin/cms-components-main/index";

const columns = ref<DataTableColumn<any>[]>([
    { prop: "id", label: "ID", width: 80 },
    { prop: "name", label: "名称" },
    { prop: "age", label: "年龄" }
]);

// 模拟返回空数据
const queryList = async () => {
    return {
        rows: [],
        total: 0
    };
};
</script>

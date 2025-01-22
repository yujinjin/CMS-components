<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:51:41
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-13 17:08:17
 * @项目的路径: \CMS-components\play\src\data-table\example4.vue
 * @描述: data-table组件分页和加载示例
-->
<template>
    <div class="example-page">
        <h3>分页和加载</h3>
        <data-table
            :columns="columns"
            :query="queryList"
            :pagination="{
                pageSize: 10,
                pageSizes: [10, 20, 50],
                layout: 'total, sizes, prev, pager, next, jumper'
            }"
            :loading-text="loadingText"
            :empty-text="emptyText"
        />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { DataTable } from "@yujinjin/cms-components/index";
import { type DataTableColumn } from "@yujinjin/cms-components/index";

const columns = ref<DataTableColumn<any>[]>([
    { prop: "id", label: "ID", width: 80 },
    { prop: "name", label: "名称" },
    { prop: "age", label: "年龄" },
    { prop: "address", label: "地址" }
]);

const loadingText = "加载中...";
const emptyText = "暂无数据";

const queryList = async params => {
    // 模拟异步请求
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { pageNo, pageSize } = params;
    const total = 100;
    const rows = Array.from({ length: pageSize }, (_, index) => {
        const id = (pageNo - 1) * pageSize + index + 1;
        return {
            id,
            name: `名称${id}`,
            age: Math.floor(Math.random() * 50) + 10,
            address: `地址${id}`
        };
    });

    return { rows, total };
};
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

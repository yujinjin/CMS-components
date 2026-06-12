<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2026-06-11 10:00:00
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2026-06-11 10:00:00
 * @项目的路径: \CMS-components\play\src\search-page\example8.vue
 * @描述: search-page组件的初始加载与外部筛选示例
-->
<template>
    <div class="example-page">
        <h3>初始加载与外部筛选</h3>
        <p class="demo-desc">演示 isLoadingForInit 初始加载状态，以及 dataTableProps.filters 外部筛选条件的动态切换</p>

        <div class="button-panel">
            <el-button type="primary" @click="handleToggleLoading">切换 isLoadingForInit</el-button>
            <el-button type="success" @click="handleFilterActive">筛选: 启用状态</el-button>
            <el-button type="warning" @click="handleFilterInactive">筛选: 禁用状态</el-button>
            <el-button type="info" @click="handleFilterClear">清除筛选</el-button>
        </div>

        <search-page ref="searchPageRef" :is-loading-for-init="isLoadingForInit" :search-form-props="searchFormProps" :action-bar-props="actionBarProps" :data-table-props="dataTableProps" />
    </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from "vue";
import { ElMessage } from "element-plus";
import { type SearchPageRef, type SearchFormProps, type ActionBarProps, type DataTableProps, SearchPage } from "@yujinjin/cms-components-main/index";

// 搜索页面实例引用
const searchPageRef = ref<SearchPageRef>();

// 初始加载状态
const isLoadingForInit = ref(false);

// 搜索表单配置
const searchFormProps = ref<SearchFormProps>({
    fields: [
        { name: "keyword", type: "input", label: "关键词" },
        {
            name: "status",
            type: "select",
            label: "状态",
            data: [
                { label: "启用", value: "1" },
                { label: "禁用", value: "0" }
            ]
        }
    ]
});

// 操作栏配置
const actionBarProps = ref<ActionBarProps>({
    align: "right",
    buttons: [
        {
            contents: "新增",
            handleCode: "CREATE",
            type: "primary",
            click: () => {
                ElMessage.info("新增");
            }
        }
    ]
});

// 模拟查询数据
const mockQuery = async function (params: any) {
    console.log("查询参数（含 filters）:", params);
    await new Promise(resolve => setTimeout(resolve, 800));
    // 根据 filters 筛选数据
    const allData = [
        { id: 1, name: "张三", status: "1", createTime: "2026-01-15 10:30:00" },
        { id: 2, name: "李四", status: "0", createTime: "2026-02-20 14:00:00" },
        { id: 3, name: "王五", status: "1", createTime: "2026-03-10 09:00:00" },
        { id: 4, name: "赵六", status: "0", createTime: "2026-04-05 16:00:00" },
        { id: 5, name: "孙七", status: "1", createTime: "2026-05-20 11:30:00" }
    ];
    return {
        total: allData.length,
        rows: allData
    };
};

// 数据表格配置（含 filters 外部筛选）
const dataTableProps: Ref<DataTableProps> = ref({
    filters: {
        status: ""
    },
    query: mockQuery,
    columns: [
        { label: "ID", prop: "id", width: 80 },
        { label: "姓名", prop: "name", minWidth: 120 },
        {
            label: "状态",
            prop: "status",
            type: "enum",
            width: 100,
            data: [
                { label: "启用", value: "1" },
                { label: "禁用", value: "0" }
            ]
        },
        { label: "创建时间", prop: "createTime", type: "date", formate: "YYYY-MM-DD HH:mm:ss", width: 200 }
    ]
});

/** 切换初始加载状态 */
const handleToggleLoading = () => {
    isLoadingForInit.value = !isLoadingForInit.value;
    ElMessage.info(`isLoadingForInit: ${isLoadingForInit.value ? "加载中" : "正常"}`);
};

/** 设置筛选为启用状态 */
const handleFilterActive = () => {
    if (dataTableProps.value.filters) {
        dataTableProps.value.filters.status = "1";
    }
    searchPageRef.value?.query();
    ElMessage.info("已设置筛选: 启用状态，并重新查询");
};

/** 设置筛选为禁用状态 */
const handleFilterInactive = () => {
    if (dataTableProps.value.filters) {
        dataTableProps.value.filters.status = "0";
    }
    searchPageRef.value?.query();
    ElMessage.info("已设置筛选: 禁用状态，并重新查询");
};

/** 清除筛选 */
const handleFilterClear = () => {
    if (dataTableProps.value.filters) {
        dataTableProps.value.filters.status = "";
    }
    searchPageRef.value?.query();
    ElMessage.info("已清除筛选，并重新查询");
};
</script>

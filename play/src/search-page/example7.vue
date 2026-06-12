<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2026-06-11 10:00:00
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2026-06-11 10:00:00
 * @项目的路径: \CMS-components\play\src\search-page\example7.vue
 * @描述: search-page组件的插槽分发与事件示例
-->
<template>
    <div class="example-page">
        <h3>插槽分发与事件</h3>
        <p class="demo-desc">演示 searchForm_xxx、actionBar_xxx、dataTable_xxx 插槽分发，以及 selectRowsChange 事件监听</p>

        <search-page ref="searchPageRef" :search-form-props="searchFormProps" :action-bar-props="actionBarProps" :data-table-props="dataTableProps" @select-rows-change="handleSelectRowsChange">
            <!-- 搜索表单自定义插槽：在关键词字段后添加提示 -->
            <template #searchForm_keyword="scope">
                <el-input v-model="scope.field.value" placeholder="请输入关键词" />
                <span class="field-tip">支持模糊搜索</span>
            </template>

            <!-- 操作栏自定义插槽 -->
            <template #actionBar_default>
                <el-tag type="info" size="large">自定义操作栏内容</el-tag>
            </template>

            <!-- 数据表格自定义列插槽 -->
            <template #dataTable_name="{ row }">
                <el-link type="primary">{{ row.name }}</el-link>
            </template>

            <!-- 数据表格状态列自定义 -->
            <template #dataTable_status="{ row }">
                <el-tag :type="row.status === '1' ? 'success' : 'danger'" size="small">
                    {{ row.status === "1" ? "启用" : "禁用" }}
                </el-tag>
            </template>
        </search-page>

        <div class="event-log">
            <h4>选中行事件日志</h4>
            <div class="log-list">
                <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
                    {{ log }}
                </div>
                <div v-if="eventLogs.length === 0" class="log-empty">暂无事件日志，勾选表格行后可查看</div>
            </div>
            <el-button size="small" @click="eventLogs = []">清空日志</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from "vue";
import { ElMessage } from "element-plus";
import { type SearchPageRef, type SearchFormProps, type ActionBarProps, type DataTableProps, SearchPage } from "@yujinjin/cms-components-main/index";

// 搜索页面实例引用
const searchPageRef = ref<SearchPageRef>();

// 搜索表单配置
const searchFormProps = ref<SearchFormProps>({
    fields: [
        { name: "keyword", type: "input", label: "关键词", slot: "searchForm_keyword" },
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
    console.log("查询参数:", params);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        total: 3,
        rows: [
            { id: 1, name: "张三", age: 25, status: "1", createTime: "2026-01-15 10:30:00" },
            { id: 2, name: "李四", age: 30, status: "0", createTime: "2026-02-20 14:00:00" },
            { id: 3, name: "王五", age: 28, status: "1", createTime: "2026-03-10 09:00:00" }
        ]
    };
};

// 数据表格配置
const dataTableProps: Ref<DataTableProps> = ref({
    query: mockQuery,
    columns: [
        { label: "选择", type: "selection", align: "center", width: 50 },
        { label: "ID", prop: "id", width: 80 },
        { label: "姓名", prop: "name", minWidth: 120, slot: "dataTable_name" },
        { label: "年龄", prop: "age", width: 80 },
        { label: "状态", prop: "status", width: 100, slot: "dataTable_status" },
        { label: "创建时间", prop: "createTime", type: "date", formate: "YYYY-MM-DD HH:mm:ss", width: 200 }
    ]
});

// 事件日志
const eventLogs = ref<string[]>([]);

/** 选中行变化事件 */
const handleSelectRowsChange = (selectedRows: Array<Record<string, any>>) => {
    const names = selectedRows.map(row => row.name).join(", ");
    const log = `[${new Date().toLocaleTimeString()}] 选中 ${selectedRows.length} 行: ${names || "无"}`;
    eventLogs.value.unshift(log);
    if (eventLogs.value.length > 20) {
        eventLogs.value.pop();
    }
};
</script>
<style lang="scss" scoped>
.field-tip {
    font-size: 12px;
    color: #909399;
    margin-left: 8px;
}
.log-list {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 8px;
}
.log-item {
    font-size: 12px;
    color: #606266;
    padding: 4px 0;
    border-bottom: 1px dashed #ebeef5;
}
.log-empty {
    font-size: 12px;
    color: #c0c4cc;
    padding: 8px 0;
}
</style>

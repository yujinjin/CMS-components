<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2026-06-11 10:00:00
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2026-06-11 10:00:00
 * @项目的路径: \CMS-components\play\src\search-page\example6.vue
 * @描述: search-page组件的expose方法演示示例
-->
<template>
    <div class="example-page">
        <h3>expose 方法</h3>
        <p class="demo-desc">通过 ref 调用 search-page 暴露的方法：query、getSearchingValue、getSearchedValue、changeFormFields、changeButtons、updateTableColumnsShowStatus</p>

        <div class="button-panel">
            <el-button type="primary" @click="handleQuery">query</el-button>
            <el-button type="success" @click="handleGetSearchingValue">getSearchingValue</el-button>
            <el-button type="info" @click="handleGetSearchedValue">getSearchedValue</el-button>
            <el-button type="warning" @click="handleChangeFormFields">changeFormFields</el-button>
            <el-button type="danger" @click="handleChangeButtons">changeButtons</el-button>
            <el-button @click="handleUpdateTableColumnsShowStatus">updateTableColumnsShowStatus</el-button>
        </div>

        <search-page ref="searchPageRef" :search-form-props="searchFormProps" :action-bar-props="actionBarProps" :data-table-props="dataTableProps" />
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
        { name: "name", type: "input", label: "姓名" },
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
        },
        {
            contents: "导出",
            handleCode: "EXPORT",
            click: () => {
                ElMessage.info("导出");
            }
        }
    ]
});

// 模拟查询数据
const mockQuery = async function (params: any) {
    console.log("查询参数:", params);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        total: 2,
        rows: [
            { id: 1, name: "张三", age: 25, status: "1", createTime: "2026-01-15 10:30:00" },
            { id: 2, name: "李四", age: 30, status: "0", createTime: "2026-02-20 14:00:00" }
        ]
    };
};

// 数据表格配置
const dataTableProps: Ref<DataTableProps> = ref({
    query: mockQuery,
    columns: [
        { label: "ID", prop: "id", width: 80 },
        { label: "姓名", prop: "name", minWidth: 120 },
        { label: "年龄", prop: "age", width: 80 },
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

/** 手动查询 */
const handleQuery = () => {
    searchPageRef.value?.query();
    ElMessage.info("已触发 query 查询");
};

/** 获取搜索表单实时值 */
const handleGetSearchingValue = () => {
    const value = searchPageRef.value?.getSearchingValue();
    ElMessage.info("getSearchingValue: " + JSON.stringify(value));
};

/** 获取已搜索结果值 */
const handleGetSearchedValue = () => {
    const value = searchPageRef.value?.getSearchedValue();
    ElMessage.info("getSearchedValue: " + JSON.stringify(value));
};

/** 修改表单字段 */
const handleChangeFormFields = () => {
    searchPageRef.value?.changeFormFields(formFields => {
        const hasAge = formFields.some(f => f.name === "age");
        if (!hasAge) {
            formFields.push({ name: "age", type: "inputNumber", label: "年龄" });
            ElMessage.success("已添加年龄字段");
        } else {
            const index = formFields.findIndex(f => f.name === "age");
            formFields.splice(index, 1);
            ElMessage.info("已移除年龄字段");
        }
    });
};

/** 修改操作按钮 */
const handleChangeButtons = () => {
    searchPageRef.value?.changeButtons(btns => {
        const hasImport = btns.some(b => b.handleCode === "IMPORT");
        if (!hasImport) {
            btns.push({
                contents: "导入",
                handleCode: "IMPORT",
                click: () => {
                    ElMessage.info("导入操作");
                }
            });
            ElMessage.success("已添加导入按钮");
        } else {
            const index = btns.findIndex(b => b.handleCode === "IMPORT");
            btns.splice(index, 1);
            ElMessage.info("已移除导入按钮");
        }
    });
};

/** 更新数据列显示状态 */
const handleUpdateTableColumnsShowStatus = () => {
    // 仅显示 ID、姓名列
    searchPageRef.value?.updateTableColumnsShowStatus(["id", "name"]);
    ElMessage.info("已更新列显示状态，仅显示 ID 和姓名列");
};
</script>

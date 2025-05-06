<template>
    <div class="demo-box">
        <search-page ref="searchPageRef" :search-form-props="searchFormProps" :action-bar-props="actionBarProps" :data-table-props="dataTableProps" @select-rows-change="selectRowsChangeHandle">
            <template #actionBar_default>
                <el-radio-group v-model="tabValue" @change="tabChangeHandle">
                    <el-radio-button value="全部" label="全部" />
                    <el-radio-button value="待处理" label="待处理" />
                    <el-radio-button value="已处理" label="已处理" />
                </el-radio-group>
            </template>
            <template #actionBar_more>
                <el-dropdown style="margin-left: 8px">
                    <el-button>
                        更多操作
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :disabled="selectRows.length === 0">批量启用</el-dropdown-item>
                            <el-dropdown-item :disabled="selectRows.length === 0">批量禁用</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </search-page>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";
import { SearchPage, type SearchPageRef, type SearchFormProps, type DataTableProps, type ActionBarProps, type ActionButton } from "@yujinjin/cms-components-main/index";

const searchPageRef = ref<SearchPageRef>();

const selectRows = ref([]);

const tabValue = ref("全部");

const searchFormProps = reactive<SearchFormProps>({
    fields: [
        { name: "keyword", label: "关键词", type: "input" },
        {
            name: "status",
            label: "状态",
            type: "select",
            data: [
                { label: "启用", value: "1" },
                { label: "禁用", value: "0" }
            ]
        }
    ]
});

const actionBarProps = reactive<ActionBarProps>({
    align: "right",
    buttons: [
        {
            type: "success",
            contents: "新增",
            click: () => {
                ElMessage.success("点击了新增按钮");
            }
        },
        {
            type: "warning",
            contents: "导出",
            click: () => {
                ElMessage.success("点击了导出按钮");
            }
        },
        {
            type: "danger",
            contents: "批量删除",
            disabled: true,
            click: (rows: any[]) => {
                ElMessage.success(`删除数据：${rows.map(item => item.name).join(",")}`);
            }
        },
        { slot: "actionBar_more" }
    ]
});

const dataTableProps: DataTableProps = {
    columns: [{ type: "selection" }, { prop: "id", label: "ID", width: 80 }, { prop: "name", label: "名称" }, { prop: "status", label: "状态" }, { prop: "createTime", label: "创建时间" }],
    queryParametersProcess: (params: any) => {
        params.tabValue = tabValue.value;
        return params;
    },
    query: async (params: any) => {
        // 模拟接口请求
        console.log("查询参数:", params);
        return {
            rows: [
                { id: 1, name: "测试1", status: "启用", createTime: "2024-01-01" },
                { id: 2, name: "测试2", status: "禁用", createTime: "2024-01-02" }
            ],
            total: 2
        };
    }
};

const selectRowsChangeHandle = function (rows) {
    selectRows.value = rows;
    searchPageRef.value?.changeButtons((butttons: ActionButton[]) => {
        butttons[2].disabled = rows.length === 0;
    });
};

const tabChangeHandle = function () {
    searchPageRef.value?.query();
};
</script>

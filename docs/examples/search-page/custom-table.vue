<template>
    <div class="demo-box">
        <search-page :search-form-props="searchFormProps" :action-bar-props="actionBarProps" :data-table-props="dataTableProps">
            <template #dataTable_status="{ row }">
                <el-tag :type="row.status === '1' ? 'success' : 'danger'">{{ row.status === "1" ? "启用" : "禁用" }}</el-tag>
            </template>
        </search-page>

        <dialog-form v-if="dialogVisible" ref="dialogFormRef" :input-form-props="inputFormData" :dialog-props="{ title: dialogTitle }" :buttons="dialogFormButtons" @close="dialogVisible = false" />
    </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive, shallowRef } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import {
    type DialogFormButton,
    SearchPage,
    DialogForm,
    type SearchPageRef,
    type SearchFormProps,
    type DataTableProps,
    type ActionBarProps,
    type DialogFormRef,
    type InputFormProps
} from "@yujinjin/cms-components/index";

const searchPageRef = ref<SearchPageRef>();

const dialogFormRef = ref<DialogFormRef>();

const dialogVisible = ref(false);

const isEdit = ref(false);

const inputFormData = reactive<InputFormProps>({
    isLoading: false,
    value: {
        keyword: "",
        status: "1"
    },
    fields: [
        { name: "keyword", label: "关键词", type: "input", rules: [{ required: true, message: "请输入姓名" }] },
        {
            name: "status",
            label: "状态",
            type: "radio",
            data: [
                { label: "启用", value: "1" },
                { label: "禁用", value: "0" }
            ]
        }
    ]
});

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

const actionBarProps = shallowRef<ActionBarProps>({
    buttons: [
        {
            type: "success",
            contents: "新增",
            icon: Plus,
            click: () => {
                isEdit.value = false;
                inputFormData.value!.keyword = "";
                inputFormData.value!.status = "1";
                dialogVisible.value = true;
            }
        }
    ]
});

const dataTableProps: DataTableProps = {
    columns: [
        { type: "selection" },
        { prop: "id", label: "ID", width: 80 },
        { prop: "keyword", label: "关键词" },
        { prop: "status", label: "状态", slot: "dataTable_status" },
        { prop: "createTime", label: "创建时间" },
        {
            type: "action",
            width: 200,
            buttons: [
                {
                    contents: "编辑",
                    handleCode: "EDIT",
                    click: (row: any) => {
                        isEdit.value = true;
                        inputFormData.value!.keyword = row.keyword;
                        inputFormData.value!.status = row.status;
                        dialogVisible.value = true;
                    }
                },
                {
                    contents: "删除",
                    handleCode: "DELETE",
                    click: (row: any) => {
                        ElMessage.success(`删除数据：${row.keyword}`);
                        searchPageRef.value?.query();
                    }
                }
            ]
        }
    ],
    query: async (params: any) => {
        // 模拟接口请求
        console.log("查询参数:", params);
        return {
            rows: [
                { id: 1, keyword: "测试1", status: "1", createTime: "2024-01-01" },
                { id: 2, keyword: "测试2", status: "0", createTime: "2024-01-02" }
            ],
            total: 2
        };
    }
};

const dialogTitle = computed(() => (isEdit.value ? "编辑" : "新增"));

const dialogFormButtons: DialogFormButton[] = [
    {
        type: "primary",
        contents: "提交",
        click: async (data: any) => {
            await dialogFormRef.value?.validate();
            ElMessage.info(`${isEdit.value ? "编辑数据:" : "新增数据:"}: ${JSON.stringify(data)}`);
        }
    },
    {
        type: "danger",
        contents: "取消",
        click: () => {
            ElMessage.info("取消");
        }
    }
];
</script>

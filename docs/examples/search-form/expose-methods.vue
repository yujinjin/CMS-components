<template>
    <div class="demo-box">
        <search-form ref="searchFormRef" :fields="fields" :is-show-collapse="false" @search="handleSearch" />
        <div class="button-panel">
            <el-button @click="handleGetValue">获取搜索值</el-button>
            <el-button @click="handleChangeFields">隐藏状态字段</el-button>
        </div>
        <div v-if="resultInfo" class="result-info">
            <p>{{ resultInfo }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type SearchFormField, type SearchFormRef } from "@yujinjin/cms-components-main/index";

const searchFormRef = ref<SearchFormRef>();
const resultInfo = ref("");

const fields: SearchFormField[] = [
    { name: "keyword", label: "关键词", type: "input" },
    {
        name: "status",
        label: "状态",
        type: "select",
        value: "1",
        defaultValue: "1",
        data: [
            { label: "启用", value: "1" },
            { label: "禁用", value: "0" }
        ]
    }
];

const handleSearch = (data: any) => {
    resultInfo.value = `搜索数据: ${JSON.stringify(data)}`;
};

const handleGetValue = () => {
    const value = searchFormRef.value?.getValue();
    resultInfo.value = `当前搜索值: ${JSON.stringify(value)}`;
};

const handleChangeFields = () => {
    searchFormRef.value?.changeFormFields(formFields => {
        const statusField = formFields.find(f => f.name === "status");
        if (statusField) {
            statusField.isShow = false;
        }
    });
    resultInfo.value = "已隐藏状态字段";
};
</script>
<style scoped>
.button-panel {
    margin-top: 16px;
}

.result-info {
    margin-top: 12px;
    padding: 12px;
    background-color: #f5f7fa;
    border-radius: 4px;
}

.result-info p {
    margin: 0;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
</style>

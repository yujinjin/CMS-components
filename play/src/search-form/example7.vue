<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2026-06-11 10:00:00
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2026-06-11 10:00:00
 * @项目的路径: \CMS-components\play\src\search-form\example7.vue
 * @描述: search-form组件的expose方法与隐藏按钮示例
-->
<template>
    <div class="example-page">
        <h3>expose 方法与隐藏按钮</h3>
        <p class="demo-desc">演示 getValue、changeFormFields 方法，以及通过 isShowSearchButton、isShowResetButton 隐藏默认按钮</p>

        <!-- 隐藏默认搜索和重置按钮，仅展示组件方法调用 -->
        <search-form ref="searchFormRef" :fields="fields" :is-show-search-button="false" :is-show-reset-button="false" />

        <div class="button-panel">
            <el-button type="primary" @click="handleGetValue">getValue</el-button>
            <el-button type="success" @click="handleChangeFormFields">changeFormFields</el-button>
            <el-button type="warning" @click="handleSearch">手动搜索</el-button>
            <el-button type="danger" @click="handleReset">手动重置</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type SearchFormField, type SearchFormRef, SearchForm } from "@yujinjin/cms-components-main/index";

// 搜索表单实例引用
const searchFormRef = ref<SearchFormRef>();

// 搜索表单字段
const fields = ref<SearchFormField[]>([
    { name: "keyword", label: "关键词", type: "input" },
    {
        name: "status",
        label: "状态",
        type: "select",
        data: [
            { label: "启用", value: "1" },
            { label: "禁用", value: "0" }
        ]
    },
    { name: "category", label: "分类", type: "input" }
]);

/** 获取搜索表单值 */
const handleGetValue = () => {
    const value = searchFormRef.value?.getValue();
    ElMessage.info("getValue: " + JSON.stringify(value));
};

/** 修改表单字段属性 */
const handleChangeFormFields = () => {
    searchFormRef.value?.changeFormFields(formFields => {
        // 动态添加一个新字段
        const hasPriority = formFields.some(f => f.name === "priority");
        if (!hasPriority) {
            formFields.push({
                name: "priority",
                label: "优先级",
                type: "select",
                data: [
                    { label: "高", value: "high" },
                    { label: "中", value: "medium" },
                    { label: "低", value: "low" }
                ]
            });
            ElMessage.success("已添加优先级字段");
        } else {
            // 如果已有优先级字段则移除
            const index = formFields.findIndex(f => f.name === "priority");
            formFields.splice(index, 1);
            ElMessage.info("已移除优先级字段");
        }
    });
};

/** 手动触发搜索 */
const handleSearch = () => {
    const value = searchFormRef.value?.getValue();
    ElMessage.success("手动搜索: " + JSON.stringify(value));
};

/** 手动触发重置 */
const handleReset = () => {
    searchFormRef.value?.changeFormFields(formFields => {
        // 将所有字段值清空
        formFields.forEach(f => {
            f.value = "";
        });
    });
    ElMessage.info("已手动重置所有字段");
};
</script>

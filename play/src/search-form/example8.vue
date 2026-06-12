<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2026-06-11 10:00:00
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2026-06-11 10:00:00
 * @项目的路径: \CMS-components\play\src\search-form\example8.vue
 * @描述: search-form组件的默认值与自定义标签后缀示例
-->
<template>
    <div class="example-page">
        <h3>默认值与自定义标签</h3>
        <p class="demo-desc">通过 defaultValue 设置字段默认值（重置后恢复默认值），通过 labelSuffix 自定义标签后缀。</p>

        <search-form :fields="fields" label-suffix=" >>" @search="handleSearch" @reset="handleReset" />

        <div class="tip-panel">
            <el-alert title="说明" type="info" :closable="false" description="defaultValue 设置的字段默认值，在重置操作后会恢复到该默认值而不是空值。labelSuffix 可自定义标签后缀，默认为 '：'。" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { type SearchFormField, SearchForm } from "@yujinjin/cms-components-main/index";

// 搜索表单字段（部分字段设置了 defaultValue）
const fields = ref<SearchFormField[]>([
    { name: "keyword", label: "关键词", type: "input", defaultValue: "初始关键词" },
    {
        name: "status",
        label: "状态",
        type: "select",
        defaultValue: "1",
        data: [
            { label: "启用", value: "1" },
            { label: "禁用", value: "0" }
        ]
    },
    { name: "category", label: "分类", type: "input", defaultValue: "" },
    {
        name: "priority",
        label: "优先级",
        type: "select",
        defaultValue: "medium",
        data: [
            { label: "高", value: "high" },
            { label: "中", value: "medium" },
            { label: "低", value: "low" }
        ]
    }
]);

/** 搜索事件 */
const handleSearch = (searchFormValue: Record<string, any>) => {
    ElMessage.info("搜索数据: " + JSON.stringify(searchFormValue));
};

/** 重置事件 */
const handleReset = (searchFormValue: Record<string, any>) => {
    ElMessage.info("重置后恢复默认值: " + JSON.stringify(searchFormValue));
};
</script>
<style lang="scss" scoped>
.tip-panel {
    margin-top: 16px;
}
</style>

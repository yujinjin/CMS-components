<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:41:23
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-17 17:53:43
 * @项目的路径: \CMS-components\play\src\search-form\example4.vue
 * @描述: search-form组件的自定义表单项示例
-->
<template>
    <div class="example-page">
        <h3>自定义表单项</h3>
        <search-form :fields="fields" @search="handleSearch">
            <template #custom="{ field }">
                <div class="custom-range">
                    <el-input-number v-model="field.value.min" :min="0" placeholder="最小值" />
                    <span class="separator">-</span>
                    <el-input-number v-model="field.value.max" :min="0" placeholder="最大值" />
                </div>
            </template>
        </search-form>
    </div>
</template>
<script setup lang="ts">
import { type SearchFormField, SearchForm } from "@yujinjin/cms-components/index";

const fields: SearchFormField[] = [
    { name: "name", label: "名称", type: "input" },
    {
        name: "type",
        label: "类型",
        type: "select",
        data: [
            { label: "类型1", value: "1" },
            { label: "类型2", value: "2" }
        ]
    },
    { name: "range", label: "范围", slot: "custom", value: { min: null, max: null } }
];

const handleSearch = (data: any) => {
    console.log("搜索数据:", data);
};
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
.custom-range {
    display: flex;
    align-items: center;
    gap: 8px;

    .separator {
        color: #909399;
    }
}
</style>

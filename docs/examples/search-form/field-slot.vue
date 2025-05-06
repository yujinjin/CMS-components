<template>
    <div class="demo-box">
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
import { ElMessage } from "element-plus";
import { type SearchFormField } from "@yujinjin/cms-components-main/index";

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
    ElMessage.success("搜索数据:" + JSON.stringify(data));
};
</script>
<style scoped>
.custom-range {
    display: flex;
    align-items: center;
    gap: 8px;
}

.custom-range .separator {
    color: #909399;
}
</style>

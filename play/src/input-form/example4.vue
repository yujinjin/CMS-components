<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:31:04
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-17 10:55:08
 * @项目的路径: \CMS-components\play\src\input-form\example4.vue
 * @描述: input-form组件的动态表单示例 
-->
<template>
    <div class="example-page">
        <h3>动态表单</h3>
        <input-form ref="inputFormRef" :value="formData" :fields="fields" label-width="100px">
            <template #custom="{ field, formValue }">
                <div class="custom-field">
                    <el-input v-model="formValue[field.name]" />
                    <el-button @click="deleteField(field)">删除字段</el-button>
                </div>
            </template>
        </input-form>
        <div class="button-panel">
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button @click="addField">新增字段</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { type InputFormField, type InputFormRef, InputForm } from "@yujinjin/cms-components-main/index";

const inputFormRef = ref<InputFormRef>();

const formData = ref({
    field1: "",
    field2: ""
});

const fields = ref<InputFormField[]>([
    { name: "field1", label: "字段1", type: "input" },
    { name: "field2", label: "字段2", slot: "custom" }
]);

const handleSubmit = (data: any) => {
    console.log("提交数据:", data);
};

// 保存表单值
const saveFormValue = () => {
    const formValue = inputFormRef.value!.getInputValue();
    fields.value.forEach(field => {
        formData.value[field.name] = formValue![field.name];
    });
};

const addField = () => {
    saveFormValue();

    let i = fields.value.length + 1;
    while (fields.value.find(field => field.name === `field${i}`)) {
        i++;
    }
    fields.value.push({
        name: `field${i}`,
        label: `字段${i}`,
        slot: "custom"
    });
    formData.value[`field${i}`] = "";
};

const deleteField = (field: InputFormField) => {
    const index = fields.value.findIndex(f => f.name === field.name);
    if (index > -1) {
        fields.value.splice(index, 1);
        delete formData.value[field.name];
    }
    saveFormValue();
};
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}

.custom-field {
    display: flex;
    gap: 12px;
}

.button-panel {
    margin-top: 24px;
    padding-left: 100px;
}
</style>

<template>
    <div class="demo-box">
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
import { ElMessage } from "element-plus";
import { type InputFormField, type InputFormRef } from "@yujinjin/cms-components-main/index";

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
    ElMessage.success("提交数据:" + JSON.stringify(data));
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
<style scoped>
.custom-field {
    display: flex;
    gap: 12px;
}

.button-panel {
    margin-top: 24px;
    padding-left: 100px;
}
</style>

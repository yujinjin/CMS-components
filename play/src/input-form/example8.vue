<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2026-06-11 10:00:00
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2026-06-11 10:00:00
 * @项目的路径: \CMS-components\play\src\input-form\example8.vue
 * @描述: input-form组件的表单禁用与加载示例
-->
<template>
    <div class="example-page">
        <h3>表单禁用与加载</h3>
        <p class="demo-desc">通过 isLoading 切换加载状态，通过 props.disabled 禁用整个表单</p>

        <div class="switch-panel">
            <div class="switch-item">
                <span>加载状态：</span>
                <el-switch v-model="isLoading" active-text="加载中" inactive-text="正常" />
            </div>
            <div class="switch-item">
                <span>禁用状态：</span>
                <el-switch v-model="isDisabled" active-text="已禁用" inactive-text="正常" />
            </div>
        </div>

        <input-form :value="formData" :fields="fields" :is-loading="isLoading" :props="formProps" label-width="100px" />
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { type InputFormField, InputForm } from "@yujinjin/cms-components-main/index";

// 加载状态
const isLoading = ref(false);

// 禁用状态
const isDisabled = ref(false);

// 表单 props，根据禁用状态动态计算
const formProps = computed(() => ({
    disabled: isDisabled.value
}));

// 表单数据
const formData = ref({
    name: "",
    age: null,
    gender: "",
    birthday: ""
});

// 表单字段配置
const fields: InputFormField[] = [
    { name: "name", label: "姓名", type: "input" },
    { name: "age", label: "年龄", type: "inputNumber" },
    {
        name: "gender",
        label: "性别",
        type: "select",
        data: [
            { label: "男", value: "male" },
            { label: "女", value: "female" }
        ]
    },
    { name: "birthday", label: "生日", type: "datePicker" }
];
</script>
<style lang="scss" scoped>
.switch-panel {
    display: flex;
    gap: 20px;
    margin-bottom: 16px;
}
.switch-item {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>

<template>
    <div class="demo-box">
        <el-form label-width="100px" :disabled="formDisabled">
            <el-form-item label="表单禁用">
                <el-switch v-model="formDisabled" />
            </el-form-item>
            <el-form-item label="文本输入">
                <input-field v-model="inputValue" type="input" />
            </el-form-item>
            <el-form-item label="数字输入">
                <input-field v-model="numberValue" type="inputNumber" />
            </el-form-item>
            <el-form-item label="选择器">
                <input-field v-model="selectValue" type="select" :data="selectData" />
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const formDisabled = ref(false);

const inputValue = ref("");
const numberValue = ref(null);
const selectValue = ref("");

const selectData = [
    { label: "选项1", value: "1" },
    { label: "选项2", value: "2" },
    { label: "选项3", value: "3" }
];
</script>

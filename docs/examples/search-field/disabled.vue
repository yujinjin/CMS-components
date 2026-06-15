<template>
    <div class="demo-box">
        <el-form :disabled="formDisabled">
            <el-form-item label="表单禁用">
                <el-switch v-model="formDisabled" />
            </el-form-item>
            <search-field v-model="keyword" type="input" :props="{ placeholder: '请输入关键词' }" />
            <search-field v-model="status" type="select" :data="statusData" />
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const formDisabled = ref(false);

const keyword = ref("");
const status = ref("");

const statusData = [
    { label: "启用", value: "1" },
    { label: "禁用", value: "0" }
];
</script>

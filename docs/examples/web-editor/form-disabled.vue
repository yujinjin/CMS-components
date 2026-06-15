<template>
    <div class="demo-box">
        <el-form :disabled="formDisabled">
            <el-form-item label="表单禁用">
                <el-switch v-model="formDisabled" />
            </el-form-item>
            <el-form-item label="富文本编辑器">
                <ClientOnly>
                    <web-editor v-model="content" style="min-height: 150px; max-height: 300px" />
                </ClientOnly>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const formDisabled = ref(false);

const content = ref("<p>当表单禁用时，编辑器也会自动变为只读模式</p>");
</script>

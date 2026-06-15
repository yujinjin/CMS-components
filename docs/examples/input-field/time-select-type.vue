<template>
    <div class="demo-box">
        <el-form label-width="100px">
            <el-form-item label="时间选择">
                <input-field v-model="timeValue" type="timeSelect" :props="{ start: '08:00', step: '00:30', end: '20:00', placeholder: '选择时间' }" />
            </el-form-item>
        </el-form>
        <p class="value-info">当前值：{{ timeValue }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const timeValue = ref("");
</script>
<style scoped>
.value-info {
    margin-top: 8px;
    color: #606266;
    font-size: 14px;
}
</style>

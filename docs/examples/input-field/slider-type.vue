<template>
    <div class="demo-box">
        <el-form label-width="100px">
            <el-form-item label="滑块">
                <input-field v-model="sliderValue" type="slider" :props="{ min: 0, max: 100, step: 10 }" />
            </el-form-item>
        </el-form>
        <p class="value-info">当前值：{{ sliderValue }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const sliderValue = ref(30);
</script>
<style scoped>
.value-info {
    margin-top: 8px;
    color: #606266;
    font-size: 14px;
}
</style>

<template>
    <div class="demo-box">
        <p>Array&lt;number&gt; 类型 data：</p>
        <check-select v-model="numberValue" :data="numberData" style="width: 240px" />
        <p class="value-info">当前选中值：{{ numberValue }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const numberValue = ref([0, 1]);
const numberData: Array<number> = Array.from({ length: 10 }, (_, index) => index);
</script>
<style scoped>
.value-info {
    margin-top: 8px;
    color: #606266;
    font-size: 14px;
}
</style>

<template>
    <div class="demo-box">
        <p>空 data 数据源：</p>
        <check-select v-model="emptyValue" :data="[]" style="width: 240px" placeholder="暂无选项" />
        <p class="value-info">当前选中值：{{ emptyValue }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const emptyValue = ref([]);
</script>
<style scoped>
.value-info {
    margin-top: 8px;
    color: #606266;
    font-size: 14px;
}
</style>

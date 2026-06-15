<template>
    <div class="demo-box">
        <p>Array&lt;string&gt; 类型 data：</p>
        <check-select v-model="stringValue" :data="stringData" style="width: 240px" />
        <p class="value-info">当前选中值：{{ stringValue }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const stringValue = ref(["option 1", "option 2"]);
const stringData: Array<string> = Array.from({ length: 10 }, (_, index) => `option ${index}`);
</script>
<style scoped>
.value-info {
    margin-top: 8px;
    color: #606266;
    font-size: 14px;
}
</style>

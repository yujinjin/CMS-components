<template>
    <div class="demo-box">
        <div class="demo-block">
            <input-field v-model="value1" type="datePicker" placeholder="选择日期" />
            <input-field v-model="value2" type="datePicker" :props="{ type: 'datetime' }" placeholder="选择日期时间" />
            <input-field v-model="value3" type="timePicker" placeholder="选择时间" />
            <input-field v-model="value4" type="datePicker" :props="{ type: 'daterange' }" start-placeholder="开始日期" end-placeholder="结束日期" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
const value4 = ref([]);
</script>
<style lang="scss" scoped>
.demo-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>

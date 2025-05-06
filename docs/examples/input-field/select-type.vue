<template>
    <div class="demo-box">
        <div class="demo-block">
            <input-field v-model="value1" type="select" :data="options" placeholder="下拉选择" />
            <input-field v-model="value2" type="radio" :data="options" />
            <input-field v-model="value3" type="checkbox" :data="options" />
            <input-field v-model="value4" type="checkSelect" :data="options" placeholder="多选下拉" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const value1 = ref("");
const value2 = ref("");
const value3 = ref([]);
const value4 = ref([]);

const options = Array.from({ length: 10 }, (value, index) => ({ value: index.toString(), label: `选项 ${index}`, disabled: index % 2 === 0 }));
</script>
<style scoped>
.demo-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>

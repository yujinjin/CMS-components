<template>
    <div class="demo-box">
        <check-select v-model="value" :data="data" style="width: 240px" />

        <check-select v-model="value" :data="data2" style="width: 240px" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const value = ref(["1", "2"]);
const data: Array<string> = Array.from({ length: 10 }, (value, index) => `option ${index}`);

const data2: Array<{ value: string; label: string }> = Array.from({ length: 10 }, (value, index) => ({ value: index.toString(), label: `选项 ${index}` }));
</script>

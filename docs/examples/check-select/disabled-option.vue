<template>
    <div class="demo-box">
        <check-select v-model="value" :data="data" option-value-key="id" option-label-key="name" style="width: 240px" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const value = ref();
const data: Array<{ id: string; name: string; disabled: boolean }> = Array.from({ length: 20 }, (value, index) => ({
    id: `option${index}`,
    name: `选项 ${index}`,
    disabled: index % 2 === 0
}));
</script>

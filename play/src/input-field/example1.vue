<template>
    <div class="example-page">
        <input-field v-model="value" type="checkSelect" :data="dataList" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { InputField } from "@yujinjin/cms-components/index";

const dataList = ref([
    { label: "Radio 1", value: "1" },
    { label: "Radio 2", value: "2" }
]);

const value = ref();
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

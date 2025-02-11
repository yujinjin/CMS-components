<template>
    <div class="demo-box">
        <input-field v-model="value" placeholder="请输入" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
</script>

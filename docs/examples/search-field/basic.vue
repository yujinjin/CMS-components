<template>
    <div class="demo-box">
        <search-field v-model="value" placeholder="请输入搜索内容" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
</script>

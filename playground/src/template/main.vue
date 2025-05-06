<script setup>
// @ts-ignore
import App from "./App.vue";
import { setupElementPlus } from "./element-plus.ts";
import { setupCMSComponents } from "./cms-components.ts";
setupElementPlus();
setupCMSComponents();
</script>

<template>
    <App />
</template>

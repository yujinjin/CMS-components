<template>
    <div class="tpl">
        <h1>{{ message }}</h1>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
// import type { Ref, ComputedRef } from "vue";
// import { Router, useRouter } from "vue-router";
// import { storageStore, eventsStore } from "@/stores";

// 全局路由对象
// const router: Router = useRouter();

// vuex
// const storageData = storageStore();

// const props = defineProps({})

// const emits = defineEmits([""])

const message = ref("Hello World!");
</script>
<style lang="less" scoped>
.tpl {
}
</style>

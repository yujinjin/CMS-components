<template>
    <div class="tpl">
        <h3>{{ message }}</h3>
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
const message = ref("这是一个测试页面");
</script>
<style lang="less" scoped>
.tpl {
}
</style>

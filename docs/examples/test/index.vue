<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-27 15:48:05
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-17 17:01:22
 * @项目的路径: \CMS-components\docs\examples\test\index.vue
 * @描述: 测试
-->
<template>
    <div class="tpl">
        <h1>{{ message }}</h1>
        <svg-icon value="delete"></svg-icon>
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

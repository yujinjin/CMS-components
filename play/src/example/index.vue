<template>
    <div class="tpl">
        <h3>message:{{ message }}</h3>
        <span>id: {{ id }}</span>
    </div>
</template>
<script setup lang="ts">
// import type { Ref } from "vue";
import type { Ref } from "vue";
import { ref } from "vue";
import { guid } from "@cms-components/utils";
// import { ref } from "vue";
// import type { Ref } from "vue";
// import { Router, useRouter } from "vue-router";
// import { storageStore, eventsStore } from "@/stores";

// 全局路由对象
// const router: Router = useRouter();

// vuex
// const storageData = storageStore();

// const props = defineProps({})

// const emits = defineEmits([""])
const message: Ref<string> = ref("这是一个测试页面");

const id: Ref<string> = ref(guid());
</script>
<style lang="less" scoped>
.tpl {
}
</style>

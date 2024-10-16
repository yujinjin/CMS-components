<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-27 15:48:05
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-09-03 16:10:57
 * @项目的路径: \CMS-components\play\src\example\index.vue
 * @描述: 演示页面
-->
<template>
    <div class="tpl">
        <h3>message:{{ message }}</h3>
        <span>id: {{ id }}</span>
        <el-button />
    </div>
</template>
<script setup lang="ts">
import { ElButton } from "element-plus";
// import type { Ref } from "vue";
import type { Ref } from "vue";
import { ref } from "vue";
// import { guid } from "@yujinjin/utils";
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

const id: Ref<string> = ref("ssss");
</script>
<style lang="less" scoped>
.tpl {
}
</style>

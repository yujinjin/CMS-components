<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:02:37
 * @最后修改作者: yujinjin-jk
 * @最后修改时间: 2026-06-11
 * @项目的路径: \CMS-components\play\src\check-select\example4.vue
 * @描述: check-select组件自定义宽度示例
-->
<template>
    <div class="example-page">
        <h3>自定义宽度</h3>
        <p class="demo-desc">通过 style 自定义组件宽度</p>
        <div class="demo-block">
            <check-select v-model="values" :data="data" style="width: 300px" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { CheckSelect } from "@yujinjin/cms-components-main/index";
import { ref } from "vue";

const values = ref(["1", "2"]);
const data: Array<{ value: string; label: string }> = Array.from({ length: 10 }, (value, index) => ({ value: index.toString(), label: `option ${index}` }));
</script>

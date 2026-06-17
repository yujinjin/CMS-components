<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:01:39
 * @最后修改作者: yujinjin-jk
 * @最后修改时间: 2026-06-17
 * @项目的路径: \CMS-components\play\src\check-select\example2.vue
 * @描述: check-select组件禁用选项示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>部分禁用</h3>
            <p class="demo-desc">通过 data 项的 disabled 属性禁用特定选项，禁用选项无法通过全选或手动勾选选中/取消</p>
            <div class="demo-block">
                <check-select v-model="values" :data="data" option-value-key="id" option-label-key="name" />
                <div class="value-display">当前值：{{ values }}</div>
            </div>
        </div>

        <div class="demo-section">
            <h3>部分禁用 + 数量限制</h3>
            <p class="demo-desc">禁用选项与 multipleLimit 配合使用时，禁用选项不计入可选名额，全选只选到限制数量</p>
            <div class="demo-block">
                <check-select v-model="values2" :data="data" option-value-key="id" option-label-key="name" :props="{ multipleLimit: 3 }" />
                <div class="value-display">当前值：{{ values2 }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CheckSelect } from "@yujinjin/cms-components-main/index";
import { ref } from "vue";

const values = ref<string[]>(["1", "2"]);
const values2 = ref<string[]>(["1"]);
const data: Array<{ id: string; name: string; disabled?: boolean }> = Array.from({ length: 10 }, (_, index) => ({
    id: index.toString(),
    name: `选项 ${index}`,
    disabled: index % 3 === 0 // 每3个禁用1个
}));
</script>

<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: check-select 组件 - 边界情况示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>空数据</h3>
            <p class="demo-desc">data 为空数组时，下拉框无选项可选</p>
            <div class="demo-block">
                <check-select v-model="emptyValues" :data="[]" />
                <div class="value-display">当前值：{{ emptyValues }}</div>
            </div>
        </div>

        <div class="demo-section">
            <h3>部分禁用</h3>
            <p class="demo-desc">部分选项设置 disabled=true，其余选项仍可正常选择</p>
            <div class="demo-block">
                <check-select v-model="partialDisabledValues" :data="partialDisabledData" option-value-key="id" option-label-key="name" />
                <div class="value-display">当前值：{{ partialDisabledValues }}</div>
            </div>
        </div>

        <div class="demo-section">
            <h3>单选项数据</h3>
            <p class="demo-desc">data 只有一个选项时的表现</p>
            <div class="demo-block">
                <check-select v-model="singleValues" :data="singleData" option-value-key="id" option-label-key="name" />
                <div class="value-display">当前值：{{ singleValues }}</div>
            </div>
        </div>

        <div class="demo-section">
            <h3>大量数据</h3>
            <p class="demo-desc">data 包含大量选项时，验证渲染性能和滚动体验</p>
            <div class="demo-block">
                <check-select v-model="largeValues" :data="largeData" option-value-key="id" option-label-key="name" :props="{ filterable: true }" />
                <div class="value-display">当前值：{{ largeValues }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { CheckSelect } from "@yujinjin/cms-components-main/index";

const emptyValues = ref<string[]>([]);

const partialDisabledValues = ref<string[]>(["0"]);
const partialDisabledData = Array.from({ length: 8 }, (_, index) => ({
    id: index.toString(),
    name: `选项 ${index}`,
    disabled: index % 3 === 0 // 每3个禁用1个
}));

const singleValues = ref<string[]>(["0"]);
const singleData = [{ id: "0", name: "唯一选项" }];

const largeValues = ref<string[]>(["0", "5"]);
const largeData = Array.from({ length: 200 }, (_, index) => ({
    id: index.toString(),
    name: `选项 ${index}`
}));
</script>

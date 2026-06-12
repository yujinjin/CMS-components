<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: check-select 组件 - 字符串/数字数据类型示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>字符串数据</h3>
            <p class="demo-desc">data 为字符串数组时，自动将每个元素映射为 { label: item, value: item }</p>
            <div class="demo-block">
                <check-select v-model="stringValues" :data="stringData" />
                <div class="value-display">当前值：{{ stringValues }}</div>
            </div>
        </div>

        <div class="demo-section">
            <h3>数字数据</h3>
            <p class="demo-desc">data 为数字数组时，自动将每个元素映射为 { label: item, value: item }</p>
            <div class="demo-block">
                <check-select v-model="numberValues" :data="numberData" />
                <div class="value-display">当前值：{{ numberValues }}</div>
            </div>
        </div>

        <div class="demo-section">
            <h3>对象数据（自定义 key）</h3>
            <p class="demo-desc">使用 optionValueKey 和 optionLabelKey 自定义对象数组的键名映射</p>
            <div class="demo-block">
                <check-select v-model="objectValues" :data="objectData" option-value-key="id" option-label-key="name" />
                <div class="value-display">当前值：{{ objectValues }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { CheckSelect } from "@yujinjin/cms-components-main/index";

const stringValues = ref<string[]>(["apple"]);
const stringData = ["apple", "banana", "cherry", "date", "elderberry"];

const numberValues = ref<number[]>([1, 3]);
const numberData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const objectValues = ref<string[]>(["001"]);
const objectData = Array.from({ length: 5 }, (_, index) => ({
    id: `00${index + 1}`,
    name: `选项 ${index + 1}`
}));
</script>

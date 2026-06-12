<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: input-field 组件 - slider、timeSelect、selectV2 类型示例
-->
<template>
    <div class="example-page">
        <div class="demo-section">
            <h3>slider 滑块</h3>
            <p class="demo-desc">更多输入类型：slider、timeSelect、selectV2</p>
            <div class="demo-block">
                <div class="field-item">
                    <span class="field-label">基础滑块：</span>
                    <input-field v-model="sliderValue1" type="slider" />
                </div>
                <div class="field-item">
                    <span class="field-label">带范围和步长：</span>
                    <input-field v-model="sliderValue2" type="slider" :props="{ min: 0, max: 100, step: 10, showStops: true }" />
                </div>
                <div class="field-item">
                    <span class="field-label">带输入框：</span>
                    <input-field v-model="sliderValue3" type="slider" :props="{ showInput: true, min: 0, max: 100 }" />
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h3>timeSelect 时间选择</h3>
            <div class="demo-block">
                <div class="field-item">
                    <span class="field-label">基础时间选择：</span>
                    <input-field v-model="timeSelectValue1" type="timeSelect" />
                </div>
                <div class="field-item">
                    <span class="field-label">自定义间隔：</span>
                    <input-field v-model="timeSelectValue2" type="timeSelect" :props="{ start: '00:00', step: '00:30', end: '23:30' }" />
                </div>
            </div>
        </div>

        <div class="demo-section">
            <h3>selectV2 虚拟化选择</h3>
            <div class="demo-block">
                <div class="field-item">
                    <span class="field-label">虚拟化选择：</span>
                    <input-field v-model="selectV2Value" type="selectV2" :props="{ options: largeOptions, clearable: true }" placeholder="请选择" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { InputField } from "@yujinjin/cms-components-main/index";

const sliderValue1 = ref(0);
const sliderValue2 = ref(50);
const sliderValue3 = ref(30);

const timeSelectValue1 = ref("");
const timeSelectValue2 = ref("");

const selectV2Value = ref("");
// 生成大量选项用于虚拟化选择
const largeOptions = Array.from({ length: 1000 }, (_, index) => ({
    label: `选项 ${index + 1}`,
    value: `opt_${index + 1}`
}));
</script>
<style lang="scss" scoped>
.demo-block {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .field-item {
        display: flex;
        align-items: center;
        gap: 12px;

        .field-label {
            min-width: 120px;
            font-size: 14px;
            color: #606266;
        }

        :deep(.el-slider) {
            width: 300px;
        }

        :deep(.el-select-v2) {
            width: 300px;
        }
    }
}
</style>

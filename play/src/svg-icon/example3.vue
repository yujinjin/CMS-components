<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: svg-icon 组件 - 不同尺寸对比示例
-->
<template>
    <div class="example-page">
        <section class="demo-section">
            <h3>不同尺寸对比</h3>
            <p class="demo-desc">size 支持 number 和 string 类型。数字和纯数字字符串会自动加 px 单位，其他字符串原样使用</p>
            <div class="demo-block">
                <div v-for="item in sizeList" :key="item.label" class="size-item">
                    <svg-icon :value="WarningSign" :size="item.value" />
                    <span class="size-label">{{ item.label }}</span>
                </div>
            </div>
        </section>

        <section class="demo-section">
            <h3>带颜色的尺寸对比</h3>
            <p class="demo-desc">同时指定 size 和 color 属性，可自定义尺寸和颜色</p>
            <div class="demo-block">
                <div v-for="item in sizeList" :key="item.label" class="size-item">
                    <svg-icon :value="Fold" :size="item.value" color="#818cf8" />
                    <span class="size-label">{{ item.label }}</span>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { SvgIcon } from "@yujinjin/cms-components-main/index";
import WarningSign from "./svgs/warning-sign.svg";
import Fold from "./svgs/fold.svg";

const sizeList = [
    { label: "size=12（数字）", value: 12 },
    { label: "size=16（数字）", value: 16 },
    { label: "size=24（数字）", value: 24 },
    { label: "size=32（数字）", value: 32 },
    { label: "size=48（数字）", value: 48 },
    { label: 'size="1rem"（字符串）', value: "1rem" },
    { label: 'size="2em"（字符串）', value: "2em" },
    { label: 'size=""（空，默认）', value: "" }
];
</script>

<style lang="scss" scoped>
.demo-block {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.size-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 80px;

    .size-label {
        font-size: 12px;
        color: #64748b;
        text-align: center;
        word-break: break-all;
    }
}
</style>

<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: svg-icon 组件 - 字符串/Component value 对比与数字 size 示例
-->
<template>
    <div class="example-page">
        <!-- Component 方式（当前主流方式） -->
        <section class="demo-section">
            <h3>Component 方式（推荐）</h3>
            <p class="demo-desc">通过 import SVG 文件作为 Component 传入 value，支持颜色和样式自定义</p>
            <div class="demo-block">
                <svg-icon :value="WarningSign" size="24" color="#e6a23c" />
                <svg-icon :value="Fold" size="32" color="#67c23a" />
                <svg-icon :value="FullScreen" size="48" color="#409eff" />
                <svg-icon :value="VueLogo" size="40" />
            </div>
        </section>

        <!-- Slot 方式 -->
        <section class="demo-section">
            <h3>Slot 方式（不传 value）</h3>
            <p class="demo-desc">当 value 为空时，通过默认 slot 插入内容。适用于需要更灵活的自定义内容场景</p>
            <div class="demo-block">
                <svg-icon color="#f56c6c">
                    <component :is="ExitFullScreen" />
                </svg-icon>
                <svg-icon size="36">
                    <component :is="WarningSign" />
                </svg-icon>
                <svg-icon>
                    <span style="font-size: 14px">无图标内容</span>
                </svg-icon>
            </div>
        </section>

        <!-- 数字 size -->
        <section class="demo-section">
            <h3>数字 size 属性</h3>
            <p class="demo-desc">size 可以是数字类型（自动加 px 单位）或字符串类型</p>
            <div class="demo-block">
                <div class="size-item">
                    <svg-icon :value="WarningSign" :size="16" />
                    <span class="size-label">size=16（数字）</span>
                </div>
                <div class="size-item">
                    <svg-icon :value="WarningSign" :size="24" />
                    <span class="size-label">size=24（数字）</span>
                </div>
                <div class="size-item">
                    <svg-icon :value="WarningSign" :size="32" />
                    <span class="size-label">size=32（数字）</span>
                </div>
                <div class="size-item">
                    <svg-icon :value="WarningSign" size="24px" />
                    <span class="size-label">size="24px"（字符串）</span>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { SvgIcon } from "@yujinjin/cms-components-main/index";
import ExitFullScreen from "./svgs/exit-full-screen.svg";
import Fold from "./svgs/fold.svg";
import WarningSign from "./svgs/warning-sign.svg";
import FullScreen from "./svgs/full-screen.svg";
import VueLogo from "./svgs/vue-logo.svg";
</script>

<style lang="scss" scoped>
.demo-block {
    display: flex;
    align-items: center;
    gap: 20px;
}

.size-item {
    display: flex;
    align-items: center;
    gap: 8px;

    .size-label {
        font-size: 13px;
        color: #64748b;
    }
}
</style>

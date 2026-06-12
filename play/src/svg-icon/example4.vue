<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @描述: svg-icon 组件 - 边界情况示例
-->
<template>
    <div class="example-page">
        <!-- value 为空 -->
        <section class="demo-section">
            <h3>value 为空</h3>
            <p class="demo-desc">当 value 未传或为空字符串时，组件仅渲染外层 i 标签，可通过默认 slot 插入内容</p>
            <div class="demo-block">
                <div class="case-item">
                    <span class="case-label">不传 value：</span>
                    <svg-icon />
                </div>
                <div class="case-item">
                    <span class="case-label">value=""：</span>
                    <svg-icon value="" />
                </div>
                <div class="case-item">
                    <span class="case-label">空 value + slot：</span>
                    <svg-icon>
                        <component :is="WarningSign" />
                    </svg-icon>
                </div>
            </div>
        </section>

        <!-- color 为空 -->
        <section class="demo-section">
            <h3>color 为空</h3>
            <p class="demo-desc">当 color 未传或为空字符串时，使用继承的颜色（默认为当前文本颜色）</p>
            <div class="demo-block">
                <div class="case-item">
                    <span class="case-label">不传 color：</span>
                    <svg-icon :value="Fold" size="24" />
                </div>
                <div class="case-item">
                    <span class="case-label">color=""：</span>
                    <svg-icon :value="Fold" size="24" color="" />
                </div>
                <div class="case-item" style="color: #f56c6c">
                    <span class="case-label">继承红色：</span>
                    <svg-icon :value="Fold" size="24" />
                </div>
            </div>
        </section>

        <!-- size 边界 -->
        <section class="demo-section">
            <h3>size 边界情况</h3>
            <p class="demo-desc">size 为 0、空字符串或负数时的表现</p>
            <div class="demo-block">
                <div class="case-item">
                    <span class="case-label">size=0：</span>
                    <svg-icon :value="WarningSign" :size="0" />
                </div>
                <div class="case-item">
                    <span class="case-label">size=""：</span>
                    <svg-icon :value="WarningSign" size="" />
                </div>
                <div class="case-item">
                    <span class="case-label">不传 size：</span>
                    <svg-icon :value="WarningSign" />
                </div>
            </div>
        </section>

        <!-- aria-label 无障碍 -->
        <section class="demo-section">
            <h3>aria-label 无障碍</h3>
            <p class="demo-desc">当 value 为字符串时，自动设置 aria-label 属性；为 Component 时不设置</p>
            <div class="demo-block">
                <div class="case-item">
                    <span class="case-label">Component value（无 aria-label）：</span>
                    <svg-icon :value="WarningSign" size="24" />
                </div>
                <div class="case-item">
                    <span class="case-label">空 value（无 aria-label）：</span>
                    <svg-icon size="24" />
                </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { SvgIcon } from "@yujinjin/cms-components-main/index";
import WarningSign from "./svgs/warning-sign.svg";
import Fold from "./svgs/fold.svg";
</script>

<style lang="scss" scoped>
.demo-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.case-item {
    display: flex;
    align-items: center;
    gap: 8px;

    .case-label {
        font-size: 14px;
        color: #475569;
        min-width: 180px;
    }
}
</style>

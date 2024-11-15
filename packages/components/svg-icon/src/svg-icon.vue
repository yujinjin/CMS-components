<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-30 19:32:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-06 14:59:12
 * @项目的路径: \CMS-components\packages\components\svg-icon\src\svg-icon.vue
 * @描述: svg 图标
-->
<template>
    <i class="icon">
        <svg class="svg-icon" aria-hidden="true">
            <use :xlink:href="'#icon-' + value" />
        </svg>
    </i>
</template>

<script lang="ts" setup>
import { svgIconProps } from "./svg-icon";

// 声明组件名称
defineOptions({
    name: "SvgIcon"
});

// 声明组件属性
defineProps(svgIconProps);
</script>
<style lang="scss" scoped>
.icon {
    .svg-icon {
        height: 1em;
        width: 1em;
        line-height: 1em;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        fill: currentColor;
        color: var(--color);
        font-size: inherit;
    }
}
</style>

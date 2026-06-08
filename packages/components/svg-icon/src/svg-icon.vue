<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-30 19:32:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-06 14:59:12
 * @项目的路径: \CMS-components\packages\components\svg-icon\src\svg-icon.vue
 * @描述: svg 图标
-->
<template>
    <i class="cms-icon" :style="iconStyle" :aria-label="value && typeof value === 'string' ? value : undefined">
        <svg v-if="value && typeof value === 'string'" class="svg-icon" aria-hidden="true">
            <use :xlink:href="'#icon-' + value" />
        </svg>
        <component :is="value" v-else-if="value" />
        <slot />
    </i>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { svgIconProps } from "./svg-icon";

// 声明组件名称
defineOptions({
    name: "SvgIcon"
});

// 声明组件属性
const props = defineProps(svgIconProps);

// 计算图标样式，将模板内复杂表达式提取为 computed
const iconStyle = computed(() => {
    const style: Record<string, string> = {};
    if (props.color) {
        style.color = props.color;
    }
    if (props.size) {
        // size 为数字或纯数字字符串时添加 px 单位，否则直接使用原值
        style.fontSize = typeof props.size === "number" || /^\d+$/.test(String(props.size)) ? props.size + "px" : String(props.size);
    }
    return style;
});
</script>

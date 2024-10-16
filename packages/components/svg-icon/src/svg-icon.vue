<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-30 19:32:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-09-26 20:10:13
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

defineOptions({
    name: "SvgIcon"
});

defineProps(svgIconProps);
</script>

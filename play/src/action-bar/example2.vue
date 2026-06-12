<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:00:12
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-13 14:55:37
 * @项目的路径: \CMS-components\play\src\action-bar\example2.vue
 * @描述: action-bar组件自定义图标示例
-->
<template>
    <div class="example-page">
        <h3>自定义图标</h3>
        <p class="demo-desc">通过 icon 属性为按钮配置 Element Plus 图标组件，customIcon 属性支持自定义图标渲染</p>
        <div class="demo-block">
            <action-bar :buttons="buttons"></action-bar>
        </div>
    </div>
</template>
<script setup lang="ts">
import { shallowRef } from "vue";
import { Plus, Edit } from "@element-plus/icons-vue";
import { type ActionButton, ActionBar } from "@yujinjin/cms-components-main/index";

const buttons = shallowRef<ActionButton[]>([
    { contents: "新增", type: "primary", icon: Plus },
    { contents: "批量删除", customIcon: Edit }
]);
</script>

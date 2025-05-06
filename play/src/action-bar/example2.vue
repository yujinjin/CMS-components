<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 11:00:12
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-13 14:55:37
 * @项目的路径: \CMS-components\play\src\action-bar\example2.vue
 * @描述: action-bar组件带搜索功能示例
-->
<template>
    <div class="example-page">
        <h3>自定义图标及布局</h3>
        <action-bar :buttons="buttons" align="right">
            <el-button :icon="Download">导出</el-button>
        </action-bar>
    </div>
</template>
<script setup lang="ts">
import { shallowRef } from "vue";
import { Download, Plus, Edit } from "@element-plus/icons-vue";
import { type ActionButton, ActionBar } from "@yujinjin/cms-components-main/index";

const buttons = shallowRef<ActionButton[]>([
    { contents: "新增", type: "primary", icon: Plus },
    { contents: "批量删除", customIcon: Edit }
]);
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

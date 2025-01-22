<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:58:22
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-13 16:00:36
 * @项目的路径: \CMS-components\play\src\action-bar\example1.vue
 * @描述: action-bar组件基础用法示例
-->
<template>
    <div class="example-page">
        <h3>基础用法</h3>
        <action-bar :buttons="buttons">
            <el-button :icon="Download">导出</el-button>
        </action-bar>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Download } from "@element-plus/icons-vue";
import { type ActionButton, ActionBar } from "@yujinjin/cms-components/index";

const buttons = ref<ActionButton[]>([{ contents: "新增", type: "primary" }, { contents: "批量删除" }]);
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
</style>

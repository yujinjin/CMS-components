<template>
    <div class="demo-box">
        <action-bar :buttons="buttons" align="right">
            <el-button :icon="Download">导出</el-button>
        </action-bar>
    </div>
</template>
<script setup lang="ts">
import { shallowRef } from "vue";
import { Download, Plus, Edit } from "@element-plus/icons-vue";
import { type ActionButton } from "@yujinjin/cms-components/index";

const buttons = shallowRef<ActionButton[]>([
    { contents: "新增", type: "primary", icon: Plus },
    { contents: "批量删除", customIcon: Edit }
]);
</script>

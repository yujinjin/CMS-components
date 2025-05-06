<script setup lang="ts">
import { ref, version as vueVersion } from "vue";
import { version as epVersion } from "element-plus";
import { ElementPlus, Download } from "@element-plus/icons-vue";
import CMSComponents, { type ActionButton } from "@yujinjin/cms-components";

const msg = ref("Hello World!");

const buttons = ref<ActionButton[]>([{ contents: "新增", type: "primary" }, { contents: "批量删除" }]);
</script>

<template>
    <h1>{{ msg }}</h1>
    <action-bar :buttons="buttons">
        <el-button :icon="Download">导出</el-button>
    </action-bar>
    <p>
        <el-icon color="var(--el-color-primary)"><ElementPlus /></el-icon>
        CMS Components {{ CMSComponents.version }} + Element Plus {{ epVersion }} + Vue {{ vueVersion }}
    </p>
</template>

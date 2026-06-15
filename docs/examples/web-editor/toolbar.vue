<template>
    <div class="demo-box">
        <ClientOnly>
            <web-editor v-model="content" :toolbar="toolbarConfig" style="min-height: 200px; max-height: 400px" />
        </ClientOnly>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const content = ref("<p>自定义工具栏示例，仅保留了加粗、斜体、下划线、链接功能</p>");

// 仅显示部分工具栏按钮
const toolbarConfig = [["bold", "italic", "underline", "link"]];
</script>

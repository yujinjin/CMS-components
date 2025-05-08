<template>
    <div class="demo-box">
        <ClientOnly>
            <web-editor v-model="content" style="min-height: 200px; max-height: 400px" placeholder="请输入内容..." />
        </ClientOnly>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const content = ref("<p>这是一个基础的富文本编辑器示例</p>");
</script>

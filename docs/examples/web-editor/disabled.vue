<template>
    <div class="demo-box">
        <ClientOnly>
            <web-editor v-model="content" :disabled="readonly" />
        </ClientOnly>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const content = ref(`
    <h2>这是一个标题</h2>
    <p>这是一段普通文本</p>
    <ul>
        <li>列表项 1</li>
        <li>列表项 2</li>
        <li>列表项 3</li>
    </ul>
    <blockquote>这是一段引用文本</blockquote>
`);

const readonly = ref(true);
</script>

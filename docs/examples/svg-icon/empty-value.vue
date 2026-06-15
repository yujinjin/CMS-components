<template>
    <div class="demo-box">
        <!-- 空值时不渲染图标 -->
        <p>空字符串 value：</p>
        <svg-icon :value="emptyValue" />
        <span class="hint">（不会渲染任何图标）</span>

        <p style="margin-top: 12px">未匹配的 value：</p>
        <svg-icon value="not-exist-icon" />
        <span class="hint">（SVG 雪碧图中不存在的名称不会渲染）</span>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const emptyValue = ref("");
</script>
<style scoped>
.demo-box {
    max-width: 600px;
}

.hint {
    color: #909399;
    font-size: 13px;
    margin-left: 8px;
}
</style>

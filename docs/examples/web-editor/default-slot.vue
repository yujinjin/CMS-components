<template>
    <div class="demo-box">
        <web-editor v-model="content" placeholder="请输入内容...">
            <el-tooltip content="全屏源码编辑">
                <el-icon class="full-screen-icon"><FullScreen /></el-icon>
            </el-tooltip>
        </web-editor>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { FullScreen } from "@element-plus/icons-vue";

const content = ref("<p>这是一个基础的富文本编辑器示例</p>");
</script>
<style scoped>
.full-screen-icon {
    position: absolute;
    bottom: 1px;
    right: 1px;
    z-index: 99;
    cursor: pointer;
    font-size: 16px;
    line-height: 16px;
    height: 16px;
    width: 16px;
    color: #999;
}

.full-screen-icon:hover {
    color: var(--el-color-primary);
}
</style>

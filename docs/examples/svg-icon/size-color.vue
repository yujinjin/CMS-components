<template>
    <div class="demo-box">
        <svg-icon value="exit-full-screen" :size="16" color="#409EFF" />
        <svg-icon value="full-screen" :size="24" color="#67C23A" />
        <svg-icon value="fold" :size="32" color="#E6A23C" />
        <div class="size-info">
            <p>size=16 (数字), color="#409EFF"</p>
            <p>size=24 (数字), color="#67C23A"</p>
            <p>size="32px" (字符串), color="#E6A23C"</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import "./svgs/exit-full-screen.svg";
import "./svgs/fold.svg";
import "./svgs/full-screen.svg";
</script>
<style scoped>
.demo-box {
    max-width: 600px;
}

.size-info {
    margin-top: 12px;
    padding: 12px;
    background-color: #f5f7fa;
    border-radius: 4px;
}

.size-info p {
    margin: 4px 0;
    color: #606266;
    font-size: 14px;
}
</style>

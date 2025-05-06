<template>
    <div class="demo-box">
        <svg-icon v-for="icon in icons" :key="icon" :value="icon" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

// 加载所有svg文件
const svgs = import.meta.glob("./svgs/*.svg");

const icons = ref<string[]>([]);
Object.keys(svgs).forEach(async key => {
    await svgs[key]();
    icons.value.push(key.match(/\.\/svgs\/(.*)\.svg/)![1]);
});
</script>
<style scoped>
.demo-box {
    max-width: 600px;
}

.demo-box i {
    margin-right: 10px;
}
</style>

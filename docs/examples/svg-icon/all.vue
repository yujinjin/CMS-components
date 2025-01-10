<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-08 10:41:21
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-29 09:40:39
 * @项目的路径: \CMS-components\docs\examples\svg-icon\all.vue
 * @描述: 加载目录下所有svg文件的示例
-->
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
<style lang="scss" scoped>
.demo-box {
    max-width: 600px;

    i {
        margin-right: 10px;
    }
}
</style>

<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-10 17:31:02
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2023-03-20 14:32:36
 * @项目的路径: \CMS-components\docs\.vitepress\theme\components\demo\example.vue
 * @描述: 示例
-->
<template>
    <div class="example-showcase">
        <ClientOnly>
            <component :is="demo" v-if="demo" v-bind="$attrs" />
        </ClientOnly>
    </div>
</template>
<script setup lang="ts">
defineProps({
    file: {
        type: String
    },
    demo: {
        type: Object,
        required: true
    }
});
</script>
<style lang="less" scoped>
.example-showcase {
    padding: 1.5rem;
    margin: 0.5px;
}
</style>

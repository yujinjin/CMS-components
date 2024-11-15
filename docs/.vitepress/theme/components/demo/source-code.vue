<!-- eslint-disable vue/no-v-html -->
<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-10 17:31:21
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-25 17:07:14
 * @项目的路径: \CMS-components\docs\.vitepress\theme\components\demo\source-code.vue
 * @描述: 示例源码
-->
<template>
    <div class="example-source-wrapper">
        <div v-if="sources.length === 1" class="example-source language-vue" v-html="sources[index].highlightSourceHtml" />
        <el-tabs v-else :model-value="index" class="source-tabs" @tab-change="tabChangeHandle">
            <el-tab-pane v-for="(sourceItem, i) in sources" :key="sourceItem.path" :label="sourceItem.path" :name="i">
                <div class="example-source" :class="['language-' + sourceItem.suffixName]" v-html="sourceItem.highlightSourceHtml" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang="ts">
import { type PropType } from "vue";
import { type Docs } from "/#/docs";

defineProps({
    sources: {
        type: Array as PropType<Docs.Source[]>,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
});

const emits = defineEmits(["update:index"]);

// tab变化事件
const tabChangeHandle = function (tabIndex) {
    emits("update:index", tabIndex);
};
</script>
<style lang="less" scoped>
.language-vue {
    margin: 0;
    border-radius: 0;
}

:deep(.source-tabs) {
    .el-tabs__header {
        background-color: var(--code-bg-color);
        margin: 0px;
    }

    .el-tabs__nav-wrap {
        padding: 0px 12px;
    }
}
</style>

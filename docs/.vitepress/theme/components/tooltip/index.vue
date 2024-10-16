<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-23 14:00:21
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-09-12 16:56:38
 * @项目的路径: \CMS-components\docs\.vitepress\theme\components\tooltip\index.vue
 * @描述: 提示信息组件，MD内容格式示例：^[Function]`(event: MouseEvent) => void`
-->
<template>
    <span class="tooltip-box">
        <code class="code-text">
            {{ type }}
        </code>
        <ClientOnly>
            <ElTooltip v-if="details" effect="light" trigger="click">
                <ElButton text class="tooltip-button" :icon="Warning" />
                <template #content>
                    <slot>
                        <div class="tooltip-contents">
                            <code>
                                {{ details }}
                            </code>
                        </div>
                    </slot>
                </template>
            </ElTooltip>
        </ClientOnly>
    </span>
</template>
<script setup lang="ts">
import { Warning } from "@element-plus/icons-vue";
defineProps({
    type: {
        type: String,
        default: null
    },
    details: {
        type: String,
        default: null
    }
});
</script>
<style lang="scss" scoped>
span.tooltip-box {
    display: inline-flex;
    align-items: center;

    .code-text {
        margin-right: 0.25rem;
    }

    .tooltip-button {
        padding: 0.5rem;
    }
}

.tooltip-contents {
    margin: 0.25rem;
    code {
        color: var(--code-tooltip-color);
        background-color: var(--code-tooltip-bg-color);
    }
}
</style>

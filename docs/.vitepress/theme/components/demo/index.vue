<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-10 17:30:23
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-17 16:14:53
 * @项目的路径: \CMS-components\docs\.vitepress\theme\components\demo\index.vue
 * @描述: 示例组件
-->
<template>
    <ClientOnly>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="describe-text" v-html="decodedDescription"></div>
        <div class="example">
            <Example :file="decodedMainVueFilePath" :demo="demoComponent" />

            <ElDivider style="margin: 0px" />

            <div class="op-btns">
                <ElTooltip content="去 playground 运行" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
                    <ElIcon :size="16" aria-label="去 playground 运行" class="op-btn" tabindex="0" role="button" @click="gotoPlaygroundPage">
                        <i class="docs-icon-chemistry" />
                    </ElIcon>
                </ElTooltip>
                <ElTooltip content="复制代码" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
                    <ElIcon
                        :size="16"
                        aria-label="复制代码"
                        class="op-btn"
                        tabindex="0"
                        role="button"
                        @click="copyCodeHandle"
                        @keydown.prevent.enter="copyCodeHandle"
                        @keydown.prevent.space="copyCodeHandle"
                    >
                        <i class="docs-icon-copy" />
                    </ElIcon>
                </ElTooltip>
                <ElTooltip content="查看源码" :show-arrow="false" :trigger="['hover', 'focus']" :trigger-keys="[]">
                    <button ref="sourceCodeRef" :aria-label="sourceVisible ? '隐藏源码' : '查看源码'" class="reset-btn el-icon op-btn" @click="toggleSourceVisibleHandle()">
                        <ElIcon :size="16">
                            <i class="docs-icon-code" />
                        </ElIcon>
                    </button>
                </ElTooltip>
            </div>

            <ElCollapseTransition>
                <SourceCode v-show="sourceVisible" v-model:index="currentSourceIndex" :sources="decodeSourceList" />
            </ElCollapseTransition>

            <Transition name="el-fade-in-linear">
                <div v-show="sourceVisible" class="example-float-control" tabindex="0" role="button" @click="toggleSourceVisibleHandle" @keydown="onSourceVisibleKeydown">
                    <ElIcon :size="16">
                        <CaretTop />
                    </ElIcon>
                    <span>隐藏源码</span>
                </div>
            </Transition>
        </div>
    </ClientOnly>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { CaretTop } from "@element-plus/icons-vue";
import type { ComputedRef } from "vue";
import type { Docs } from "/#/docs";
import { useClipboard } from "@vueuse/core";
import Example from "./example.vue";
import SourceCode from "./source-code.vue";

const props = defineProps({
    // 示例源码文件列表（Array JSON string）
    sources: {
        type: String,
        required: true
    },
    // 主要vue入口文件路径
    mainVueFilePath: {
        type: String,
        required: true
    },
    // 示例描述内容
    description: {
        type: String,
        default: ""
    }
});

const demoComponents: Record<string, any> = import.meta.glob("../../../../examples/**/*.vue", {
    eager: true
});

// 当前展示的源码
const currentSourceIndex = ref(0);

// 是否展示源码
const sourceVisible = ref(false);

// 展示源码Ref
const sourceCodeRef = ref<HTMLButtonElement>();

// demo内容描述
const decodedDescription = computed(() => (props.description ? decodeURIComponent(props.description!) : null));

// 编译后的主文件路径
const decodedMainVueFilePath = computed(() => (props.mainVueFilePath ? decodeURIComponent(props.mainVueFilePath!) : ""));

// demo组件
const demoComponent = computed(() => {
    return demoComponents["../../../../examples/" + decodedMainVueFilePath.value].default;
});

// 源码列表
const decodeSourceList: ComputedRef<Docs.Source[]> = computed(() => {
    return JSON.parse(decodeURIComponent(props.sources)) as Docs.Source[];
});

// 复制操作
const { copy, isSupported } = useClipboard({ legacy: true });

// 跳转演练场页面
const gotoPlaygroundPage = function () {
    // TODO: 去Playground页面
};

// 复制代码操作
const copyCodeHandle = async function () {
    if (!isSupported.value) {
        ElMessage.error("您的浏览器不支持Clipboard API!");
        return;
    }
    try {
        await copy(decodeSourceList.value[currentSourceIndex.value].source);
        ElMessage.success("复制成功");
    } catch (e: any) {
        ElMessage.error(e.message || "复制失败");
    }
};

// 切换是否展示源码状态
const toggleSourceVisibleHandle = function () {
    sourceVisible.value = !sourceVisible.value;
};

// 源码展示状态切换按键事件
const onSourceVisibleKeydown = (e: KeyboardEvent) => {
    if (["Enter", "Space"].includes(e.code)) {
        e.preventDefault();
        toggleSourceVisibleHandle();
        sourceCodeRef.value?.focus();
    }
};
</script>
<style lang="scss" scoped>
.example {
    border: 1px solid var(--border-color);
    border-radius: var(--el-border-radius-base);

    .op-btns {
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 2.5rem;

        .el-icon {
            &:hover {
                color: var(--text-color);
            }
        }

        .op-btn {
            margin: 0 0.5rem;
            cursor: pointer;
            color: var(--text-color-lighter);
            transition: 0.2s;

            &.github a {
                transition: 0.2s;
                color: var(--text-color-lighter);

                &:hover {
                    color: var(--text-color);
                }
            }
        }
    }

    &-float-control {
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid var(--border-color);
        height: 44px;
        box-sizing: border-box;
        background-color: var(--bg-color, #fff);
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        margin-top: -1px;
        color: var(--el-text-color-secondary);
        cursor: pointer;
        position: sticky;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        span {
            font-size: 14px;
            margin-left: 10px;
        }

        &:hover {
            color: var(--el-color-primary);
        }
    }
}
</style>

<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-06 11:32:58
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 18:02:58
 * @项目的路径: \CMS-components\play\src\svg-icon\example.vue
 * @描述: svg-icon 组件示例
-->
<template>
    <div class="svg-icon-demo">
        <!-- 基础用法 -->
        <section class="demo-section">
            <h3>基础用法</h3>
            <div class="demo-block">
                <svg-icon value="fold" />
                <svg-icon value="warning-sign" />
                <svg-icon value="exit-full-screen" />
            </div>
        </section>

        <!-- 不同颜色 -->
        <section class="demo-section">
            <h3>不同颜色</h3>
            <div class="demo-block">
                <svg-icon value="fold" style="color: #67c23a" />
                <svg-icon value="fold" style="color: #e6a23c" />
                <svg-icon value="fold" style="color: #f56c6c" />
                <svg-icon value="fold" style="color: #909399" />
            </div>
        </section>

        <!-- 不同尺寸 -->
        <section class="demo-section">
            <h3>不同尺寸</h3>
            <div class="demo-block">
                <svg-icon value="warning-sign" style="font-size: 16px" />
                <svg-icon value="warning-sign" style="font-size: 24px" />
                <svg-icon value="warning-sign" style="font-size: 32px" />
                <svg-icon value="warning-sign" style="font-size: 48px" />
            </div>
        </section>

        <!-- 点击事件 -->
        <section class="demo-section">
            <h3>点击事件</h3>
            <div class="demo-block">
                <svg-icon value="full-screen" class="clickable" @click="handleClick" />
            </div>
        </section>

        <!-- 所有图标列表 -->
        <section class="demo-section">
            <h3>图标列表</h3>
            <div ref="iconListRef" class="icon-list">
                <div v-for="icon in icons" :key="icon" class="icon-item" :data-clipboard-text="'<svg-icon value=\'' + icon + '\' />'">
                    <svg-icon :value="icon" />
                    <span class="icon-name">{{ icon }}</span>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Clipboard from "clipboard";
import { ElMessage } from "element-plus";
import { SvgIcon } from "@yujinjin/cms-components/index";

// 加载所有svg文件
const svgs = import.meta.glob("./svgs/*.svg");

const iconListRef = ref<HTMLDivElement>();
const icons = ref<string[]>([]);

// 加载所有图标
Object.keys(svgs).forEach(async key => {
    await svgs[key]();
    icons.value.push(key.match(/\.\/svgs\/(.*)\.svg/)![1]);
});

let clipboard: Clipboard;

onMounted(() => {
    // 初始化剪贴板
    clipboard = new Clipboard(".icon-list > .icon-item", { container: iconListRef.value });
    clipboard.on("success", function () {
        ElMessage({
            message: "已复制图标代码到剪贴板",
            type: "success"
        });
    });
    clipboard.on("error", function () {
        ElMessage.error("复制失败");
    });
});

onUnmounted(() => {
    if (clipboard) {
        clipboard.destroy();
    }
});

const handleClick = () => {
    ElMessage({
        message: "图标被点击",
        type: "success"
    });
};
</script>

<style lang="scss" scoped>
.svg-icon-demo {
    padding: 20px;

    .demo-section {
        margin-bottom: 30px;

        h3 {
            margin-bottom: 16px;
            font-size: 18px;
            font-weight: 500;
            color: #1f2f3d;
        }

        .demo-block {
            padding: 20px;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 20px;

            .clickable {
                cursor: pointer;
                transition: color 0.3s;

                &:hover {
                    color: #409eff;
                }
            }
        }
    }

    .icon-list {
        border-top: 1px solid #dcdfe6;
        border-left: 1px solid #dcdfe6;
        border-radius: 4px;
        display: grid;
        grid-template-columns: repeat(8, 1fr);

        .icon-item {
            height: 90px;
            border-right: 1px solid #dcdfe6;
            border-bottom: 1px solid #dcdfe6;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.3s;

            &:hover {
                background-color: #f5f7fa;
            }

            .icon-name {
                margin-top: 8px;
                font-size: 12px;
                color: #606266;
            }
        }
    }
}
</style>

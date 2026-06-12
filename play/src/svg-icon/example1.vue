<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-06 11:32:58
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 18:02:58
 * @项目的路径: \CMS-components\play\src\svg-icon\example.vue
 * @描述: svg-icon 组件示例
-->
<template>
    <div class="example-page">
        <!-- 基础用法 -->
        <section class="demo-section">
            <h3>基础用法</h3>
            <p class="demo-desc">通过 value 属性传入 SVG Component，即可渲染对应的 SVG 图标</p>
            <div class="demo-block">
                <svg-icon :value="ExitFullScreen" />
                <svg-icon :value="WarningSign" />
                <svg-icon :value="Fold" />
                <svg-icon :value="FullScreen" />
                <svg-icon :value="VueLogo" />
            </div>
        </section>

        <!-- 不同颜色 -->
        <section class="demo-section">
            <h3>不同颜色</h3>
            <p class="demo-desc">通过 color 属性自定义图标颜色</p>
            <div class="demo-block">
                <svg-icon :value="Fold" color="#67c23a" />
                <svg-icon :value="Fold" color="#e6a23c" />
                <svg-icon :value="Fold" color="#f56c6c" />
                <svg-icon :value="Fold" color="#909399" />
            </div>
        </section>

        <!-- 不同尺寸 -->
        <section class="demo-section">
            <h3>不同尺寸</h3>
            <p class="demo-desc">通过 size 属性控制图标大小，支持数字（自动加 px）和字符串类型</p>
            <div class="demo-block">
                <svg-icon :value="WarningSign" size="16px" />
                <svg-icon :value="WarningSign" size="24px" />
                <svg-icon :value="WarningSign" size="32px" />
                <svg-icon :value="WarningSign" size="48px" />
            </div>
        </section>

        <!-- 点击事件 -->
        <section class="demo-section">
            <h3>点击事件</h3>
            <p class="demo-desc">svg-icon 支持原生 click 事件，可用于交互场景</p>
            <div class="demo-block">
                <svg-icon :value="ExitFullScreen" class="clickable" @click="handleClick" />
            </div>
        </section>

        <!-- 所有图标列表 -->
        <section class="demo-section">
            <h3>图标列表</h3>
            <p class="demo-desc">点击图标可复制对应的 svg-icon 使用代码</p>
            <div class="icon-list">
                <div v-for="icon in icons" :key="icon.name" class="icon-item" @click="copyTextHandle('<svg-icon><' + icon.name + '/></svg-icon>')">
                    <svg-icon>
                        <component :is="icon.component" />
                    </svg-icon>
                    <span class="icon-name">{{ icon.name }}</span>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { shallowRef } from "vue";
import { useClipboard } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { SvgIcon } from "@yujinjin/cms-components-main/index";
import ExitFullScreen from "./svgs/exit-full-screen.svg";
import Fold from "./svgs/fold.svg";
import WarningSign from "./svgs/warning-sign.svg";
import FullScreen from "./svgs/full-screen.svg";
import VueLogo from "./svgs/vue-logo.svg";

// 加载所有svg文件
const icons = shallowRef([
    {
        name: "ExitFullScreen",
        component: ExitFullScreen
    },
    {
        name: "Fold",
        component: Fold
    },
    {
        name: "WarningSign",
        component: WarningSign
    },
    {
        name: "FullScreen",
        component: FullScreen
    },
    {
        name: "VueLogo",
        component: VueLogo
    }
]);

const { copy, isSupported } = useClipboard({ legacy: true });

const copyTextHandle = async function (text: string) {
    if (!isSupported.value) {
        ElMessage.error("复制失败，您的浏览器不支持 Clipboard API");
        return;
    }
    await copy(text);
    ElMessage({
        message: "复制成功",
        type: "success",
        duration: 1000
    });
};

const handleClick = () => {
    ElMessage({
        message: "图标被点击",
        type: "success"
    });
};
</script>

<style lang="scss" scoped>
.demo-block {
    display: flex;
    align-items: center;
    gap: 20px;
}

.clickable {
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
        color: #818cf8;
    }
}

.icon-list {
    border-top: 1px solid #e2e8f0;
    border-left: 1px solid #e2e8f0;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);

    .icon-item {
        height: 90px;
        border-right: 1px solid #e2e8f0;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: rgba(99, 102, 241, 0.06);
        }

        .icon-name {
            margin-top: 8px;
            font-size: 12px;
            color: #64748b;
        }
    }
}
</style>

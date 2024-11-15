<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-06 11:32:58
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-07 11:21:25
 * @项目的路径: \CMS-components\play\src\svg-icon\example.vue
 * @描述: svg-icon 组件示例
-->
<template>
    <div class="svg-icon">
        <div ref="iconListRef" class="icon-table">
            <div v-for="icon in icons" :key="icon" class="icon-item" :data-clipboard-text="'<svg-icon value=\'' + icon + '\' />'">
                <svg-icon :value="icon" />
                <span class="icon-name">{{ icon }}</span>
            </div>
        </div>
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
Object.keys(svgs).forEach(async key => {
    await svgs[key]();
    icons.value.push(key.match(/\.\/svgs\/(.*)\.svg/)![1]);
});

let clipboard: Clipboard;

onMounted(() => {
    clipboard = new Clipboard(".icon-table > .icon-item", { container: iconListRef.value });
    clipboard.on("success", function () {
        ElMessage({
            message: "已复制.",
            type: "success"
        });
    });
    clipboard.on("error", function () {
        ElMessage.error("复制失败.");
    });
});

onUnmounted(() => {
    if (clipboard) {
        clipboard.destroy();
    }
});
</script>
<style lang="scss" scoped>
.svg-icon {
    height: 100%;
    width: 100%;

    .icon-table {
        border-top: 1px solid #dcdfe6;
        border-left: 1px solid #dcdfe6;
        border-radius: 4px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        margin: 20px auto;
        width: 800px;

        .icon-item {
            color: #606266;
            height: 90px;
            font-size: 13px;
            border-right: 1px solid #dcdfe6;
            border-bottom: 1px solid #dcdfe6;
            transition: background-color 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            cursor: pointer;

            &:hover {
                background-color: #f2f6fc;
            }

            i {
                font-size: 20px;
            }

            .icon-name {
                margin-top: 8px;
                text-align: center;
            }
        }
    }
}
</style>

<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-26 16:02:37
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-15 16:47:50
 * @项目的路径: \CMS-components\packages\components\action-bar\src\action-bar.vue
 * @描述: action-bar(数据表格操作栏)组件
-->
<template>
    <div class="cms-action-bar-panel">
        <slot v-if="align === 'right' || align === 'center'"></slot>
        <div v-if="actionButtons.length > 0" class="buttons-panel" :style="{ textAlign: align }">
            <template v-for="(button, index) in actionButtons">
                <slot v-if="button.slot" :name="button.slot" :button="button"></slot>
                <el-button v-else :key="(button.handleCode || '') + '_' + index" v-bind="button" @click="clickHandle(button)">
                    <template v-if="button.customIcon">
                        <i v-if="typeof button.customIcon === 'string'" :class="[button.customIcon]"></i>
                        <el-icon v-else><component :is="button.customIcon" /></el-icon>
                    </template>
                    {{ button.contents }}
                </el-button>
            </template>
        </div>
        <slot v-if="align === 'left'"></slot>
    </div>
</template>
<script setup lang="ts">
import { ref, watch, markRaw } from "vue";
import { ElButton, ElIcon } from "element-plus";
import { type ActionButton, type ActionButtonSlotScope, type ActionBarRef, actionBarProps } from "./action-bar";

defineOptions({
    name: "ActionBar"
});

defineSlots<{
    default(): any;
    [key: string]: (props: ActionButtonSlotScope) => any;
}>();

const props = defineProps(actionBarProps);

// 实际数据列中的操作按钮列表
// handleCode: 用户操作CODE
// contents: 按钮操作文案
// click: 按钮点击事件
const actionButtons = ref<ActionButton[]>([]);

// 初始化操作按钮列表
const initActionButtons = function () {
    actionButtons.value = [];
    props.buttons.forEach(button => {
        button = Object.assign({ loading: false }, button);
        if (button.customIcon && typeof button.customIcon === "object") {
            button.customIcon = markRaw(button.customIcon);
        }
        if (button.icon && typeof button.icon === "object") {
            button.icon = markRaw(button.icon);
        }
        actionButtons.value.push(button);
    });
};

// 按钮点击操作
const clickHandle = async function (button: ActionButton) {
    if (button.loading) {
        return;
    }
    button.loading = true;
    try {
        if (button.click) {
            await button.click(props.selectRows, button);
        }
    } catch (error) {
        console.error(error);
    }
    button.loading = false;
};

watch(
    () => props.buttons,
    () => {
        initActionButtons();
    },
    { deep: true, immediate: true }
);

defineExpose<ActionBarRef>({
    // 修改当前生成的button按钮属性值，比如根据选择数据列表列的数据变化动态设置disabled值
    changeButtons: function (callback: (actionButtons: ActionButton[]) => void) {
        if (callback && typeof callback === "function") {
            callback(actionButtons.value);
        } else {
            console.error("callback 必须是一个函数");
        }
    }
});
</script>

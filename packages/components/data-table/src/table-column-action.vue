<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-30 09:37:21
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 17:12:54
 * @项目的路径: \CMS-components\packages\components\data-table\src\table-column-action.vue
 * @描述: table的按钮操作列
-->
<template>
    <div class="cms-table-column-action">
        <el-button v-for="(button, index) in showStatusButtons" :key="(button.handleCode || '') + '_' + index" v-bind="button" @click="clickHandle(button)">
            {{ button.contents }}
        </el-button>
        <el-dropdown v-if="hideStatusButtons.length > 0" popper-class="cms-custom-action-dropdown" @command="dropdownCommandHandle">
            <span>
                <i class="icomoon-more"></i>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="(button, index) in hideStatusButtons" :key="(button.handleCode || '') + '_' + index" :command="index">
                        <el-icon v-if="button.loading" class="is-loading">
                            <Loading />
                        </el-icon>
                        {{ button.contents }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script setup lang="ts">
import { type PropType, markRaw, ref, watch, computed, type Ref, type ComputedRef } from "vue";
import { ElButton, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from "element-plus";
import { Loading } from "@element-plus/icons-vue";
import { type TableButton } from "./data-table";

defineOptions({
    name: "TableColumnAction"
});

const props = defineProps({
    buttons: {
        type: Array as PropType<Array<TableButton>>,
        default: function () {
            return [];
        }
    },
    row: {
        type: Object,
        default: function () {
            return {};
        }
    },
    // 最多显示操作的按钮，超过之后就会隐藏起来
    maxNumShow: {
        type: Number,
        default: 3
    }
});

// 实际数据列中的操作按钮列表
const actionButtons: Ref<Array<TableButton>> = ref([]);

const showStatusButtons: ComputedRef<Array<TableButton>> = computed(() => {
    return actionButtons.value.filter(button => button.isShow);
});

const hideStatusButtons: ComputedRef<Array<TableButton>> = computed(() => {
    return actionButtons.value.filter(button => !button.isShow);
});

// 初始化操作按钮列表
const initActionButtons = function () {
    actionButtons.value = [];
    props.buttons.forEach(button => {
        if (!button.display || button.display(props.row)) {
            // 使用展开运算符创建新对象，避免修改外部传入的原始数据
            const newButton: TableButton = { ...button, loading: false, isShow: true, link: true, type: "primary" };
            if (newButton.icon && typeof newButton.icon === "object") {
                newButton.icon = markRaw(newButton.icon);
            }
            actionButtons.value.push(newButton);
        }
    });
    if (props.maxNumShow && actionButtons.value.length > props.maxNumShow) {
        actionButtons.value.slice(props.maxNumShow).forEach(button => {
            button.isShow = false;
        });
    }
};

// 按钮点击操作
const clickHandle = async function (button: TableButton) {
    if (button.loading) {
        return;
    }
    button.loading = true;
    try {
        if (button.click) {
            await button.click(props.row, button);
        }
    } catch (error) {
        console.error(error);
    }
    button.loading = false;
};

// dropdown 按钮点击事件
const dropdownCommandHandle = function (index: number) {
    const button = hideStatusButtons.value[index];
    if (button) {
        clickHandle(button);
    }
};

watch(
    () => [props.buttons, props.row],
    () => {
        initActionButtons();
    },
    { immediate: true, deep: true }
);
</script>

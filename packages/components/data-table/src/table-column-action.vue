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
import { type PropType, markRaw, ref, watch, computed } from "vue";
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
const actionButtons = ref<TableButton[]>([]);

const showStatusButtons = computed(() => {
    return actionButtons.value.filter(button => button.isShow);
});

const hideStatusButtons = computed(() => {
    return actionButtons.value.filter(button => !button.isShow);
});

// 初始化操作按钮列表
const initActionButtons = function () {
    actionButtons.value = [];
    props.buttons.forEach(button => {
        if (!button.display || button.display(props.row)) {
            button = Object.assign({ loading: false, isShow: true, link: true, type: "primary" }, button);
            if (button.icon && typeof button.icon === "object") {
                button.icon = markRaw(button.icon);
            }
            actionButtons.value.push(button);
        }
    });
    if (props.maxNumShow && actionButtons.value.length > props.maxNumShow) {
        actionButtons.value.slice(props.maxNumShow).forEach(button => {
            button.isShow = false;
        });
    }
};

// 按钮点击操作
const clickHandle = async function (button) {
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
const dropdownCommandHandle = function (index) {
    clickHandle(actionButtons.value[showStatusButtons.value.length + index]);
};

watch(
    () => [props.buttons, props.row],
    () => {
        initActionButtons();
    },
    { immediate: true, deep: true }
);
</script>

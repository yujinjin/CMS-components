<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-08 15:00:10
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 17:16:43
 * @项目的路径: \CMS-components\packages\components\dialog-form\src\dialog-form.vue
 * @描述: 弹窗表单
-->
<template>
    <el-dialog v-if="isShow" v-model="dialogVisible" v-bind="dialogInnerProps" class="cms-common-dialog cms-form-dialog" @closed="dialogClosed">
        <slot></slot>
        <input-form v-bind="inputFormProps" ref="inputFormRef" @field-value-change="inputFormFieldValueChange">
            <template v-for="name in slots" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
            </template>
        </input-form>
        <template v-if="actionButtons.length > 0" #footer>
            <div class="dialog-footer">
                <template v-for="(button, index) in actionButtons" :key="(button.handleCode || '') + '_' + index">
                    <template v-if="button.isShow">
                        <slot v-if="button.slot" :name="button.slot" :button="button"></slot>
                        <el-button v-else :key="(button.handleCode || '') + '_' + index" v-bind="button" @click="clickHandle(button)">
                            <template v-if="button.customIcon">
                                <i v-if="typeof button.customIcon === 'string'" :class="[button.customIcon]"></i>
                                <el-icon v-else><component :is="button.customIcon" /></el-icon>
                            </template>
                            {{ button.contents }}
                        </el-button>
                    </template>
                </template>
            </div>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { type Ref, ref, markRaw, watch, computed } from "vue";
import { type DialogProps, type FormValidateCallback, ElDialog, ElButton, ElIcon } from "element-plus";
import { type NotReadonly } from "../../types";
import { type DialogFormButton, type DialogFormRef, type DialogFormButtonSlotScope, dialogFormProps, dialogFormEmits } from "./dialog-form";
import { type InputFormRef, type InputFormField, type InputFormSlotScope, InputForm } from "@yujinjin/cms-components-modules/input-form";

defineOptions({
    name: "DialogForm"
});

// 动态插槽：default 插槽用于弹窗顶部内容，其他插槽名称由 input-form 的 field.slot 动态决定
defineSlots<{
    default: () => any;
    [key: string]: (props: DialogFormButtonSlotScope | InputFormSlotScope) => any;
}>();

const props = defineProps(dialogFormProps);

const emits = defineEmits(dialogFormEmits);

// 弹窗显示状态
const dialogVisible: Ref<boolean> = ref(false);

const inputFormRef = ref<InputFormRef>();

// 弹窗内部属性
const dialogInnerProps: Ref<Partial<NotReadonly<DialogProps>>> = ref({});

// 实际数据列中的操作按钮列表
// handleCode: 用户操作CODE
// text: 按钮操作文案
// click: 按钮点击事件
const actionButtons = ref<DialogFormButton[]>([]);

const slots = computed<string[]>(() => {
    // 只把 input-form 字段声明过的 slot 透传下去，避免默认插槽和按钮插槽被误分发。
    return props.inputFormProps?.fields?.filter(field => !!field.slot).map(field => field.slot!) || [];
});

// 初始化操作按钮列表
const initActionButtons = function () {
    if (!props.buttons || props.buttons.length === 0) {
        return;
    }
    actionButtons.value = [];
    props.buttons.forEach(button => {
        // 按钮 loading/isShow 属于弹窗内部运行期状态，不要求调用方提前声明。
        button = Object.assign({ loading: false, isShow: true }, button);
        if (button.customIcon && typeof button.customIcon === "object") {
            // 图标组件无需响应式代理，markRaw 避免 Vue 对组件对象发出性能提示。
            button.customIcon = markRaw(button.customIcon);
        }
        if (button.icon && typeof button.icon === "object") {
            button.icon = markRaw(button.icon);
        }
        actionButtons.value.push(button);
    });
};

// 弹窗关闭
const dialogClosed = function () {
    emits("close");
};

const inputFormFieldValueChange = function (field: InputFormField, fieldValue: any, formFields: InputFormField[], inputValue: Record<string, any>) {
    emits("fieldValueChange", field, fieldValue, formFields, inputValue);
};

// 按钮点击操作
const clickHandle = async function (button: DialogFormButton) {
    if (button.loading) {
        return;
    }
    button.loading = true;
    let canClose: boolean | void = true;
    try {
        if (button.click) {
            // 约定 click 返回 false 时阻止自动关闭，便于表单验证失败或业务拦截。
            canClose = await button.click(inputFormRef.value?.getInputValue() ?? {}, inputFormRef.value?.getFormRef() ?? null, button);
        }
    } catch (error) {
        canClose = false;
        console.error(error);
    }
    button.loading = false;
    if (canClose !== false) {
        dialogVisible.value = false;
    }
};

watch(
    () => props.isShow,
    value => {
        if (value) {
            dialogVisible.value = true;
            // 每次打开时重新合并弹窗属性，确保调用方动态修改 dialogProps 后立即生效。
            dialogInnerProps.value = Object.assign(
                {
                    closeOnClickModal: false,
                    appendToBody: true,
                    destroyOnClose: true,
                    width: "750px",
                    alignCenter: true
                },
                props.dialogProps
            );
        }
    },
    {
        immediate: true
    }
);

watch(
    () => props.buttons,
    () => {
        initActionButtons();
    },
    { deep: true, immediate: true }
);

defineExpose<DialogFormRef>({
    // 获取表单的value
    getInputValue: function () {
        return inputFormRef.value?.getInputValue() ?? {};
    },

    /**
     * 设置表单的属性值
     * @param propertyName 属性名
     * @param value 属性值
     */
    setInputPropertyValue: function (propertyName: string, value: any) {
        inputFormRef.value?.setInputPropertyValue(propertyName, value);
    },

    // 修改当前form字段的属性
    changeFormFields: function (callback: (formFields: InputFormField[]) => void) {
        inputFormRef.value?.changeFormFields(callback);
    },
    // 修改当前生成的button按钮值
    changeButtons: function (callback: (actionButtons: DialogFormButton[]) => void) {
        if (callback && typeof callback === "function") {
            callback(actionButtons.value);
        } else {
            console.warn("callback 必须是一个函数");
        }
    },
    // 获取form Ref（组件未挂载时返回 null）
    getFormRef: function () {
        return inputFormRef.value?.getFormRef() ?? null;
    },
    // 表单验证（组件未挂载时会 reject）
    validate(callback?: FormValidateCallback) {
        if (!inputFormRef.value) {
            return Promise.reject(new Error("表单组件尚未挂载，无法执行验证"));
        }
        return inputFormRef.value.validate(callback);
    }
});
</script>

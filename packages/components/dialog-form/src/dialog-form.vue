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
import { type NotReadonly } from "/#/global";
import { type DialogFormButton, type DialogFormRef, type DialogFormButtonSlotScope, dialogFormProps, dialogFormEmits } from "./dialog-form";
import { type InputFormRef, type InputFormField, type InputFormSlotScope, InputForm } from "@yujinjin/cms-components-modules/input-form";

defineOptions({
    name: "DialogForm"
});

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
    return props.inputFormProps?.fields?.filter(field => !!field.slot).map(field => field.slot!) || [];
});

// 初始化操作按钮列表
const initActionButtons = function () {
    if (!props.buttons || props.buttons.length === 0) {
        return;
    }
    actionButtons.value = [];
    props.buttons.forEach(button => {
        button = Object.assign({ loading: false, isShow: true }, button);
        if (button.customIcon && typeof button.customIcon === "object") {
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
const clickHandle = async function (button) {
    if (button.loading) {
        return;
    }
    button.loading = true;
    let canClose = true;
    try {
        if (button.click) {
            canClose = await button.click(inputFormRef.value!.getInputValue(), inputFormRef.value!.getFormRef(), button);
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
        return inputFormRef.value?.getInputValue() || {};
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
            console.error("callback 必须是一个函数");
        }
    },
    // 获取form Ref
    getFormRef: function () {
        return inputFormRef.value!.getFormRef();
    },
    // 表单验证
    validate(callback?: FormValidateCallback) {
        return inputFormRef.value!.validate(callback);
    }
});
</script>

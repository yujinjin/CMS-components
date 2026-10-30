/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-08 15:00:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-15 11:38:36
 * @项目的路径: \CMS-components\packages\components\dialog-form\src\dialog-form.ts
 * @描述: dialog-form组件属性、事件声明
 */
import { type PropType, type ExtractPublicPropTypes, type Component } from "vue";
import { type FormValidateCallback, type FormValidationResult, type ButtonProps, type DialogProps, type FormInstance } from "element-plus";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type NotReadonly } from "../../types";
import { type InputFormProps, type InputFormField } from "@yujinjin/cms-components-modules/input-form";

// 弹窗表单按钮
export type DialogFormButton = NotReadonly<Partial<ButtonProps>> & {
    /** 当前按钮操作CODE */
    handleCode?: string;

    /** 按钮文案内容 */
    contents?: string;

    /** 自定义图标 */
    customIcon?: string | Component;

    /** 自定义插槽名称（如有值其他选项无效） */
    slot?: string;

    /** 是否显示（如果不想销毁当前组件数据可以使用此属性） */
    isShow?: boolean;

    /** 接收表单值、ElForm 实例和内部按钮；返回 false 或抛错阻止关闭，校验需由回调主动调用。 */
    click?: (inputFormValue: Record<string, any> | null, formRef: FormInstance | null, button: DialogFormButton) => Promise<void | boolean> | void | boolean;
};

export type DialogFormButtonSlotScope = {
    button: DialogFormButton;
};

export const dialogFormProps = buildProps({
    /** 控制弹窗是否挂载，并在变为 true 时打开内部弹窗；关闭后由 close 通知外部同步状态。 */
    isShow: {
        type: Boolean,
        default: true
    },
    /** ElDialog 配置，在 isShow 变为 true 时与内置默认值合并。 */
    dialogProps: {
        type: Object as PropType<Partial<NotReadonly<DialogProps>>>
    },
    /** 底部操作按钮；具名插槽接管的按钮需自行绑定点击行为。 */
    buttons: {
        type: Array as PropType<DialogFormButton[]>
    },
    /** InputForm 配置；字段插槽按原名称透传，字段变化事件由弹窗继续向外转发。 */
    inputFormProps: {
        type: Object as PropType<InputFormProps>
    }
});

export type DialogFormProps = NotReadonly<ExtractPublicPropTypes<typeof dialogFormProps>>;

export const dialogFormEmits = {
    // 表单数值的变化
    fieldValueChange: (field: InputFormField, fieldValue: any, formFields: InputFormField[], inputValue: Record<string, any>) => true,

    // ElDialog 的 closed 事件转发，在关闭动画完成后触发，外部可据此移除弹窗或清理数据。
    close: () => true
};

export type DialogFormEmits = typeof dialogFormEmits;

// 弹窗表单实例
export interface DialogFormRef {
    /** 获取表单的value */
    getInputValue: () => Record<string, any>;

    /**
     * 设置表单的属性值
     * @param propertyName 属性名
     * @param value 属性值
     */
    setInputPropertyValue: (propertyName: string, value: any) => void;

    /** 修改当前form字段的属性 */
    changeFormFields: (callback: (formFields: InputFormField[]) => void) => void;

    /** 修改当前生成的button按钮值 */
    changeButtons: (callback: (actionButtons: DialogFormButton[]) => void) => void;

    /** 获取form Ref（组件未挂载时返回 null） */
    getFormRef: () => FormInstance | null;

    /** 表单验证（组件未挂载时会 reject） */
    validate: (callback?: FormValidateCallback) => FormValidationResult;
}

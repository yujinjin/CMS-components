/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-08 15:00:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-10 11:15:34
 * @项目的路径: \CMS-components\packages\components\dialog-form\src\dialog-form.ts
 * @描述: dialog-form组件属性、事件声明
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { type FormValidateCallback, type FormValidationResult, type ButtonProps, type DialogProps, type FormInstance } from "element-plus";
import { type NotReadonly } from "/#/global";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type InputFormProps, type InputFormField } from "@yujinjin/cms-components-modules/input-form";

// 弹窗表单按钮
export type DialogFormButton = NotReadonly<Partial<ButtonProps>> & {
    /** 当前按钮操作CODE */
    handleCode?: string;

    /** 按钮文案内容 */
    contents?: string;

    /** 自定义插槽名称（如有值其他选项无效） */
    slot?: string;

    /** 按钮是否正在加载 */
    // isLoading?: boolean;

    /** 是否显示*/
    isShow?: boolean;

    /** 按钮点击函数事件（注入：返回false或者异常不会自动关闭弹窗） */
    click?: (inputFormValue: Record<string, any>, formRef: FormInstance | null, button: DialogFormButton) => Promise<void | boolean>;
};

export const dialogFormProps = buildProps({
    isShow: {
        type: Boolean,
        default: false
    },
    dialogProps: {
        type: Object as PropType<Partial<NotReadonly<DialogProps>>>
    },
    buttons: {
        type: Array as PropType<DialogFormButton[]>
    },
    inputFormProps: {
        type: Object as PropType<InputFormProps>
    }
});

export type DialogFormProps = NotReadonly<ExtractPublicPropTypes<typeof dialogFormProps>>;

export const dialogFormEmits = {
    // 表单数值的变化
    fieldValueChange: (field: InputFormField, fieldValue: any, formFields: InputFormField[], inputValue: Record<string, any>) => true,

    // 弹窗关闭事件
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

    /** 获取form Ref */
    getFormRef: () => FormInstance;

    /** 表单验证 */
    validate: (callback?: FormValidateCallback) => FormValidationResult;
}

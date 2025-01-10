/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-06 19:28:41
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-10 11:17:57
 * @项目的路径: \CMS-components\packages\components\search-form\src\search-form.ts
 * @描述: search-form组件属性、事件声明
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { type ButtonProps } from "element-plus";
import { type NotReadonly } from "/#/global";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type SearchFieldProps } from "@yujinjin/cms-components-modules/search-field";

// 搜索表单按钮
export type SearchFormButton = NotReadonly<Partial<ButtonProps>> & {
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

    /** 按钮点击函数事件 */
    click?: (button: SearchFormButton) => Promise<void>;
};

// 搜索表单字段
export type SearchFormField = SearchFieldProps & {
    /** 查询项的名称，同时也是组件的双向绑定值属性 */
    name: string;

    /** 当前内容是否去除空格，只针对input输入框有效。默认false */
    trim?: boolean;

    /**  选项的标签名称 */
    label?: string;

    /** 当前字段的值 */
    value?: any;

    /** 当前字段的默认值 */
    defaultValue?: any;

    /** label宽度 */
    labelWidth?: number;

    /** 表单组件的宽度 */
    inputWidth?: number;

    /** 是否显示 */
    isShow?: boolean;
};

export const searchFormProps = buildProps({
    // 查询表单字段列表 [{name: 查询项的名称，同时也是父级组件的字段属性, label: 选项的标签名称, value: 选项的值, type: 组件的类型, labelWidth: label宽度,  inputWidth: 表单宽度, data: 数据（比如：select的选项值列表）, props: 组件的自定义选项(可无), events: 组件自定义事件 slot: 自定义插槽名称（可无，如有值其他选项无效）}]
    fields: {
        type: Array as PropType<SearchFormField[]>,
        default() {
            return [];
        },
        required: true
    },
    // 是否正在搜索加载
    isSearchLoading: {
        type: Boolean,
        default: false
    },
    // 是否显示折叠
    isShowCollapse: {
        type: Boolean,
        default: true
    },
    // 是否显示搜索按钮
    isShowSearchButton: {
        type: Boolean,
        default: true
    },
    // 是否显示重置按钮
    isShowResetButton: {
        type: Boolean,
        default: true
    },
    // label宽度
    labelWidth: {
        type: Number,
        default: 107
    },
    // 表单宽度
    inputWidth: {
        type: Number,
        default: 185
    },
    // 标签的后缀
    labelSuffix: {
        type: String,
        default: "："
    },
    // 操作按钮
    buttons: {
        type: Array as PropType<SearchFormButton[]>,
        default() {
            return [];
        }
    }
});

export type SearchFormProps = NotReadonly<ExtractPublicPropTypes<typeof searchFormProps>>;

export const searchFormEmits = {
    // 当前表单字段变化事件
    fieldsChange: (formFields: SearchFormField[]) => Array.isArray(formFields),

    // 搜索操作
    search: (searchFormValue: Record<string, any>) => searchFormValue !== null && typeof searchFormValue === "object",

    // 表单字段值变化事件
    change: (formField: SearchFormField, formFields: SearchFormField[]) => formField !== null && typeof formField === "object" && Array.isArray(formFields),

    // 折叠状态变化事件
    collapseStatusChange: (status: boolean) => typeof status === "boolean"
};

export type SearchFormEmits = typeof searchFormEmits;

// 搜索表单实例
export interface SearchFormRef {
    // 修改当前form字段的属性
    changeFormFields: (callback: (formFields: SearchFormField[]) => void) => void;

    // 获取当前搜索表单的数据对象
    getValue: () => Record<string, any>;
}

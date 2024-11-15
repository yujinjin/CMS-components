/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-10-25 16:24:25
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-01 14:47:32
 * @项目的路径: \CMS-components\packages\components\check-select\src\check-select.ts
 * @描述: checkselect 组件
 */
import { type PropType, type ExtractPropTypes } from "vue";
import { buildProps } from "@yujinjin/cms-components-utils";

export const checkSelectProps = buildProps({
    data: {
        type: Array as PropType<Array<Record<string, any> | string | number>>,
        required: true
    },
    optionValueKey: {
        type: String,
        default: "value"
    },
    optionLabelKey: {
        type: String,
        default: "label"
    },
    props: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    events: {
        type: Object as PropType<Record<string, (...args: any[]) => any>>,
        default: () => ({})
    }
});

export type CheckSelectProps = ExtractPropTypes<typeof checkSelectProps>;

export const checkSelectEmits = {
    change: (value: Array<object | string | number>) => Array.isArray(value)
};

export type CheckSelectEmits = typeof checkSelectEmits;

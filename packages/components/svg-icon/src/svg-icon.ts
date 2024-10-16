/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-30 19:32:10
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-09-27 11:36:59
 * @项目的路径: \CMS-components\packages\components\svg-icon\src\svg-icon.ts
 * @描述: svg icon
 */
import type { ExtractPropTypes } from "vue";
import type SvgIcon from "./svg-icon.vue";

export const svgIconProps = {
    // svg的link名称
    value: {
        type: String,
        required: true,
        default: ""
    }
} as const;

export type SvgIconProps = ExtractPropTypes<typeof svgIconProps>;

// TODO: 该组件不要实例，这里只做个测试
export type SvgIconInstance = InstanceType<typeof SvgIcon>;

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-30 19:32:10
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-31 16:32:09
 * @项目的路径: \CMS-components\packages\components\svg-icon\src\svg-icon.ts
 * @描述: svg icon
 */

import { type ExtractPublicPropTypes, type PropType, type Component } from "vue";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type NotReadonly } from "../../types";

export const svgIconProps = buildProps({
    /** 字符串对应已注册 SVG sprite 的 symbol 后缀，实际引用 #icon-{value}；也支持 Vue 图标组件。 */
    value: {
        type: [String, Object] as PropType<string | Component>,
        default: ""
    },
    /** 图标容器的 CSS color；SVG 内容需使用 currentColor 才能继承该颜色。 */
    color: {
        type: String,
        default: ""
    },
    /** 图标字号；数字和纯数字字符串补 px，其他字符串按 CSS 单位原样使用。 */
    size: {
        type: [String, Number] as PropType<string | number>,
        default: ""
    }
});

export type SvgIconProps = NotReadonly<ExtractPublicPropTypes<typeof svgIconProps>>;

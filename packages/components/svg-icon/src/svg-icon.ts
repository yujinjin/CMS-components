/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-30 19:32:10
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-31 16:32:09
 * @项目的路径: \CMS-components\packages\components\svg-icon\src\svg-icon.ts
 * @描述: svg icon
 */

import { type ExtractPublicPropTypes } from "vue";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type NotReadonly } from "/#/global";

export const svgIconProps = buildProps({
    // svg的link名称
    value: {
        type: String,
        required: true,
        default: ""
    }
});

export type SvgIconProps = NotReadonly<ExtractPublicPropTypes<typeof svgIconProps>>;

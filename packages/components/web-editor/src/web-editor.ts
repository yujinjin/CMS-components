/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-20 14:31:27
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-12-20 15:18:24
 * @项目的路径: \CMS-components\packages\components\web-editor\src\web-editor.ts
 * @描述: web 富文本框编辑器属性、事件声明
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { buildProps, isString } from "@yujinjin/cms-components-utils";
import { type NotReadonly } from "../../types";

export type OnImgUploadFunction = (file: any) => Promise<string> | string;

export const webEditorProps = buildProps({
    modelValue: String,
    disabled: {
        type: Boolean,
        default: null
    },
    onImgUpload: {
        type: Function as PropType<OnImgUploadFunction>
    }
});

export type WebEditorProps = NotReadonly<ExtractPublicPropTypes<typeof webEditorProps>>;

export const webEditorEmits = {
    "update:modelValue": (value: string) => isString(value)
};

export type WebEditorEmits = typeof webEditorEmits;

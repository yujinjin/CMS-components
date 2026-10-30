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

/** 上传选中的图片并返回可插入编辑器的 URL，支持同步返回和 Promise。 */
export type OnImgUploadFunction = (file: any) => Promise<string> | string;

export const webEditorProps = buildProps({
    /** 编辑内容使用 HTML 字符串；外部更新经 clipboard.convert 转成 Quill 文档，回写使用语义化 HTML。 */
    modelValue: String,
    /** null 时继承 ElForm 禁用状态；true 强制只读，false 显式启用。 */
    disabled: {
        type: Boolean,
        default: null
    },
    /** 提供后接管工具栏图片按钮，通过隐藏文件框选择图片并在上传后插入光标位置。 */
    onImgUpload: {
        type: Function as PropType<OnImgUploadFunction>
    },
    /** Quill 工具栏配置，仅初始化时读取；未传使用默认工具栏，编辑器主题样式由外部样式入口提供。 */
    toolbar: {
        type: [String, Array, Object] as PropType<string | Record<string, any> | any[]>
    }
});

export type WebEditorProps = NotReadonly<ExtractPublicPropTypes<typeof webEditorProps>>;

export const webEditorEmits = {
    /** text-change 经 300ms 防抖后回传语义化 HTML，同时触发所属 FormItem 的 change 校验。 */
    "update:modelValue": (value: string) => isString(value)
};

export type WebEditorEmits = typeof webEditorEmits;

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-18 09:51:53
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-06 15:28:05
 * @项目的路径: \CMS-components\packages\components\img-upload\src\img-upload.ts
 * @描述: img-upload 组件
 */
import { type PropType, type ExtractPublicPropTypes } from "vue";
import { type UploadProps } from "element-plus";
import type Cropper from "cropperjs";
import { buildProps } from "@yujinjin/cms-components-utils";
import { type NotReadonly } from "../../types";

export const imgUploadProps = buildProps({
    /** ElUpload 配置，覆盖同名默认钩子而非追加；裁剪模式会强制关闭 autoUpload 和 multiple。 */
    uploadProps: {
        type: Object as PropType<Partial<UploadProps>>
    },
    /** true 启用默认裁剪，配置对象覆盖 Cropper 默认选项；裁剪流程一次处理一张图片。 */
    cropperProps: {
        type: [Boolean, Object] as PropType<boolean | Cropper.Options>,
        default: false
    },
    /** 文件体积上限，单位 KB；原图上传前和裁剪输出后分别检查，当前检查逻辑要求传入正值。 */
    maxSize: {
        type: Number,
        default: 2048
    },
    /** 多图片字符串的分隔符，默认 |；绑定数组时仍输出数组，limit=1 时回显字符串不拆分。 */
    separator: {
        type: String,
        default: "|"
    },
    /** 接收待上传 File，返回服务端图片 URL（或其 Promise）；裁剪模式接收生成的 JPEG 文件。 */
    uploadRequest: {
        type: Function as PropType<(file: File) => Promise<string> | string>,
        required: true
    }
});

export type ImgUploadProps = NotReadonly<ExtractPublicPropTypes<typeof imgUploadProps>>;

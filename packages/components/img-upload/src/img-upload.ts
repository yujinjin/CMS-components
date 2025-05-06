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
    // 上传属性配置选项，具体见（element-plus upload文档）
    uploadProps: {
        type: Object as PropType<Partial<UploadProps>>
    },
    // 图片裁剪的配置选项，具体见（cropperjs文档）, 如果需要裁剪一次只能上传一张图片
    cropperProps: {
        type: [Boolean, Object] as PropType<boolean | Cropper.Options>,
        default: false
    },
    // 上传图片的最大尺寸（单位KB）
    maxSize: {
        type: Number,
        default: 2048
    },
    // 分隔符，modelValue可能是多个图片的路径用"|"隔开的字符串
    separator: {
        type: String,
        default: "|"
    },
    // 上传图片的接口回调函数(必传)
    uploadRequest: {
        type: Function as PropType<(file: File) => Promise<string> | string>,
        required: true
    }
});

export type ImgUploadProps = NotReadonly<ExtractPublicPropTypes<typeof imgUploadProps>>;

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-18 09:51:37
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-18 11:04:48
 * @项目的路径: \CMS-components\packages\components\img-upload\index.ts
 * @描述: img-upload 组件
 */
import ImgUpload from "./src/img-upload.vue";
import type ImgUploadType from "./src/img-upload.vue";

// 上传控件按需入口，公开上传与裁剪配置类型；文件请求通过 uploadRequest 注入。
export * from "./src/img-upload";

export default ImgUpload;

export { ImgUpload };

export type ImgUploadInstance = InstanceType<typeof ImgUploadType>;

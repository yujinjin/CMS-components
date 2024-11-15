/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2023-03-20 14:04:22
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-10-25 17:17:05
 * @项目的路径: \CMS-components\docs\typings\docs.d.ts
 * @描述: 文档命名空间
 */
declare namespace Docs {
    /** 源码文件 */
    interface Source {
        /** 源码文件路径 */
        path: string;

        /** 源码内容 */
        source: string;

        /** 文件后缀名 */
        suffixName: string;

        /** 源码高亮HTML内容 */
        highlightSourceHtml: string;
    }
}

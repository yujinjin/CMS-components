/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-10-29 15:33:46
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-12-30 11:01:28
 * @项目的路径: \CMS-components\packages\utils\index.ts
 * @描述: 组件工具类
 */
import { type ComponentObjectPropsOptions } from "vue";

/**
 * 构建并冻结组件属性对象。
 * @param props (T): 组件的属性对象，类型为 ComponentObjectPropsOptions 的子类型
 * @returns  Readonly<T>: 返回一个冻结的、只读的属性对象
 * @example const myProps = buildProps({ name: 'John', age: 30 });
 * myProps.name = 'Jane'; // 尝试修改属性将导致错误
 */
export function buildProps<T extends ComponentObjectPropsOptions>(props: T) {
    return Object.freeze({ ...props }) as Readonly<T>;
}

/**
 * 转义字符串中的正则表达式特殊字符。
 * @param string (string): 需要转义的字符串，默认为空字符串
 * @returns string: 转义后的字符串
 * @example >>> escapeStringRegexp('hello+world')
 * 'hello\\+world'
 */
export function escapeStringRegexp(string = "") {
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

/**
 * 检查给定的值是否为字符串类型
 * @param value(any): 需要检查的值
 * @returns boolean: 如果值是字符串类型则返回true，否则返回false
 */
export function isString(value: any): value is string {
    return typeof value === "string";
}

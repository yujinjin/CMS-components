/** 浅层移除属性 readonly，允许内部配置在默认值合并和字段联动时被修改；不递归转换嵌套对象。 */
export type NotReadonly<T> = {
    -readonly [K in keyof T]: T[K];
};

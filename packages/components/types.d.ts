// 移除 readonly
export type NotReadonly<T> = {
    -readonly [K in keyof T]: T[K];
};

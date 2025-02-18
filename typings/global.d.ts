// 移除 readonly
export type NotReadonly<T> = {
    -readonly [K in keyof T]: T[K];
};

declare module "vue" {
    // GlobalComponents for Volar
    export interface GlobalComponents {
        SvgIcon: (typeof import("@yujinjin/cms-components"))["SvgIcon"];
        CheckSelect: (typeof import("@yujinjin/cms-components"))["CheckSelect"];
        ImgUpload: (typeof import("@yujinjin/cms-components"))["ImgUpload"];
        WebEditor: (typeof import("@yujinjin/cms-components"))["WebEditor"];
        InputField: (typeof import("@yujinjin/cms-components"))["InputField"];
        ActionBar: (typeof import("@yujinjin/cms-components"))["ActionBar"];
        SearchField: (typeof import("@yujinjin/cms-components"))["SearchField"];
        DataTable: (typeof import("@yujinjin/cms-components"))["DataTable"];
        InputForm: (typeof import("@yujinjin/cms-components"))["InputForm"];
        SearchForm: (typeof import("@yujinjin/cms-components"))["SearchForm"];
        DialogForm: (typeof import("@yujinjin/cms-components"))["DialogForm"];
        SearchPage: (typeof import("@yujinjin/cms-components"))["SearchPage"];
    }
}

export {};

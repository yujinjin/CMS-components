/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-18 11:12:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-12-19 16:31:00
 * @项目的路径: \CMS-components\packages\components\img-upload\__tests__\img-upload.test.tsx
 * @描述: img-upload组件测试用例
 */
import { ref, nextTick } from "vue";
import { mount, enableAutoUnmount, flushPromises } from "@vue/test-utils";
import { afterEach, describe, expect, test, vi } from "vitest";
import { formContextKey, formItemContextKey, ElForm, ElFormItem } from "element-plus";
import ImgUpload from "../src/img-upload.vue";

enableAutoUnmount(afterEach);

describe("图片上传组件", () => {
    window.URL.createObjectURL = vi.fn((file: Blob) => "");

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const createWrapper = (component: any) => {
        return mount(component, {
            global: {
                components: {
                    ElForm,
                    ElFormItem
                },
                provide: {
                    [formContextKey as symbol]: {
                        model: {},
                        rules: {},
                        fields: [],
                        addField: vi.fn(),
                        removeField: vi.fn(),
                        resetFields: vi.fn(),
                        clearValidate: vi.fn(),
                        validateField: vi.fn(),
                        validate: vi.fn(),
                        scrollToField: vi.fn()
                    },
                    [formItemContextKey as symbol]: {
                        prop: "",
                        size: "",
                        disabled: false,
                        validateState: "",
                        addValidateEvent: vi.fn(),
                        removeValidateEvent: vi.fn(),
                        validate: vi.fn(),
                        resetField: vi.fn(),
                        clearValidate: vi.fn()
                    }
                }
            }
        });
    };

    test("恰好达到体积上限允许上传，超出一个字节拒绝上传", async () => {
        const uploadRequest = vi.fn(async () => "/saved.png");
        const wrapper = createWrapper(() => <ImgUpload maxSize={1} uploadRequest={uploadRequest} />);
        const beforeUpload = wrapper.findComponent({ name: "ElUpload" }).props("beforeUpload")!;
        const file = new File([new Uint8Array(1024)], "boundary.png", { type: "image/png" });
        const oversized = new File([new Uint8Array(1025)], "oversized.png", { type: "image/png" });
        expect(await beforeUpload(file as any)).toBe(true);
        expect(await beforeUpload(oversized as any)).toBe(false);
        expect(uploadRequest).not.toHaveBeenCalled();
    });

    test("上传失败保留原有 URL 与文件列表", async () => {
        const uploadRequest = vi.fn().mockRejectedValue(new Error("上传失败"));
        const value = ref("/original.png");
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
        const upload = wrapper.findComponent({ name: "ElUpload" });
        const request = upload.props("httpRequest")!;
        await expect(request({ file: new File(["image"], "test.png") } as any)).rejects.toThrow("上传失败");
        await flushPromises();
        expect(value.value).toBe("/original.png");
        expect(upload.props("fileList")).toMatchObject([{ url: "/original.png" }]);
    });

    test("数组模型上传成功后仍输出数组", async () => {
        const value = ref<string[]>(["/original.png"]);
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} uploadRequest={async () => "/saved.png"} />);
        const request = wrapper.findComponent({ name: "ElUpload" }).props("httpRequest")!;
        await request({ file: new File(["image"], "test.png") } as any);
        expect(value.value).toEqual(["/saved.png", "/original.png"]);
    });

    test("正确渲染组件及样式类", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const wrapper = createWrapper(() => <ImgUpload uploadRequest={uploadRequest} />);
        expect(wrapper.classes()).toContain("img-upload");
        expect(wrapper.findComponent({ name: "ElUpload" }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(true);
    });

    test("正确回显默认选中值", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string | string[]>("/static/img/1.jpg");
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toMatchObject([{ name: "1.jpg", url: "/static/img/1.jpg" }]);
        value.value = "/static/img/1.jpg|/static/img/2.jpg";
        await nextTick();
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toMatchObject([
            { name: "1.jpg", url: "/static/img/1.jpg" },
            { name: "2.jpg", url: "/static/img/2.jpg" }
        ]);
        value.value = ["/static/img/1.jpg", "/static/img/2.jpg"];
        await nextTick();
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toMatchObject([
            { name: "1.jpg", url: "/static/img/1.jpg" },
            { name: "2.jpg", url: "/static/img/2.jpg" }
        ]);
    });

    test("按照配置的分隔符解析图片地址", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/3.jpg");
        const value = ref<string>("/static/img/1.jpg,/static/img/2.jpg");
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} separator="," uploadRequest={uploadRequest} />);
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toMatchObject([
            { name: "1.jpg", url: "/static/img/1.jpg" },
            { name: "2.jpg", url: "/static/img/2.jpg" }
        ]);
    });

    test("上传文件后更新图片地址", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>();
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
        const file = new File([""], "file.png", { type: "image/png" });
        Object.defineProperty(file, "size", { value: 1024 * 1024 * 1 });
        // 实现上传文件模拟
        vi.spyOn(wrapper.find("input[type='file']").element as HTMLInputElement, "files", "get").mockImplementation((): any => [file]);
        await wrapper.find("input[type='file']").trigger("change");
        expect(uploadRequest).toHaveBeenCalled();
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toMatchObject([{ name: "1.jpg", url: "/static/img/1.jpg" }]);
    });

    test("文件体积超出上限时阻止上传", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>();
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
        const file = new File([""], "file.png", { type: "image/png" });
        Object.defineProperty(file, "size", { value: 1024 * 1024 * 3 });
        // 实现上传文件模拟
        vi.spyOn(wrapper.find("input[type='file']").element as HTMLInputElement, "files", "get").mockImplementation((): any => [file]);
        await wrapper.find("input[type='file']").trigger("change");
        expect(uploadRequest).not.toHaveBeenCalled();
    });

    test("达到文件数量上限时阻止继续上传", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const onExceed = vi.fn();
        const value = ref<string[]>(["/static/img/1.jpg", "/static/img/2.jpg"]);
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} uploadProps={{ limit: 2, onExceed }} uploadRequest={uploadRequest} />);

        const file = new File([""], "file3.png", { type: "image/png" });
        Object.defineProperty(file, "size", { value: 1024 * 1024 * 1 });

        // 实现上传文件模拟
        vi.spyOn(wrapper.find("input[type='file']").element as HTMLInputElement, "files", "get").mockImplementation((): any => [file]);
        await wrapper.find("input[type='file']").trigger("change");

        // 验证超出限制后不会调用上传方法
        expect(uploadRequest).not.toHaveBeenCalled();
        expect(onExceed).toHaveBeenCalled();
    });

    test("启用裁剪时打开裁剪弹窗", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>();
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} cropperProps uploadRequest={uploadRequest} />);

        const file = new File(["Hello, world!"], "file.png", { type: "image/png" });
        Object.defineProperty(file, "size", { value: 1024 * 1024 * 1 });

        // 模拟文件读取器
        const mockFileReader = {
            readAsDataURL: vi.fn(),
            onload: null as any,
            result: "data:image/png;base64,test"
        };
        vi.spyOn(window, "FileReader").mockImplementation(() => mockFileReader as any);

        // 实现上传文件模拟
        vi.spyOn(wrapper.find("input[type='file']").element as HTMLInputElement, "files", "get").mockImplementation((): any => [file]);
        await wrapper.find("input[type='file']").trigger("change");

        // 触发 FileReader 的 onload 事件
        if (mockFileReader.onload) {
            mockFileReader.onload({ target: { result: mockFileReader } });
        }
        await nextTick();
        // 由于裁剪图片需要mock canvas一系列方法，这里就不一一mock了,省略其中的裁剪方案

        // 验证裁剪对话框是否显示
        const dialog = wrapper.findComponent({ name: "ElDialog" });
        expect(dialog.vm.modelValue).toBe(true);
    });

    test("数组模型正确回显图片列表", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string[]>(["/static/img/1.jpg", "/static/img/2.jpg"]);
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
        // 验证数组模式初始值正确渲染
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toMatchObject([
            { name: "1.jpg", url: "/static/img/1.jpg" },
            { name: "2.jpg", url: "/static/img/2.jpg" }
        ]);
    });

    test("按照自定义分隔符回显字符串模型", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>("/static/img/1.jpg;/static/img/2.jpg");
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} separator=";" uploadRequest={uploadRequest} />);
        // 验证自定义分隔符正确解析
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toMatchObject([
            { name: "1.jpg", url: "/static/img/1.jpg" },
            { name: "2.jpg", url: "/static/img/2.jpg" }
        ]);
    });

    test("移除文件后同步更新绑定值", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>("/static/img/1.jpg|/static/img/2.jpg");
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toHaveLength(2);
        // 模拟删除操作：触发 onRemove 回调
        const uploadVm = wrapper.findComponent({ name: "ElUpload" }).vm;
        const remainingFiles = [uploadVm.fileList[0]];
        await uploadVm.$emit("remove", uploadVm.fileList[1], remainingFiles);
        await nextTick();
        // 验证删除后 modelValue 已更新
        expect(value.value).toBe("/static/img/1.jpg");
    });

    test("支持通过对象配置裁剪选项", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>();
        const cropperOptions = { aspectRatio: 16 / 9, viewMode: 2 as const };
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} cropperProps={cropperOptions} uploadRequest={uploadRequest} />);
        // 验证裁剪配置传入后组件正常渲染
        expect(wrapper.findComponent({ name: "ElUpload" }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(true);
    });

    test("绑定值为空时展示空文件列表", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>("");
        const wrapper = createWrapper(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toHaveLength(0);
    });
});

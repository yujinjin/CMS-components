/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-18 11:12:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-12-19 16:31:00
 * @项目的路径: \CMS-components\packages\components\img-upload\__tests__\img-upload.test.tsx
 * @描述: img-upload组件测试用例
 */
import { ref, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, test, vi } from "vitest";
import ImgUpload from "../src/img-upload.vue";

describe("ImgUpload", () => {
    window.URL.createObjectURL = vi.fn((file: Blob) => "");

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("render test & class", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const wrapper = mount(() => <ImgUpload uploadRequest={uploadRequest} />);
        expect(wrapper.classes()).toContain("img-upload");
        expect(wrapper.findComponent({ name: "ElUpload" }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(true);
    });

    test("default value", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string | string[]>("/static/img/1.jpg");
        const wrapper = mount(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
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

    test("prop separator", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/3.jpg");
        const value = ref<string>("/static/img/1.jpg,/static/img/2.jpg");
        const wrapper = mount(() => <ImgUpload v-model={value.value} separator="," uploadRequest={uploadRequest} />);
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toMatchObject([
            { name: "1.jpg", url: "/static/img/1.jpg" },
            { name: "2.jpg", url: "/static/img/2.jpg" }
        ]);
    });

    test("upload file", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>();
        const wrapper = mount(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
        const file = new File([""], "file.png", { type: "image/png" });
        Object.defineProperty(file, "size", { value: 1024 * 1024 * 1 });
        // 实现上传文件模拟
        vi.spyOn(wrapper.find("input[type='file']").element as HTMLInputElement, "files", "get").mockImplementation((): any => [file]);
        await wrapper.find("input[type='file']").trigger("change");
        expect(uploadRequest).toHaveBeenCalled();
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toMatchObject([{ name: "1.jpg", url: "/static/img/1.jpg" }]);
    });

    test("prop maxSize", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>();
        const wrapper = mount(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
        const file = new File([""], "file.png", { type: "image/png" });
        Object.defineProperty(file, "size", { value: 1024 * 1024 * 3 });
        // 实现上传文件模拟
        vi.spyOn(wrapper.find("input[type='file']").element as HTMLInputElement, "files", "get").mockImplementation((): any => [file]);
        await wrapper.find("input[type='file']").trigger("change");
        expect(uploadRequest).not.toHaveBeenCalled();
    });

    test("upload file number limit", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const onExceed = vi.fn();
        const value = ref<string[]>(["/static/img/1.jpg", "/static/img/2.jpg"]);
        const wrapper = mount(() => <ImgUpload v-model={value.value} uploadProps={{ limit: 2, onExceed }} uploadRequest={uploadRequest} />);

        const file = new File([""], "file3.png", { type: "image/png" });
        Object.defineProperty(file, "size", { value: 1024 * 1024 * 1 });

        // 实现上传文件模拟
        vi.spyOn(wrapper.find("input[type='file']").element as HTMLInputElement, "files", "get").mockImplementation((): any => [file]);
        await wrapper.find("input[type='file']").trigger("change");

        // 验证超出限制后不会调用上传方法
        expect(uploadRequest).not.toHaveBeenCalled();
        expect(onExceed).toHaveBeenCalled();
    });

    test("prop cropper", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>();
        const wrapper = mount(() => <ImgUpload v-model={value.value} cropperProps uploadRequest={uploadRequest} />);

        const file = new File(["Hello, world!"], "file.png", { type: "image/png" });
        Object.defineProperty(file, "size", { value: 1024 * 1024 * 1 });

        // Mock FileReader
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

    test("modelValue as array with separator", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string[]>(["/static/img/1.jpg", "/static/img/2.jpg"]);
        const wrapper = mount(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
        // 验证数组模式初始值正确渲染
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toMatchObject([
            { name: "1.jpg", url: "/static/img/1.jpg" },
            { name: "2.jpg", url: "/static/img/2.jpg" }
        ]);
    });

    test("modelValue as string with custom separator", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>("/static/img/1.jpg;/static/img/2.jpg");
        const wrapper = mount(() => <ImgUpload v-model={value.value} separator=";" uploadRequest={uploadRequest} />);
        // 验证自定义分隔符正确解析
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toMatchObject([
            { name: "1.jpg", url: "/static/img/1.jpg" },
            { name: "2.jpg", url: "/static/img/2.jpg" }
        ]);
    });

    test("onRemove deletes file from list", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>("/static/img/1.jpg|/static/img/2.jpg");
        const wrapper = mount(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toHaveLength(2);
        // 模拟删除操作：触发 onRemove 回调
        const uploadVm = wrapper.findComponent({ name: "ElUpload" }).vm;
        const remainingFiles = [uploadVm.fileList[0]];
        await uploadVm.$emit("remove", uploadVm.fileList[1], remainingFiles);
        await nextTick();
        // 验证删除后 modelValue 已更新
        expect(value.value).toBe("/static/img/1.jpg");
    });

    test("cropperProps as object config", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>();
        const cropperOptions = { aspectRatio: 16 / 9, viewMode: 2 as const };
        const wrapper = mount(() => <ImgUpload v-model={value.value} cropperProps={cropperOptions} uploadRequest={uploadRequest} />);
        // 验证裁剪配置传入后组件正常渲染
        expect(wrapper.findComponent({ name: "ElUpload" }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(true);
    });

    test("empty modelValue renders empty file list", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>("");
        const wrapper = mount(() => <ImgUpload v-model={value.value} uploadRequest={uploadRequest} />);
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toHaveLength(0);
    });
});

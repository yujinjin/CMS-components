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
        const wrapper = mount(() => <ImgUpload upload-request={uploadRequest} />);
        expect(wrapper.classes()).toContain("img-upload");
        expect(wrapper.findComponent({ name: "ElUpload" }).exists()).toBe(true);
        expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(true);
    });

    test("default value", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string | string[]>("/static/img/1.jpg");
        const wrapper = mount(() => <ImgUpload v-model={value.value} upload-request={uploadRequest} />);
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
        const wrapper = mount(() => <ImgUpload v-model={value.value} separator="," upload-request={uploadRequest} />);
        expect(wrapper.findComponent({ name: "ElUpload" }).vm.fileList).toMatchObject([
            { name: "1.jpg", url: "/static/img/1.jpg" },
            { name: "2.jpg", url: "/static/img/2.jpg" }
        ]);
    });

    test("upload file", async () => {
        const uploadRequest = vi.fn(async () => "/static/img/1.jpg");
        const value = ref<string>();
        const wrapper = mount(() => <ImgUpload v-model={value.value} upload-request={uploadRequest} />);
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
        const wrapper = mount(() => <ImgUpload v-model={value.value} upload-request={uploadRequest} />);
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
        const wrapper = mount(() => <ImgUpload v-model={value.value} uploadProps={{ limit: 2, onExceed }} upload-request={uploadRequest} />);

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
        const wrapper = mount(() => <ImgUpload v-model={value.value} cropperProps upload-request={uploadRequest} />);

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
});

import { afterEach, describe, expect, test, vi } from "vitest";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { formContextKey, formItemContextKey } from "element-plus";
import Cropper from "cropperjs";
import ImgUpload from "../src/img-upload.vue";

// JSDOM 不提供真实画布和图片布局，只替换裁剪引擎；上传、弹窗按钮及组件状态仍运行真实实现。
vi.mock("cropperjs", () => ({
    default: vi.fn(() => ({ destroy: vi.fn(), replace: vi.fn(), reset: vi.fn(), rotate: vi.fn(), scaleX: vi.fn() }))
}));

enableAutoUnmount(afterEach);
afterEach(() => vi.restoreAllMocks());

const createWrapper = () =>
    mount(ImgUpload, {
        props: { cropperProps: true, uploadRequest: vi.fn().mockResolvedValue("/saved.jpg") },
        global: {
            provide: { [formContextKey as symbol]: {}, [formItemContextKey as symbol]: {} },
            stubs: {
                ElDialog: defineComponent({
                    setup(_, { slots }) {
                        return () => h("div", [slots.default?.(), slots.footer?.()]);
                    }
                })
            }
        }
    });

describe("图片上传裁剪生命周期", () => {
    test("取消后再次裁剪创建新实例，不复用已销毁对象", async () => {
        const wrapper = createWrapper();
        await (wrapper.vm as any).showCroppDialogHandle();
        const first = vi.mocked(Cropper).mock.results[0].value;
        await wrapper
            .findAll("button")
            .find(button => button.text() === "取消")!
            .trigger("click");
        expect(first.destroy).toHaveBeenCalledTimes(1);
        await (wrapper.vm as any).showCroppDialogHandle();
        expect(Cropper).toHaveBeenCalledTimes(2);
        expect(first.replace).not.toHaveBeenCalled();
    });

    test("图片读取完成前卸载不会重新打开裁剪弹窗", async () => {
        const reader = { readAsDataURL: vi.fn(), onload: null as ((event: any) => void) | null };
        vi.spyOn(window, "FileReader").mockImplementation(() => reader as any);
        const wrapper = createWrapper();
        const file = new File(["image"], "image.png", { type: "image/png" });
        await (wrapper.vm as any).startCroppHandle(file);
        wrapper.unmount();
        reader.onload!({ target: { result: "data:image/png;base64,test" } });
        await nextTick();
        expect((wrapper.vm as any).isShowCropperDialog).toBe(false);
        expect(Cropper).not.toHaveBeenCalled();
    });

    test("卸载时销毁仍然存活的裁剪实例", async () => {
        const wrapper = createWrapper();
        await (wrapper.vm as any).showCroppDialogHandle();
        const instance = vi.mocked(Cropper).mock.results[0].value;
        wrapper.unmount();
        expect(instance.destroy).toHaveBeenCalledTimes(1);
    });

    test("取消后卸载不会重复销毁实例", async () => {
        const wrapper = createWrapper();
        await (wrapper.vm as any).showCroppDialogHandle();
        const instance = vi.mocked(Cropper).mock.results[0].value;
        await wrapper
            .findAll("button")
            .find(button => button.text() === "取消")!
            .trigger("click");
        wrapper.unmount();
        expect(instance.destroy).toHaveBeenCalledTimes(1);
    });

    test("裁剪模式强制关闭批量选择与原图自动上传", async () => {
        const wrapper = createWrapper();
        await wrapper.setProps({ uploadProps: { multiple: true, autoUpload: true } });
        const upload = wrapper.findComponent({ name: "ElUpload" });
        expect(upload.props("multiple")).toBe(false);
        expect(upload.props("autoUpload")).toBe(false);
        await flushPromises();
        expect(wrapper.props("uploadRequest")).not.toHaveBeenCalled();
    });
});

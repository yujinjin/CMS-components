/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-20 16:10:16
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-12 17:37:03
 * @项目的路径: \CMS-components\packages\components\web-editor\__tests__\web-editor.test.ts
 * @描述: web-editor组件单元测试用例
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { mount, type VueWrapper, enableAutoUnmount } from "@vue/test-utils";
import Quill from "quill";
import WebEditor from "../src/web-editor.vue";

// 模拟富文本编辑器引擎 模块
vi.mock("quill", () => {
    return {
        default: vi.fn(() => ({
            on: vi.fn(),
            off: vi.fn(),
            getSemanticHTML: vi.fn(() => "<p>test content</p>"),
            setContents: vi.fn(),
            clipboard: {
                convert: vi.fn()
            },
            enable: vi.fn(),
            getSelection: vi.fn(() => ({ index: 0, length: 0 })),
            focus: vi.fn(),
            insertEmbed: vi.fn()
        }))
    };
});

// 获取 Quill 模拟实例的方法
const getQuillInstance = () => (Quill as any).mock.results.at(-1).value;

enableAutoUnmount(afterEach);

describe("富文本编辑器组件", () => {
    let wrapper: VueWrapper;

    const createWrapper = (props = {}) => {
        return mount(WebEditor, {
            props: {
                modelValue: "",
                disabled: false,
                ...props
            }
        });
    };

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
        if (wrapper) {
            wrapper.unmount();
        }
    });

    it("正确渲染编辑器与图片选择入口", () => {
        wrapper = createWrapper();
        expect(wrapper.find(".cms-web-editor-container").exists()).toBe(true);
        expect(wrapper.find(".web-editor").exists()).toBe(true);
        expect(wrapper.find('input[type="file"]').exists()).toBe(true);
    });

    it("挂载时初始化富文本编辑器", () => {
        wrapper = createWrapper();
        expect(Quill).toHaveBeenCalled();
    });

    it("外部绑定值变化时更新编辑内容", async () => {
        wrapper = createWrapper();
        await wrapper.setProps({
            modelValue: "<p>new content</p>"
        });

        expect(getQuillInstance().setContents).toHaveBeenCalled();
    });

    it("编辑内容变化后回传双向绑定值", async () => {
        vi.useFakeTimers();
        wrapper = createWrapper();
        // 触发 Quill 的 text-change 事件回调
        const quillInstance = getQuillInstance();
        const textChangeCallback = quillInstance.on.mock.calls.find((call: any[]) => call[0] === "text-change")?.[1];
        textChangeCallback();

        // 推进虚拟时间，等待防抖回调执行
        await vi.advanceTimersByTimeAsync(300);

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect((wrapper.emitted("update:modelValue") as any[])[0]).toEqual(["<p>test content</p>"]);
    });

    it("上传图片后插入编辑器", async () => {
        const file = new File([""], "test.png", { type: "image/png" });

        // 模拟图片上传回调返回图片地址
        const onImgUpload = vi.fn().mockResolvedValue("http://example.com/test.png");
        wrapper = createWrapper({ onImgUpload });
        await wrapper.setProps({ onImgUpload });

        const inputEl = wrapper.find('input[type="file"]');
        vi.spyOn(inputEl.element as HTMLInputElement, "files", "get").mockImplementation((): any => [file]);
        await inputEl.trigger("change");

        expect(onImgUpload).toHaveBeenCalled();
        expect(getQuillInstance().insertEmbed).toHaveBeenCalled();
    });

    it("禁用状态变化时切换编辑器可编辑状态", async () => {
        wrapper = createWrapper();
        await wrapper.setProps({
            disabled: true
        });

        expect(getQuillInstance().enable).toHaveBeenCalledWith(false);
    });

    it("未提供图片上传回调时不插入图片", async () => {
        wrapper = createWrapper();
        const file = new File([""], "test.png", { type: "image/png" });
        const inputEl = wrapper.find('input[type="file"]');
        vi.spyOn(inputEl.element as HTMLInputElement, "files", "get").mockImplementation((): any => [file]);
        await inputEl.trigger("change");
        // 不应抛出错误，且 insertEmbed 不应被调用
        expect(getQuillInstance().insertEmbed).not.toHaveBeenCalled();
    });

    it("卸载时清理编辑器事件监听", () => {
        wrapper = createWrapper();
        const quillInstance = getQuillInstance();
        wrapper.unmount();
        // 验证 off 方法被调用以清除事件监听
        expect(quillInstance.off).toHaveBeenCalledWith("text-change");
    });

    it("未选择文件时不执行图片上传", async () => {
        const onImgUpload = vi.fn().mockResolvedValue("http://example.com/test.png");
        wrapper = createWrapper({ onImgUpload });
        const inputEl = wrapper.find('input[type="file"]');
        vi.spyOn(inputEl.element as HTMLInputElement, "files", "get").mockImplementation((): any => null);
        await inputEl.trigger("change");
        expect(onImgUpload).not.toHaveBeenCalled();
    });

    it("初始化时应用自定义工具栏配置", async () => {
        const customToolbar = ["bold", "italic"];
        wrapper = createWrapper({ toolbar: customToolbar });
        // 验证 Quill 初始化时传入了自定义 toolbar
        const quillCallArgs = (Quill as any).mock.calls.at(-1);
        const modulesConfig = quillCallArgs[1]?.modules;
        expect(modulesConfig?.toolbar?.container).toEqual(customToolbar);
    });

    it("未配置工具栏时使用默认工具栏", () => {
        wrapper = createWrapper();
        const quillCallArgs = (Quill as any).mock.calls.at(-1);
        const modulesConfig = quillCallArgs[1]?.modules;
        // 验证使用了默认 toolbar（包含 bold, italic 等）
        expect(modulesConfig?.toolbar?.container).toBeDefined();
        expect(Array.isArray(modulesConfig?.toolbar?.container)).toBe(true);
    });
});

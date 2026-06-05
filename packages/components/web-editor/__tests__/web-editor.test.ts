/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-20 16:10:16
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-12 17:37:03
 * @项目的路径: \CMS-components\packages\components\web-editor\__tests__\web-editor.test.ts
 * @描述: web-editor组件单元测试用例
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount, type VueWrapper } from "@vue/test-utils";
import Quill from "quill";
import WebEditor from "../src/web-editor.vue";

// 获取 Quill mock 实例的方法
const getQuillInstance = () => (Quill as any).mock.results[0].value;

describe("WebEditor", () => {
    let wrapper: VueWrapper;

    beforeEach(async () => {
        // Mock Quill
        vi.mock("quill", () => {
            return {
                default: vi.fn(() => ({
                    on: vi.fn(),
                    getSemanticHTML: vi.fn(() => "<p>test content</p>"),
                    setContents: vi.fn(),
                    clipboard: {
                        convert: vi.fn()
                    },
                    enable: vi.fn(),
                    getSelection: vi.fn(() => ({ range: 0 })),
                    focus: vi.fn(),
                    insertEmbed: vi.fn()
                }))
            };
        });

        wrapper = mount(WebEditor, {
            props: {
                modelValue: "",
                disabled: false,
                onImgUpload: vi.fn()
            }
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        wrapper.unmount();
    });

    it("renders properly", () => {
        expect(wrapper.find(".cms-web-editor-container").exists()).toBe(true);
        expect(wrapper.find(".web-editor").exists()).toBe(true);
        expect(wrapper.find('input[type="file"]').exists()).toBe(true);
    });

    it("initializes Quill editor on mount", async () => {
        expect(Quill).toHaveBeenCalled();
    });

    it("updates content when modelValue prop changes", async () => {
        await wrapper.setProps({
            modelValue: "<p>new content</p>"
        });

        expect(getQuillInstance().setContents).toHaveBeenCalled();
    });

    it("emits update:modelValue when content changes", async () => {
        // 触发 Quill 的 text-change 事件回调
        const quillInstance = getQuillInstance();
        const textChangeCallback = quillInstance.on.mock.calls.find((call: any[]) => call[0] === "text-change")?.[1];
        textChangeCallback();

        // Wait for debounce
        await new Promise(resolve => setTimeout(resolve, 300));

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect((wrapper.emitted("update:modelValue") as any[])[0]).toEqual(["<p>test content</p>"]);
    });

    it("handles image upload", async () => {
        const file = new File([""], "test.png", { type: "image/png" });
        const input = wrapper.find('input[type="file"]');

        // Mock onImgUpload to return a URL
        const onImgUpload = vi.fn().mockResolvedValue("http://example.com/test.png");
        await wrapper.setProps({ onImgUpload });

        vi.spyOn(input.element as HTMLInputElement, "files", "get").mockImplementation((): any => [file]);
        await input.trigger("change");

        expect(onImgUpload).toHaveBeenCalled();
        expect(getQuillInstance().insertEmbed).toHaveBeenCalled();
    });

    it("respects disabled state", async () => {
        await wrapper.setProps({
            disabled: true
        });

        expect(getQuillInstance().enable).toHaveBeenCalledWith(false);
    });
});

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-20 16:10:16
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-12-23 16:41:25
 * @项目的路径: \CMS-components\packages\components\web-editor\__tests__\web-editor.test.ts
 * @描述: web-editor组件单元测试用例
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Quill from "quill";
import WebEditor from "../src/web-editor.vue";

describe("WebEditor", () => {
    let wrapper;

    beforeEach(() => {
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
        expect(wrapper.find(".web-editor-container").exists()).toBe(true);
        expect(wrapper.find(".web-editor").exists()).toBe(true);
        expect(wrapper.find('input[type="file"]').exists()).toBe(true);
    });

    it("initializes Quill editor on mount", () => {
        expect(Quill).toHaveBeenCalled();
    });

    it("updates content when modelValue prop changes", async () => {
        await wrapper.setProps({
            modelValue: "<p>new content</p>"
        });

        expect(wrapper.vm.quillInstance.setContents).toHaveBeenCalled();
    });

    it("emits update:modelValue when content changes", async () => {
        // Trigger text change
        wrapper.vm.textChangeHandle();

        // Wait for debounce
        await new Promise(resolve => setTimeout(resolve, 300));

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect(wrapper.emitted("update:modelValue")[0]).toEqual(["<p>test content</p>"]);
    });

    it("handles image upload", async () => {
        const file = new File([""], "test.png", { type: "image/png" });
        const input = wrapper.find('input[type="file"]');

        // Mock onImgUpload to return a URL
        await wrapper.setProps({
            onImgUpload: vi.fn().mockResolvedValue("http://example.com/test.png")
        });

        vi.spyOn(input.element as HTMLInputElement, "files", "get").mockImplementation((): any => [file]);
        await input.trigger("change");

        expect(wrapper.props("onImgUpload")).toHaveBeenCalled();
        expect(wrapper.vm.quillInstance.insertEmbed).toHaveBeenCalled();
    });

    it("respects disabled state", async () => {
        await wrapper.setProps({
            disabled: true
        });

        expect(wrapper.vm.quillInstance.enable).toHaveBeenCalledWith(false);
    });
});

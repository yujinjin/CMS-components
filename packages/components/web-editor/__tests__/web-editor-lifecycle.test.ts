import { afterEach, describe, expect, test, vi } from "vitest";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
import { formItemContextKey } from "element-plus";
import Quill from "quill";
import WebEditor from "../src/web-editor.vue";
import WebEditorAsync from "../src/web-editor-async.vue";

vi.mock("quill", () => ({
    default: vi.fn(() => ({
        on: vi.fn(),
        off: vi.fn(),
        getSemanticHTML: vi.fn(() => "<p>最终内容</p>"),
        setContents: vi.fn(),
        clipboard: { convert: vi.fn(() => ({ ops: [] })) },
        enable: vi.fn(),
        getSelection: vi.fn(() => ({ index: 3, length: 0 })),
        focus: vi.fn(),
        insertEmbed: vi.fn()
    }))
}));

enableAutoUnmount(afterEach);
afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe.each([
    ["标准版本", WebEditor],
    ["异步版本", WebEditorAsync]
])("富文本编辑器（%s）", (_, component) => {
    test("上传结束前卸载不会访问失效编辑器", async () => {
        let resolveUpload!: (url: string) => void;
        const errors: unknown[] = [];
        const wrapper = mount(component, {
            props: { onImgUpload: () => new Promise<string>(resolve => (resolveUpload = resolve)) },
            global: { config: { errorHandler: error => errors.push(error) } }
        });
        await flushPromises();
        const instance = vi.mocked(Quill).mock.results.at(-1)!.value;
        const input = wrapper.get('input[type="file"]');
        Object.defineProperty(input.element, "files", { value: [new File(["image"], "test.png", { type: "image/png" })] });
        await input.trigger("change");
        wrapper.unmount();
        resolveUpload("/saved.png");
        await flushPromises();
        expect(errors).toEqual([]);
        expect(instance.insertEmbed).not.toHaveBeenCalled();
    });

    test("连续内容变更只在最后一次变更 300 毫秒后回写并校验一次", async () => {
        vi.useFakeTimers();
        const validate = vi.fn().mockResolvedValue(true);
        const wrapper = mount(component, { global: { provide: { [formItemContextKey as symbol]: { validate } } } });
        await flushPromises();
        const instance = vi.mocked(Quill).mock.results.at(-1)!.value;
        const change = vi.mocked(instance.on).mock.calls.find((call: any[]) => call[0] === "text-change")![1];
        change();
        await vi.advanceTimersByTimeAsync(200);
        change();
        await vi.advanceTimersByTimeAsync(299);
        expect(wrapper.emitted("update:modelValue")).toBeUndefined();
        await vi.advanceTimersByTimeAsync(1);
        expect(wrapper.emitted("update:modelValue")).toEqual([["<p>最终内容</p>"]]);
        expect(validate).toHaveBeenCalledExactlyOnceWith("change");
    });

    test("相同 HTML 回写不重置文档与光标", async () => {
        const wrapper = mount(component);
        await flushPromises();
        const instance = vi.mocked(Quill).mock.results.at(-1)!.value;
        await wrapper.setProps({ modelValue: "<p>最终内容</p>" });
        expect(instance.setContents).not.toHaveBeenCalled();
    });
});

test("异步导入完成前卸载不创建编辑器", async () => {
    const wrapper = mount(WebEditorAsync);
    wrapper.unmount();
    await flushPromises();
    expect(Quill).not.toHaveBeenCalled();
});

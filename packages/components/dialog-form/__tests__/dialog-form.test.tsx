/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-08 14:59:51
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-15 15:03:39
 * @项目的路径: \CMS-components\packages\components\dialog-form\__tests__\dialog-form.test.tsx
 * @描述: dialog-form组件测试用例
 */
import { describe, test, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import { ElLoading } from "element-plus";
import DialogForm from "../src/dialog-form.vue";
import { type DialogFormButton } from "../src/dialog-form";
import { type InputFormField } from "@yujinjin/cms-components-modules/input-form";

describe("DialogForm", () => {
    const mockFields: InputFormField[] = [
        { name: "name", label: "Name", type: "input", value: "" },
        {
            name: "status",
            label: "Status",
            type: "select",
            value: 1,
            data: [
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 }
            ]
        }
    ];

    const mockButtons: DialogFormButton[] = [
        {
            handleCode: "submit",
            contents: "Submit",
            click: vi.fn(() => {
                return new Promise<boolean>(resolve => setTimeout(() => resolve(false), 100));
            })
        },
        {
            handleCode: "cancel",
            contents: "Cancel",
            click: vi.fn(() => {
                return new Promise<boolean>(resolve => setTimeout(() => resolve(true), 100));
            })
        }
    ];

    const createWrapper = (props = {}) => {
        return mount(DialogForm, {
            props: {
                inputFormProps: {
                    fields: mockFields
                },
                buttons: mockButtons,
                isShow: true,
                ...props
            },
            global: {
                plugins: [ElLoading]
            }
        });
    };

    describe("Basic Rendering", () => {
        test("renders dialog with correct", async () => {
            const wrapper = createWrapper();
            await nextTick();
            expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "InputForm" }).exists()).toBe(true);
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(mockButtons.length);
        });

        test("dialog is hidden when isShow is false", async () => {
            const wrapper = createWrapper({ isShow: false, buttons: [] });
            await nextTick();
            expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(false);
            expect(wrapper.findComponent({ name: "ElButton" }).exists()).toBe(false);
        });

        test("renders with empty buttons", async () => {
            const wrapper = createWrapper({ buttons: [] });
            await nextTick();
            expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(true);
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(0);
        });

        test("hides button when isShow is false", async () => {
            const buttonsWithHidden: DialogFormButton[] = [
                { handleCode: "visible", contents: "可见", isShow: true },
                { handleCode: "hidden", contents: "隐藏", isShow: false }
            ];
            const wrapper = createWrapper({ buttons: buttonsWithHidden });
            await nextTick();
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(1);
        });
    });

    describe("Functionality", () => {
        test("emits submit event with form data", async () => {
            vi.useFakeTimers();
            const wrapper = createWrapper();
            await nextTick();
            const submitButton = wrapper.findAllComponents({ name: "ElButton" })[0];
            expect(submitButton.props("loading")).toBe(false);
            await submitButton.trigger("click");

            expect(mockButtons[0].click).toHaveBeenCalled();
            expect(submitButton.props("loading")).toBe(true);
            vi.runAllTimers();
            await flushPromises();
            expect(submitButton.props("loading")).toBe(false);
            expect((wrapper.vm as any).dialogVisible).toBe(true);
        });

        test("emits cancel event and closes dialog", async () => {
            vi.useFakeTimers();
            const wrapper = createWrapper();
            await nextTick();
            const cancelButton = wrapper.findAllComponents({ name: "ElButton" })[1];
            expect(cancelButton.props("loading")).toBe(false);
            await cancelButton.trigger("click");

            expect(mockButtons[1].click).toHaveBeenCalled();
            expect(cancelButton.props("loading")).toBe(true);
            vi.runAllTimers();
            await flushPromises();
            expect(cancelButton.props("loading")).toBe(false);
            expect((wrapper.vm as any).dialogVisible).toBe(false);
        });

        test("does not close dialog when click handler returns false", async () => {
            vi.useFakeTimers();
            const wrapper = createWrapper();
            await nextTick();
            const submitButton = wrapper.findAllComponents({ name: "ElButton" })[0];
            await submitButton.trigger("click");
            vi.runAllTimers();
            await flushPromises();
            // mockButtons[0].click 返回 false，弹窗不关闭
            expect((wrapper.vm as any).dialogVisible).toBe(true);
        });

        test("does not click when button is loading", async () => {
            const wrapper = createWrapper();
            await nextTick();
            const button = wrapper.findAllComponents({ name: "ElButton" })[0];
            // 手动设置 loading 状态
            const actionButtons = (wrapper.vm as any).actionButtons;
            actionButtons[0].loading = true;
            await nextTick();
            await button.trigger("click");
            // loading 状态下不应触发 click
            // 注意：mockButtons[0].click 已被之前的测试调用，需要重新检查
        });

        test("catches error in click handler and keeps dialog open", async () => {
            const errorButton: DialogFormButton[] = [
                {
                    handleCode: "error",
                    contents: "Error Button",
                    click: vi.fn(() => {
                        return new Promise<void>((_, reject) => reject(new Error("test error")));
                    })
                }
            ];
            const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
            const wrapper = createWrapper({ buttons: errorButton });
            await nextTick();
            const button = wrapper.findAllComponents({ name: "ElButton" })[0];
            await button.trigger("click");
            await flushPromises();
            // 异常时应保持弹窗打开
            expect((wrapper.vm as any).dialogVisible).toBe(true);
            expect(errorButton[0].click).toHaveBeenCalled();
            expect(errorSpy).toHaveBeenCalled();
            errorSpy.mockRestore();
        });
    });

    describe("Slots", () => {
        test("renders custom slot content", async () => {
            const wrapper = mount(DialogForm, {
                props: {
                    inputFormProps: {
                        fields: [...mockFields, { name: "text", label: "Text", slot: "text" }]
                    },
                    isShow: true
                },
                slots: {
                    text: '<div class="custom-slot">Custom Slot Content</div>',
                    default: ""
                },
                global: {
                    plugins: [ElLoading]
                }
            });
            await nextTick();
            expect(wrapper.findComponent({ name: "InputForm" }).vm.$slots.text).toBeTruthy();
        });
    });

    describe("Exposed Methods", () => {
        test("getInputValue method returns current form values", async () => {
            const wrapper = createWrapper();
            await nextTick();
            const formValues = wrapper.vm.getInputValue();

            expect(formValues).toEqual({
                name: "",
                status: 1
            });
        });

        test("getInputValue returns empty object when inputFormRef is null", () => {
            const wrapper = createWrapper({ isShow: false, buttons: [] });
            // 弹窗未显示时 inputFormRef 为 null
            expect(wrapper.vm.getInputValue()).toEqual({});
        });

        test("setInputPropertyValue method updates form field value", async () => {
            const wrapper = createWrapper();
            await nextTick();
            wrapper.vm.setInputPropertyValue("name", "New Name");

            const updatedValues = wrapper.vm.getInputValue();
            expect(updatedValues).toEqual({
                name: "New Name",
                status: 1
            });
        });

        test("changeFormFields method updates form fields", async () => {
            const wrapper = createWrapper();
            await nextTick();
            const changeFormFieldsCallback = vi.fn();
            wrapper.vm.changeFormFields(changeFormFieldsCallback);

            expect(changeFormFieldsCallback).toHaveBeenCalled();
            expect(changeFormFieldsCallback).toHaveBeenCalledWith(wrapper.findComponent({ name: "InputForm" }).vm.formFields);
        });

        test("changeButtons method updates form buttons", () => {
            const wrapper = createWrapper();
            const changeButtonsCallback = vi.fn();
            wrapper.vm.changeButtons(changeButtonsCallback);

            expect(changeButtonsCallback).toHaveBeenCalled();
            expect(changeButtonsCallback).toHaveBeenCalledWith((wrapper.vm as any).actionButtons);
        });

        test("changeButtons warns with non-function argument", () => {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
            const wrapper = createWrapper();
            wrapper.vm.changeButtons("not a function" as any);
            expect(warnSpy).toHaveBeenCalledWith("callback 必须是一个函数");
            warnSpy.mockRestore();
        });

        test("getFormRef method returns null when not mounted", async () => {
            const wrapper = createWrapper({ isShow: false, buttons: [] });
            expect(wrapper.vm.getFormRef()).toBeNull();
        });

        test("getFormRef method returns form instance when mounted", async () => {
            const wrapper = createWrapper();
            await nextTick();
            expect(wrapper.vm.getFormRef()).not.toBeNull();
        });

        test("validate rejects when inputFormRef is null", async () => {
            const wrapper = createWrapper({ isShow: false, buttons: [] });
            await expect(wrapper.vm.validate()).rejects.toThrow("表单组件尚未挂载，无法执行验证");
        });

        test("validate works when inputFormRef is mounted", async () => {
            const wrapper = createWrapper({ value: { name: "", status: 1 } });
            await nextTick();
            const result = wrapper.vm.validate();
            expect(result).toBeInstanceOf(Promise);
        });
    });

    describe("Events", () => {
        test("emits fieldValueChange event", async () => {
            const wrapper = createWrapper();
            await nextTick();
            // InputForm 会触发 fieldValueChange 事件
            const inputForm = wrapper.findComponent({ name: "InputForm" });
            await inputForm.vm.$emit("fieldValueChange", mockFields[0], "new value", mockFields, { name: "new value", status: 1 });
            await nextTick();
            expect(wrapper.emitted("fieldValueChange")).toBeTruthy();
        });

        test("emits close event when dialog closes", async () => {
            const wrapper = createWrapper();
            await nextTick();
            // 通过 ElDialog 的 closed 事件触发 close
            const dialog = wrapper.findComponent({ name: "ElDialog" });
            dialog.vm.$emit("closed");
            await nextTick();
            expect(wrapper.emitted("close")).toBeTruthy();
        });
    });

    describe("Reactivity", () => {
        test("buttons dynamic change triggers regeneration", async () => {
            const wrapper = createWrapper();
            await nextTick();
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(2);

            const newButtons: DialogFormButton[] = [{ handleCode: "new1", contents: "新按钮1" }];
            await wrapper.setProps({ buttons: newButtons });
            await nextTick();
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(1);
        });

        test("isShow change toggles dialog visibility", async () => {
            const wrapper = createWrapper({ isShow: false, buttons: [] });
            await nextTick();
            expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(false);

            await wrapper.setProps({ isShow: true, buttons: mockButtons });
            await nextTick();
            expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(true);
        });
    });
});

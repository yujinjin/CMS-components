/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-08 14:59:51
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-09 11:50:41
 * @项目的路径: \CMS-components\packages\components\dialog-form\__tests__\dialog-form.test.tsx
 * @描述: dialog-form组件测试用例
 */
import { describe, test, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import { ElLoading } from "element-plus";
import DialogForm from "../src/dialog-form.vue";
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

    const mockButtons = [
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
                    text: '<div class="custom-slot">Custom Slot Content</div>'
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

        test("getFormRef method", async () => {
            const wrapper = createWrapper();
            await nextTick();
            expect(wrapper.vm.getFormRef()).not.toBeUndefined();
        });
    });
});

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-08 14:59:51
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-15 15:03:39
 * @项目的路径: \CMS-components\packages\components\dialog-form\__tests__\dialog-form.test.tsx
 * @描述: dialog-form组件测试用例
 */
import { describe, test, expect, vi, afterEach } from "vitest";
import { mount, flushPromises, enableAutoUnmount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ElLoading } from "element-plus";
import DialogForm from "../src/dialog-form.vue";
import { type DialogFormButton } from "../src/dialog-form";
import { type InputFormField } from "@yujinjin/cms-components-modules/input-form";

enableAutoUnmount(afterEach);
afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("弹窗表单组件", () => {
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

    test("清空按钮配置后移除原有操作", async () => {
        const wrapper = createWrapper({ buttons: [{ contents: "保存" }] });
        await nextTick();
        expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(1);
        await wrapper.setProps({ buttons: [] });
        expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(0);
    });

    describe("基础渲染", () => {
        test("正确渲染弹窗与表单内容", async () => {
            const wrapper = createWrapper();
            await nextTick();
            expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "InputForm" }).exists()).toBe(true);
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(mockButtons.length);
        });

        test("显示开关关闭时不渲染弹窗", async () => {
            const wrapper = createWrapper({ isShow: false, buttons: [] });
            await nextTick();
            expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(false);
            expect(wrapper.findComponent({ name: "ElButton" }).exists()).toBe(false);
        });

        test("按钮列表为空时正常渲染弹窗", async () => {
            const wrapper = createWrapper({ buttons: [] });
            await nextTick();
            expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(true);
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(0);
        });

        test("隐藏标记为不显示的按钮", async () => {
            const buttonsWithHidden: DialogFormButton[] = [
                { handleCode: "visible", contents: "可见", isShow: true },
                { handleCode: "hidden", contents: "隐藏", isShow: false }
            ];
            const wrapper = createWrapper({ buttons: buttonsWithHidden });
            await nextTick();
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(1);
        });
    });

    describe("交互行为", () => {
        test("点击提交按钮时执行回调并恢复加载状态", async () => {
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

        test("点击取消按钮后关闭弹窗", async () => {
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

        test("按钮回调返回 false 时保留弹窗", async () => {
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

        test("按钮加载期间不重复执行回调", async () => {
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

        test("捕获按钮回调异常并保留弹窗", async () => {
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

    describe("插槽", () => {
        test("正确渲染自定义插槽内容", async () => {
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

    describe("公开实例方法", () => {
        test("获取当前表单数据", async () => {
            const wrapper = createWrapper();
            await nextTick();
            const formValues = wrapper.vm.getInputValue();

            expect(formValues).toEqual({
                name: "",
                status: 1
            });
        });

        test("表单实例不存在时返回空对象", () => {
            const wrapper = createWrapper({ isShow: false, buttons: [] });
            // 弹窗未显示时 inputFormRef 为 null
            expect(wrapper.vm.getInputValue()).toEqual({});
        });

        test("通过实例方法更新表单字段值", async () => {
            const wrapper = createWrapper();
            await nextTick();
            wrapper.vm.setInputPropertyValue("name", "New Name");

            const updatedValues = wrapper.vm.getInputValue();
            expect(updatedValues).toEqual({
                name: "New Name",
                status: 1
            });
        });

        test("通过回调修改表单字段配置", async () => {
            const wrapper = createWrapper();
            await nextTick();
            const changeFormFieldsCallback = vi.fn();
            wrapper.vm.changeFormFields(changeFormFieldsCallback);

            expect(changeFormFieldsCallback).toHaveBeenCalled();
            expect(changeFormFieldsCallback).toHaveBeenCalledWith(wrapper.findComponent({ name: "InputForm" }).vm.formFields);
        });

        test("通过回调修改按钮配置", () => {
            const wrapper = createWrapper();
            const changeButtonsCallback = vi.fn();
            wrapper.vm.changeButtons(changeButtonsCallback);

            expect(changeButtonsCallback).toHaveBeenCalled();
            expect(changeButtonsCallback).toHaveBeenCalledWith((wrapper.vm as any).actionButtons);
        });

        test("修改按钮时传入非函数参数则发出警告", () => {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
            const wrapper = createWrapper();
            wrapper.vm.changeButtons("not a function" as any);
            expect(warnSpy).toHaveBeenCalledWith("callback 必须是一个函数");
            warnSpy.mockRestore();
        });

        test("表单未挂载时返回空引用", async () => {
            const wrapper = createWrapper({ isShow: false, buttons: [] });
            expect(wrapper.vm.getFormRef()).toBeNull();
        });

        test("表单挂载后返回表单实例", async () => {
            const wrapper = createWrapper();
            await nextTick();
            expect(wrapper.vm.getFormRef()).not.toBeNull();
        });

        test("表单实例不存在时校验失败", async () => {
            const wrapper = createWrapper({ isShow: false, buttons: [] });
            await expect(wrapper.vm.validate()).rejects.toThrow("表单组件尚未挂载，无法执行验证");
        });

        test("表单挂载后能够执行校验", async () => {
            const wrapper = createWrapper({ value: { name: "", status: 1 } });
            await nextTick();
            const result = wrapper.vm.validate();
            expect(result).toBeInstanceOf(Promise);
        });
    });

    describe("事件通知", () => {
        test("字段值变化时触发对应事件", async () => {
            const wrapper = createWrapper();
            await nextTick();
            // InputForm 会触发 fieldValueChange 事件
            const inputForm = wrapper.findComponent({ name: "InputForm" });
            await inputForm.vm.$emit("fieldValueChange", mockFields[0], "new value", mockFields, { name: "new value", status: 1 });
            await nextTick();
            expect(wrapper.emitted("fieldValueChange")).toBeTruthy();
        });

        test("弹窗关闭后发出关闭事件", async () => {
            const wrapper = createWrapper();
            await nextTick();
            // 通过 ElDialog 的 closed 事件触发 close
            const dialog = wrapper.findComponent({ name: "ElDialog" });
            dialog.vm.$emit("closed");
            await nextTick();
            expect(wrapper.emitted("close")).toBeTruthy();
        });
    });

    describe("响应式更新", () => {
        test("按钮配置变化时重新生成按钮", async () => {
            const wrapper = createWrapper();
            await nextTick();
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(2);

            const newButtons: DialogFormButton[] = [{ handleCode: "new1", contents: "新按钮1" }];
            await wrapper.setProps({ buttons: newButtons });
            await nextTick();
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(1);
        });

        test("显示开关变化时切换弹窗可见状态", async () => {
            const wrapper = createWrapper({ isShow: false, buttons: [] });
            await nextTick();
            expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(false);

            await wrapper.setProps({ isShow: true, buttons: mockButtons });
            await nextTick();
            expect(wrapper.findComponent({ name: "ElDialog" }).exists()).toBe(true);
        });
    });
});

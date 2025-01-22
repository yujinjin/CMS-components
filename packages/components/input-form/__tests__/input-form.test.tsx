/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-02 18:01:28
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 15:13:40
 * @项目的路径: \CMS-components\packages\components\input-form\__tests__\input-form.test.tsx
 * @描述: input-form组件测试用例
 */

import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ElLoading, ElInput } from "element-plus";
import InputForm from "../src/input-form.vue";
import { type InputFormField } from "../src/input-form";

// Mock InputField component
const InputField = {
    name: "InputField",
    template: "<div></div>",
    props: ["modelValue", "type", "field"],
    emits: ["update:modelValue"]
};

describe("InputForm", () => {
    const fields: InputFormField[] = [
        {
            name: "userName",
            label: "用户名",
            type: "label"
        },
        {
            name: "gender",
            label: "性别",
            type: "radio",
            data: [
                {
                    value: "1",
                    label: "男"
                },
                {
                    value: "2",
                    label: "女"
                }
            ]
        },
        {
            name: "email",
            label: "EMAIL",
            trim: true,
            formItemProps: {
                rules: [
                    { required: true, message: "请输入EMAIL" },
                    { type: "email", message: "请输入正确格式的邮箱" }
                ]
            }
        },
        {
            name: "phoneNumber",
            label: "手机号"
        }
    ];

    const value = {
        userName: "admin",
        gender: "1",
        email: "admin@tt.com",
        phoneNumber: "13564323232",
        numberValue: 12
    };

    const createWrapper = (props = {}) => {
        return mount(InputForm, {
            props: {
                fields,
                props: {
                    rules: {
                        phoneNumber: [
                            { required: true, message: "请输入手机号" },
                            { pattern: /^1[3456789]\d{9}$/, message: "请输入正确格式的手机号" }
                        ]
                    }
                },
                ...props
            },
            global: {
                plugins: [ElLoading],
                components: {
                    ElInput,
                    InputField // 注册 mock 的 InputField 组件
                }
            }
        });
    };

    describe("Basic Rendering", () => {
        test("renders input correctly", () => {
            const wrapper = createWrapper();
            expect(wrapper.findComponent({ name: "ElForm" }).exists()).toBe(true);
            expect(wrapper.findComponent({ name: "ElForm" }).props("rules")).toMatchObject({
                phoneNumber: [
                    { required: true, message: "请输入手机号" },
                    { pattern: /^1[3456789]\d{9}$/, message: "请输入正确格式的手机号" }
                ]
            });
            expect(wrapper.findAllComponents({ name: "InputField" })).toHaveLength(fields.length);
            expect(wrapper.findAllComponents({ name: "InputField" })[1].props("type")).toEqual("radio");
            expect(wrapper.findAllComponents({ name: "InputField" })[2].props("type")).toEqual("input");
            expect(wrapper.findAllComponents({ name: "ElFormItem" })[2].props("rules")).toMatchObject([
                { required: true, message: "请输入EMAIL" },
                { type: "email", message: "请输入正确格式的邮箱" }
            ]);
        });

        test("renders with initial value", () => {
            const wrapper = createWrapper({
                value
            });
            expect(wrapper.findComponent({ name: "ElForm" }).props("model")).toEqual(value);
        });

        test("renders slot", async () => {
            const wrapper = mount(
                () => (
                    <InputForm
                        fields={[
                            ...fields,
                            {
                                name: "numberValue",
                                label: "城市",
                                slot: "numberValue"
                            }
                        ]}
                        value={{ ...value, numberValue: 12 }}
                    >
                        {{
                            numberValue: ({ value }) => <div class="city-number-value">{value}</div>
                        }}
                    </InputForm>
                ),
                {
                    global: {
                        plugins: [ElLoading]
                    }
                }
            );
            await nextTick();
            expect(wrapper.find(".city-number-value").exists()).toBeTruthy();
            expect(wrapper.find(".city-number-value").text()).toBe("12");
        });
    });

    describe("Input Functionality", () => {
        test("emits update:modelValue on input", async () => {
            const wrapper = createWrapper();
            const inputFields = wrapper.findAllComponents(InputField);
            const phoneInput = inputFields[3];

            await phoneInput.vm.$emit("update:modelValue", "13800138000");
            await nextTick();

            const emittedEvents = wrapper.emitted();
            expect(emittedEvents.fieldValueChange).toBeTruthy();
            expect(emittedEvents.fieldValueChange[0]?.[1]).toEqual("13800138000");
        });

        test("trim value when trim is true", async () => {
            // TODO: console提示undefined,研究了半天也找不出是哪里的问题
            const wrapper = createWrapper();
            const inputFields = wrapper.findAllComponents(InputField);
            const emailInput = inputFields[2]; // email field has trim: true
            const testEmail = "  test@example.com  ";

            await emailInput.vm.$emit("update:modelValue", testEmail);
            await nextTick();

            const emittedEvents = wrapper.emitted();
            expect(emittedEvents.fieldValueChange).toBeTruthy();
            expect(emittedEvents.fieldValueChange[0]?.[1]).toEqual(testEmail.trim());
        });
    });

    describe("Exposed Methods", () => {
        test("validate method returns promise", async () => {
            const wrapper = createWrapper({
                value
            });

            const validateResult = wrapper.vm.validate();
            expect(validateResult).toBeInstanceOf(Promise);
        });

        test("validate method with invalid input", async () => {
            const wrapper = createWrapper({
                value: {
                    ...value,
                    phoneNumber: "1223" // Invalid phone number
                }
            });

            try {
                await wrapper.vm.validate();
                // Should not reach here
                expect(false).toBe(true);
            } catch (error) {
                expect(error).toBeTruthy();
            }
        });

        test("getInputValue method", async () => {
            const wrapper = createWrapper({ value });
            expect(wrapper.vm.getInputValue()).toMatchObject(value);
        });

        test("setInputPropertyValue method", async () => {
            const wrapper = createWrapper({ value });

            wrapper.vm.setInputPropertyValue("gender", "2");

            await nextTick();
            expect(wrapper.findComponent({ name: "ElRadioGroup" }).props("modelValue")).toEqual("2");
            expect(wrapper.vm.getInputValue()).toMatchObject({ ...value, gender: "2" });
        });

        test("changeFormFields method", async () => {
            const wrapper = createWrapper({ value });
            const changeFormFieldsCallback = vi.fn();
            wrapper.vm.changeFormFields(changeFormFieldsCallback);
            expect(changeFormFieldsCallback).toHaveBeenCalled();
            expect(changeFormFieldsCallback).toHaveBeenCalledWith((wrapper.vm as any).formFields);
        });

        test("getFormRef method", async () => {
            const wrapper = createWrapper();
            await nextTick();
            expect(wrapper.vm.getFormRef()).not.toBeUndefined();
        });
    });
});

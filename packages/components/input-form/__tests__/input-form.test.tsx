/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-02 18:01:28
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-09 10:05:51
 * @项目的路径: \CMS-components\packages\components\input-form\__tests__\input-form.test.tsx
 * @描述: 头部注释配置模板
 */

import { describe, test, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ElLoading, ElInput } from "element-plus";
import InputForm from "../src/input-form.vue";
import { type InputFormField } from "../src/input-form";

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
                    ElInput
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
            const input = wrapper.findAllComponents({ name: "InputField" })[1];
            await input.vm.$emit("update:modelValue", "1");
            expect(wrapper.emitted("fieldValueChange")).toBeTruthy();
            expect(wrapper.emitted("fieldValueChange")?.[0][1]).toEqual("1");
        });

        test("trim value when trim is true", async () => {
            const wrapper = createWrapper();
            const input = wrapper.findAllComponents({ name: "InputField" })[2];
            const testEmail = "  test@test.com  ";

            await input.vm.$emit("update:modelValue", testEmail);
            await nextTick();

            const emittedEvents = wrapper.emitted("fieldValueChange");
            expect(emittedEvents).toBeTruthy();
            expect(emittedEvents?.[0]).toBeTruthy();
            expect(emittedEvents?.[0][1]).toBe(testEmail.trim());
        });
    });

    describe("Exposed Methods", () => {
        test("validate method returns true for valid input", async () => {
            const wrapper = createWrapper({
                value
            });
            expect(() => wrapper.vm.validate()).not.toThrowError();
        });

        // test("validate method", async () => {
        //     const wrapper = createWrapper({
        //         value: {
        //             ...value,
        //             phoneNumber: "1223"
        //         }
        //     });
        //     await nextTick();
        //     try {
        //         await wrapper.vm.validate();
        //         console.info("2222222222222");
        //     } catch (error) {
        //         console.info(error);
        //     }
        //     // const result = await wrapper.vm.validate();
        //     // console.info
        //     // expect(() => wrapper.vm.validate()).rejects.toThrowError("请输入正确格式的手机号");
        // });

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

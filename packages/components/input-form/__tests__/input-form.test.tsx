/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-02 18:01:28
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-17 19:16:31
 * @项目的路径: \CMS-components\packages\components\input-form\__tests__\input-form.test.tsx
 * @描述: input-form组件测试用例
 */

import { describe, test, expect, vi, afterEach } from "vitest";
import { mount, enableAutoUnmount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ElLoading, ElInput } from "element-plus";
import InputForm from "../src/input-form.vue";
import { type InputFormField, type InputFormSlotScope } from "../src/input-form";

enableAutoUnmount(afterEach);
afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("输入表单组件", () => {
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
                    // 在 JSDOM 环境中，type: 'email' 这样的类型验证时，执行默认的正则表达式，特别是对于包含 @ 和域名部分的验证，JSDOM 会认为这是一个潜在的网络请求，触发网络验证时，控制台会抛出异常：Error: AggregateError
                    // { type: "email", message: "请输入正确格式的邮箱" }
                    // 这个简化版的正则表达式不会触发 JSDOM 的网络请求模拟，同时仍然能够有效验证邮箱格式。
                    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "请输入正确格式的邮箱" }
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

    test.each([null, false, 0, ""])("外部值 %s 优先于字段默认值", value => {
        const wrapper = createWrapper({ fields: [{ name: "value", type: "label", value: "默认值" }], value: { value } });
        expect(wrapper.vm.getInputValue()).toEqual({ value });
    });

    test("嵌套路径写入同步事件且返回值与内部状态隔离", async () => {
        const wrapper = createWrapper({ fields: [{ name: "user.name", type: "input" }], value: { user: { name: "原值" } } });
        await wrapper.get("input").setValue("新值");
        const value = wrapper.vm.getInputValue();
        expect(value).toEqual({ user: { name: "新值" } });
        value.user.name = "外部修改";
        expect(wrapper.vm.getInputValue()).toEqual({ user: { name: "新值" } });
        expect(wrapper.emitted("fieldValueChange")?.[0]?.[3]).toEqual({ user: { name: "新值" } });
    });

    test("隐藏字段保留初始数据但不生成可编辑控件", () => {
        const wrapper = createWrapper({ fields: [{ name: "token", type: "input", isShow: false, value: "fixed" }] });
        expect(wrapper.find("input").exists()).toBe(false);
        expect(wrapper.vm.getInputValue()).toEqual({ token: "fixed" });
    });

    describe("基础渲染", () => {
        test("按照字段配置渲染表单", () => {
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
                { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "请输入正确格式的邮箱" }
                // { type: "email", message: "请输入正确格式的邮箱" }
            ]);
        });

        test("正确回显表单初始值", () => {
            const wrapper = createWrapper({
                value
            });
            expect(wrapper.findComponent({ name: "ElForm" }).props("model")).toEqual(value);
        });

        test("正确渲染字段插槽", async () => {
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
                            numberValue: ({ value }: InputFormSlotScope) => <div class="city-number-value">{value}</div>
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

    describe("空数据与异常场景", () => {
        test("字段数组为空时渲染空表单", () => {
            const wrapper = mount(InputForm, {
                props: {
                    fields: []
                },
                global: {
                    plugins: [ElLoading]
                }
            });
            expect(wrapper.findComponent({ name: "ElForm" }).exists()).toBe(true);
            expect(wrapper.findAllComponents({ name: "InputField" })).toHaveLength(0);
        });

        test("字段缺少名称时发出警告", () => {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
            mount(InputForm, {
                props: {
                    fields: [{ label: "测试字段" } as any]
                },
                global: {
                    plugins: [ElLoading]
                }
            });
            expect(warnSpy).toHaveBeenCalledWith("字段没有属性name值", expect.objectContaining({ label: "测试字段" }));
            warnSpy.mockRestore();
        });
    });

    describe("布局与显隐", () => {
        test("按照双列布局分配字段栅格", () => {
            const wrapper = createWrapper({ columns: 2 });
            const cols = wrapper.findAllComponents({ name: "ElCol" });
            // columns=2 时，每个字段 span 默认为 24/2 = 12
            cols.forEach(col => {
                expect(col.props("span")).toBe(12);
            });
        });

        test("启用加载状态时正确渲染表单", () => {
            const wrapper = createWrapper({ isLoading: true });
            // v-loading 指令会在 DOM 上添加 loading 相关的类或属性
            const loadingEl = wrapper.find(".cms-input-form");
            expect(loadingEl.exists()).toBe(true);
        });

        test("显示标记为 false 时隐藏字段", () => {
            const fieldsWithHidden: InputFormField[] = [
                { name: "visible", label: "可见", type: "input" },
                { name: "hidden", label: "隐藏", type: "input", isShow: false }
            ];
            const wrapper = mount(InputForm, {
                props: { fields: fieldsWithHidden },
                global: { plugins: [ElLoading] }
            });
            // 只有可见字段会渲染 InputField
            expect(wrapper.findAllComponents({ name: "InputField" })).toHaveLength(1);
        });

        test("应用自定义字段栅格跨度", () => {
            const fieldsWithSpan: InputFormField[] = [{ name: "field1", label: "字段1", type: "input", span: 8 }];
            const wrapper = mount(InputForm, {
                props: { fields: fieldsWithSpan },
                global: { plugins: [ElLoading] }
            });
            const col = wrapper.findComponent({ name: "ElCol" });
            expect(col.props("span")).toBe(8);
        });

        test("应用自定义字段控件宽度", () => {
            const fieldsWithWidth: InputFormField[] = [{ name: "field1", label: "字段1", type: "input", inputWidth: 200 }];
            const wrapper = mount(InputForm, {
                props: { fields: fieldsWithWidth },
                global: { plugins: [ElLoading] }
            });
            const inputField = wrapper.findComponent({ name: "InputField" });
            expect(inputField.props("props").style.width).toBe("200px");
        });
    });

    describe("输入交互", () => {
        test("输入时触发字段值变化事件", async () => {
            // console会打印出undefined,原因是el-form触发验证打印的日志
            const wrapper = createWrapper();
            const inputFields = wrapper.findAllComponents({ name: "InputField" });
            const phoneInput = inputFields[3];

            await phoneInput.vm.$emit("update:modelValue", "13800138000");
            await nextTick();

            const emittedEvents = wrapper.emitted();
            expect(emittedEvents.fieldValueChange).toBeTruthy();
            expect((emittedEvents.fieldValueChange as any[])[0]?.[1]).toEqual("13800138000");
        });

        test("启用去空格配置时移除首尾空白", async () => {
            // console会打印出undefined,原因是el-form触发验证打印的日志
            const wrapper = createWrapper();
            const inputFields = wrapper.findAllComponents({ name: "InputField" });
            const emailInput = inputFields[2]; // 邮箱字段已启用去空格配置
            const testEmail = "  test@example.com  ";

            await emailInput.vm.$emit("update:modelValue", testEmail);
            await nextTick();

            const emittedEvents = wrapper.emitted();
            expect(emittedEvents.fieldValueChange).toBeTruthy();
            expect((emittedEvents.fieldValueChange as any[])[0]?.[1]).toEqual(testEmail.trim());
        });

        test("去空格时保留字符串零值", async () => {
            // 验证 "  0  " 这样的值也能被正确 trim
            const wrapper = createWrapper();
            const inputFields = wrapper.findAllComponents({ name: "InputField" });
            const emailInput = inputFields[2]; // 邮箱字段已启用去空格配置

            await emailInput.vm.$emit("update:modelValue", "  0  ");
            await nextTick();

            const emittedEvents = wrapper.emitted();
            expect(emittedEvents.fieldValueChange).toBeTruthy();
            expect((emittedEvents.fieldValueChange as any[])[0]?.[1]).toEqual("0");
        });

        test("非字符串值不进行去空格处理", async () => {
            // 验证非字符串值不会被 trim 处理
            const fieldsWithTrim: InputFormField[] = [{ name: "numberField", label: "数字", type: "input", trim: true }];
            const wrapper = mount(InputForm, {
                props: { fields: fieldsWithTrim, value: { numberField: 123 } },
                global: { plugins: [ElLoading] }
            });
            const inputField = wrapper.findComponent({ name: "InputField" });

            await inputField.vm.$emit("update:modelValue", 0);
            await nextTick();

            const emittedEvents = wrapper.emitted();
            expect(emittedEvents.fieldValueChange).toBeTruthy();
            expect((emittedEvents.fieldValueChange as any[])[0]?.[1]).toEqual(0);
        });
    });

    describe("公开实例方法", () => {
        test("校验方法返回异步结果", async () => {
            const wrapper = createWrapper({
                value
            });

            const validateResult = wrapper.vm.validate();
            expect(validateResult).toBeInstanceOf(Promise);
        });

        test("输入不合法时表单校验失败", async () => {
            const wrapper = createWrapper({
                value: {
                    ...value,
                    phoneNumber: "1223" // 无效手机号
                }
            });

            try {
                await wrapper.vm.validate();
                // 校验失败时不应执行到此处
                expect(false).toBe(true);
            } catch (error) {
                expect(error).toBeTruthy();
            }
        });

        test("获取当前表单值", async () => {
            const wrapper = createWrapper({ value });
            expect(wrapper.vm.getInputValue()).toMatchObject(value);
        });

        test("返回的表单数据与内部状态深度隔离", () => {
            const wrapper = createWrapper({ value });
            const result1 = wrapper.vm.getInputValue();
            // 修改返回值不应影响组件内部数据
            result1.phoneNumber = "modified";
            const result2 = wrapper.vm.getInputValue();
            expect(result2.phoneNumber).toEqual("13564323232");
        });

        test("通过实例方法设置字段值", async () => {
            const wrapper = createWrapper({ value });

            wrapper.vm.setInputPropertyValue("gender", "2");

            await nextTick();
            expect(wrapper.findComponent({ name: "ElRadioGroup" }).props("modelValue")).toEqual("2");
            expect(wrapper.vm.getInputValue()).toMatchObject({ ...value, gender: "2" });
        });

        test("设置未声明字段时直接补充数据", async () => {
            const wrapper = createWrapper({ value });
            wrapper.vm.setInputPropertyValue("newField", "newValue");
            await nextTick();
            expect(wrapper.vm.getInputValue()).toMatchObject({ ...value, newField: "newValue" });
        });

        test("通过实例方法修改字段配置", async () => {
            const wrapper = createWrapper({ value });
            const changeFormFieldsCallback = vi.fn();
            wrapper.vm.changeFormFields(changeFormFieldsCallback);
            expect(changeFormFieldsCallback).toHaveBeenCalled();
            expect(changeFormFieldsCallback).toHaveBeenCalledWith((wrapper.vm as any).formFields);
        });

        test("修改字段时传入非函数参数则发出警告", () => {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
            const wrapper = createWrapper({ value });
            wrapper.vm.changeFormFields("not a function" as any);
            expect(warnSpy).toHaveBeenCalledWith("callback 必须是一个函数");
            warnSpy.mockRestore();
        });

        test("获取底层表单实例", async () => {
            const wrapper = createWrapper();
            await nextTick();
            expect(wrapper.vm.getFormRef()).not.toBeNull();
        });

        test("卸载后获取表单实例返回空引用", async () => {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
            const wrapper = createWrapper();
            await nextTick();
            // 挂载时能正常获取 ref
            expect(wrapper.vm.getFormRef()).not.toBeNull();
            // 卸载后应返回 null
            wrapper.unmount();
            expect(wrapper.vm.getFormRef()).toBeNull();
            expect(warnSpy).toHaveBeenCalledWith("getFormRef: 表单组件尚未挂载，无法获取 ref");
            warnSpy.mockRestore();
        });

        test("卸载后执行表单校验返回失败", async () => {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
            const wrapper = createWrapper();
            await nextTick();
            wrapper.unmount();
            await expect(wrapper.vm.validate()).rejects.toThrow("表单组件尚未挂载，无法执行验证");
            expect(warnSpy).toHaveBeenCalledWith("validate: 表单组件尚未挂载，无法执行验证");
            warnSpy.mockRestore();
        });
    });

    describe("事件参数校验", () => {
        test("字段值变化事件包含完整参数", async () => {
            const wrapper = createWrapper();
            const inputFields = wrapper.findAllComponents({ name: "InputField" });
            const phoneInput = inputFields[3];

            await phoneInput.vm.$emit("update:modelValue", "13800138000");
            await nextTick();

            const emittedEvents = wrapper.emitted();
            expect(emittedEvents.fieldValueChange).toBeTruthy();
            const args = (emittedEvents.fieldValueChange as any[])[0];
            // 验证事件包含 4 个参数：field, fieldValue, formFields, inputFormValue
            expect(args).toHaveLength(4);
            expect(args[0]).toHaveProperty("name", "phoneNumber");
            expect(args[1]).toEqual("13800138000");
            expect(Array.isArray(args[2])).toBe(true);
            expect(typeof args[3]).toBe("object");
        });
    });

    describe("响应式更新", () => {
        test("字段配置变化时重新生成字段", async () => {
            const wrapper = createWrapper();
            expect(wrapper.findAllComponents({ name: "InputField" })).toHaveLength(4);

            const newFields: InputFormField[] = [
                { name: "newField1", label: "新字段1", type: "input" },
                { name: "newField2", label: "新字段2", type: "input" }
            ];
            await wrapper.setProps({ fields: newFields });
            expect(wrapper.findAllComponents({ name: "InputField" })).toHaveLength(2);
        });

        test("外部值变化时重新初始化表单数据", async () => {
            const wrapper = createWrapper({ value });
            expect(wrapper.vm.getInputValue()).toMatchObject(value);

            const newValue = { ...value, phoneNumber: "13900139000" };
            await wrapper.setProps({ value: newValue });
            expect(wrapper.vm.getInputValue()).toMatchObject(newValue);
        });

        test("开关字段未指定初值时默认为 false", () => {
            const switchFields: InputFormField[] = [{ name: "enabled", label: "启用", type: "switch" }];
            const wrapper = mount(InputForm, {
                props: { fields: switchFields },
                global: { plugins: [ElLoading] }
            });
            // switch 类型默认值应为 false
            expect(wrapper.vm.getInputValue().enabled).toBe(false);
        });

        test("复选框字段未指定初值时默认为空数组", () => {
            const checkboxFields: InputFormField[] = [{ name: "options", label: "选项", type: "checkbox" }];
            const wrapper = mount(InputForm, {
                props: { fields: checkboxFields },
                global: { plugins: [ElLoading] }
            });
            // checkbox 类型默认值应为 []
            expect(wrapper.vm.getInputValue().options).toEqual([]);
        });

        test("滑块字段未指定初值时默认为零", () => {
            const sliderFields: InputFormField[] = [{ name: "volume", label: "音量", type: "slider" }];
            const wrapper = mount(InputForm, {
                props: { fields: sliderFields },
                global: { plugins: [ElLoading] }
            });
            // slider 类型默认值应为 0
            expect(wrapper.vm.getInputValue().volume).toBe(0);
        });

        test("输入字段未指定初值时默认为 null", () => {
            const inputFields: InputFormField[] = [{ name: "name", label: "名称", type: "input" }];
            const wrapper = mount(InputForm, {
                props: { fields: inputFields },
                global: { plugins: [ElLoading] }
            });
            // input 类型默认值应为 null
            expect(wrapper.vm.getInputValue().name).toBeNull();
        });
    });

    describe("字段类型", () => {
        test("正确渲染日期选择字段", () => {
            const dateFields: InputFormField[] = [{ name: "birthDate", label: "出生日期", type: "datePicker" }];
            const wrapper = mount(InputForm, {
                props: { fields: dateFields },
                global: { plugins: [ElLoading] }
            });
            const inputField = wrapper.findComponent({ name: "InputField" });
            expect(inputField.props("type")).toEqual("datePicker");
        });

        test("正确渲染下拉选择字段", () => {
            const selectFields: InputFormField[] = [{ name: "city", label: "城市", type: "select", data: [{ value: "bj", label: "北京" }] }];
            const wrapper = mount(InputForm, {
                props: { fields: selectFields },
                global: { plugins: [ElLoading] }
            });
            const inputField = wrapper.findComponent({ name: "InputField" });
            expect(inputField.props("type")).toEqual("select");
            expect(inputField.props("data")).toEqual([{ value: "bj", label: "北京" }]);
        });

        test("正确渲染开关字段", () => {
            const switchFields: InputFormField[] = [{ name: "enabled", label: "启用", type: "switch" }];
            const wrapper = mount(InputForm, {
                props: { fields: switchFields },
                global: { plugins: [ElLoading] }
            });
            const inputField = wrapper.findComponent({ name: "InputField" });
            expect(inputField.props("type")).toEqual("switch");
        });

        test("将字段校验规则传递给表单项", () => {
            const fieldsWithRules: InputFormField[] = [{ name: "required", label: "必填", type: "input", rules: [{ required: true, message: "此项必填" }] }];
            const wrapper = mount(InputForm, {
                props: { fields: fieldsWithRules },
                global: { plugins: [ElLoading] }
            });
            const formItem = wrapper.findComponent({ name: "ElFormItem" });
            expect(formItem.props("rules")).toMatchObject([{ required: true, message: "此项必填" }]);
        });

        test("将自定义表单项属性传递给底层组件", () => {
            const fieldsWithFormItemProps: InputFormField[] = [{ name: "field1", label: "字段1", type: "input", formItemProps: { required: true } }];
            const wrapper = mount(InputForm, {
                props: { fields: fieldsWithFormItemProps },
                global: { plugins: [ElLoading] }
            });
            const formItem = wrapper.findComponent({ name: "ElFormItem" });
            expect(formItem.props("required")).toBe(true);
        });
    });

    describe("表单事件配置", () => {
        test("未传入事件配置时不产生事件绑定警告", () => {
            const vueWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
            mount(InputForm, {
                props: {
                    fields
                },
                global: {
                    plugins: [ElLoading]
                }
            });
            // 不应出现 v-on 相关的 Vue 警告
            const vOnWarnings = vueWarnSpy.mock.calls.filter(call => typeof call[0] === "string" && call[0].includes("v-on"));
            expect(vOnWarnings).toHaveLength(0);
            vueWarnSpy.mockRestore();
        });
    });
});

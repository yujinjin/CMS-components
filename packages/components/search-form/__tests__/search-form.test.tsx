import { describe, test, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import { ElLoading } from "element-plus";
import SearchForm from "../src/search-form.vue";
import { type SearchFormField, type SearchFormButton } from "../src/search-form";

describe("SearchForm", () => {
    const mockFields: SearchFormField[] = [
        { name: "name", label: "Name", type: "input", defaultValue: "admin" },
        {
            name: "status",
            label: "Status",
            type: "select",
            defaultValue: 1,
            data: [
                { label: "Active", value: 1 },
                { label: "Inactive", value: 0 }
            ]
        }
    ];

    const mockButtons: SearchFormButton[] = [
        {
            handleCode: "DOWNLOAD",
            contents: "download",
            click: vi.fn(() => {
                return new Promise<void>(resolve => setTimeout(() => resolve(), 100));
            })
        }
    ];

    const createWrapper = (props = {}) => {
        return mount(SearchForm, {
            props: {
                fields: mockFields,
                buttons: mockButtons,
                ...props
            },
            global: {
                plugins: [ElLoading]
            }
        });
    };

    describe("Basic Rendering", () => {
        test("renders correctly", () => {
            const wrapper = createWrapper();
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(mockButtons.length + 3);
            expect(wrapper.findAllComponents({ name: "SearchField" })).toHaveLength(mockFields.length);
            expect(wrapper.find(".placeholder-button-box").exists()).toBe(true);
        });

        test("renders buttons correctly", () => {
            const wrapper = createWrapper({
                isShowSearchButton: false,
                isShowResetButton: false
            });
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(mockButtons.length + 1);
        });

        test("renders empty form with empty fields array", () => {
            const wrapper = mount(SearchForm, {
                props: { fields: [] },
                global: { plugins: [ElLoading] }
            });
            expect(wrapper.findAllComponents({ name: "SearchField" })).toHaveLength(0);
        });

        test("warns when field is missing name", () => {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
            mount(SearchForm, {
                props: { fields: [{ label: "测试字段" } as any] },
                global: { plugins: [ElLoading] }
            });
            expect(warnSpy).toHaveBeenCalledWith("字段没有属性name值", expect.objectContaining({ label: "测试字段" }));
            warnSpy.mockRestore();
        });

        test("hides field when isShow is false", () => {
            const fieldsWithHidden: SearchFormField[] = [
                { name: "visible", label: "可见", type: "input" },
                { name: "hidden", label: "隐藏", type: "input", isShow: false }
            ];
            const wrapper = mount(SearchForm, {
                props: { fields: fieldsWithHidden },
                global: { plugins: [ElLoading] }
            });
            // 只有可见字段会渲染 field-box
            const visibleFieldBoxes = wrapper.findAll(".field-box");
            expect(visibleFieldBoxes).toHaveLength(1);
        });
    });

    describe("Layout and Display", () => {
        test("applies custom labelWidth", () => {
            const wrapper = createWrapper({ labelWidth: 80 });
            const labelText = wrapper.find(".label-text");
            expect(labelText.exists()).toBe(true);
            expect(labelText.attributes("style")).toContain("80px");
        });

        test("applies custom inputWidth", () => {
            const wrapper = createWrapper({ inputWidth: 300 });
            const inputBox = wrapper.find(".input-box");
            expect(inputBox.exists()).toBe(true);
            expect(inputBox.attributes("style")).toContain("300px");
        });

        test("applies custom labelSuffix", () => {
            const fieldsWithLabel: SearchFormField[] = [{ name: "test", label: "测试", type: "input" }];
            const wrapper = mount(SearchForm, {
                props: { fields: fieldsWithLabel, labelSuffix: ":" },
                global: { plugins: [ElLoading] }
            });
            const labelText = wrapper.find(".label-text");
            expect(labelText.text()).toContain(":");
        });

        test("shows loading state on search button", () => {
            const wrapper = createWrapper({ isSearchLoading: true });
            const buttons = wrapper.findAllComponents({ name: "ElButton" });
            // 查询按钮是第二个按钮（第一个是扩展按钮）
            const searchButton = buttons[1];
            expect(searchButton.props("loading")).toBe(true);
        });

        test("hides search button when isShowSearchButton is false", () => {
            const wrapper = createWrapper({ isShowSearchButton: false });
            const buttons = wrapper.findAllComponents({ name: "ElButton" });
            // 扩展按钮 + 重置 + 收起 = mockButtons.length + 2
            expect(buttons).toHaveLength(mockButtons.length + 2);
        });

        test("hides reset button when isShowResetButton is false", () => {
            const wrapper = createWrapper({ isShowResetButton: false });
            const buttons = wrapper.findAllComponents({ name: "ElButton" });
            expect(buttons).toHaveLength(mockButtons.length + 2);
        });

        test("hides collapse button when isShowCollapse is false", () => {
            const wrapper = createWrapper({ isShowCollapse: false });
            const buttons = wrapper.findAllComponents({ name: "ElButton" });
            // 扩展按钮 + 查询 + 重置 = mockButtons.length + 2
            expect(buttons).toHaveLength(mockButtons.length + 2);
        });
    });

    describe("Slots", () => {
        test("renders custom slot content", () => {
            const wrapper = mount(SearchForm, {
                props: {
                    fields: [...mockFields, { name: "text", label: "Text", slot: "text" }]
                },
                slots: {
                    text: '<div class="custom-slot">Custom Slot Content</div>'
                }
            });

            expect(wrapper.find(".custom-slot").exists()).toBe(true);
            expect(wrapper.find(".custom-slot").text()).toBe("Custom Slot Content");
        });
    });

    describe("Button Functionality", () => {
        test("calls search button click handler", async () => {
            const wrapper = createWrapper();
            const searchButton = wrapper.findAllComponents({ name: "ElButton" })[1];

            await searchButton.trigger("click");
            expect(searchButton.emitted("click")).toBeTruthy();
        });

        test("calls reset button click handler", async () => {
            const wrapper = createWrapper();
            const resetButton = wrapper.findAllComponents({ name: "ElButton" })[2];

            await resetButton.trigger("click");
            expect(resetButton.emitted("click")).toBeTruthy();
        });

        test("calls collapse button click handler", async () => {
            const wrapper = createWrapper();
            await wrapper.findAllComponents({ name: "ElButton" })[3].trigger("click");
            expect((wrapper.vm as any).collapseStatus).toBe(false);
            await wrapper.findAllComponents({ name: "ElButton" })[3].trigger("click");
            expect((wrapper.vm as any).collapseStatus).toBe(true);
        });

        test("calls custom button click handler", async () => {
            vi.useFakeTimers();
            const wrapper = createWrapper();
            const customButton = wrapper.findAllComponents({ name: "ElButton" })[0];
            expect(customButton.props("loading")).toBe(false);
            await customButton.trigger("click");
            expect(mockButtons[0].click).toHaveBeenCalled();
            expect(customButton.props("loading")).toBe(true);
            vi.runAllTimers();
            await flushPromises();

            expect(customButton.props("loading")).toBe(false);
        });
    });

    describe("emits event", () => {
        test("emits fieldsChange event", async () => {
            const wrapper = createWrapper();
            await nextTick();
            expect(wrapper.emitted("fieldsChange")).toBeTruthy();
            expect(wrapper.emitted("fieldsChange")?.[0]).toMatchObject([mockFields]);
        });

        test("emits search event", async () => {
            const wrapper = createWrapper();
            await wrapper.findAllComponents({ name: "SearchField" })[0].vm.$emit("update:modelValue", "system");

            const searchButton = wrapper.findAllComponents({ name: "ElButton" })[1];
            await searchButton.trigger("click");
            expect(wrapper.emitted("search")).toBeTruthy();
            expect(wrapper.emitted("search")?.[0]).toMatchObject([{ name: "system", status: 1 }]);

            const resetButton = wrapper.findAllComponents({ name: "ElButton" })[2];
            await resetButton.trigger("click");
            expect(wrapper.emitted("search")?.[1]).toMatchObject([{ name: "admin", status: 1 }]);
        });

        test("emits reset event with form values", async () => {
            const wrapper = createWrapper();
            // 修改值
            await wrapper.findAllComponents({ name: "SearchField" })[0].vm.$emit("update:modelValue", "modified");

            const resetButton = wrapper.findAllComponents({ name: "ElButton" })[2];
            await resetButton.trigger("click");

            // reset 事件应在 search 事件之前触发，携带重置后的表单值
            expect(wrapper.emitted("reset")).toBeTruthy();
            expect(wrapper.emitted("reset")?.[0]).toMatchObject([{ name: "admin", status: 1 }]);
        });

        test("emits change event", async () => {
            const wrapper = createWrapper();
            await nextTick();
            await wrapper.findAllComponents({ name: "SearchField" })[0].vm.$emit("update:modelValue", "system");
            await wrapper.findAllComponents({ name: "SearchField" })[0].vm.$emit("change", "system");
            expect(wrapper.emitted("change")).toBeTruthy();
            expect(wrapper.emitted("change")?.[0][0]).toMatchObject(Object.assign({}, mockFields[0], { value: "system" }));
            expect(wrapper.emitted("change")?.[0][1]).toMatchObject(mockFields);
        });

        test("emits collapseStatusChange event", async () => {
            const wrapper = createWrapper();
            await wrapper.findAllComponents({ name: "ElButton" })[3].trigger("click");
            await nextTick();

            expect(wrapper.emitted("collapseStatusChange")).toBeTruthy();
            expect(wrapper.emitted("collapseStatusChange")?.[0]).toEqual([false]);
        });
    });

    describe("Exposed Methods", () => {
        test("getValue method returns current form values", async () => {
            const wrapper = createWrapper();
            await nextTick();
            const formValues = wrapper.vm.getValue();

            expect(formValues).toEqual({
                name: "admin",
                status: 1
            });
        });

        test("changeFormFields method updates form fields", () => {
            const wrapper = createWrapper();
            const changeFormFieldsCallback = vi.fn();
            wrapper.vm.changeFormFields(changeFormFieldsCallback);

            expect(changeFormFieldsCallback).toHaveBeenCalled();
            expect(changeFormFieldsCallback).toHaveBeenCalledWith((wrapper.vm as any).formFields);
        });

        test("changeFormFields warns with non-function argument", () => {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
            const wrapper = createWrapper();
            wrapper.vm.changeFormFields("not a function" as any);
            expect(warnSpy).toHaveBeenCalledWith("callback 必须是一个函数");
            warnSpy.mockRestore();
        });
    });

    describe("Field Types", () => {
        test("renders datePicker field correctly", () => {
            const dateFields: SearchFormField[] = [{ name: "date", label: "日期", type: "datePicker" }];
            const wrapper = mount(SearchForm, {
                props: { fields: dateFields },
                global: { plugins: [ElLoading] }
            });
            const searchField = wrapper.findComponent({ name: "SearchField" });
            expect(searchField.props("type")).toEqual("datePicker");
        });

        test("renders select field correctly", () => {
            const selectFields: SearchFormField[] = [{ name: "city", label: "城市", type: "select", data: [{ value: "bj", label: "北京" }] }];
            const wrapper = mount(SearchForm, {
                props: { fields: selectFields },
                global: { plugins: [ElLoading] }
            });
            const searchField = wrapper.findComponent({ name: "SearchField" });
            expect(searchField.props("type")).toEqual("select");
            expect(searchField.props("data")).toEqual([{ value: "bj", label: "北京" }]);
        });

        test("renders inputNumber field correctly", () => {
            const inputNumberFields: SearchFormField[] = [{ name: "count", label: "数量", type: "inputNumber" }];
            const wrapper = mount(SearchForm, {
                props: { fields: inputNumberFields },
                global: { plugins: [ElLoading] }
            });
            const searchField = wrapper.findComponent({ name: "SearchField" });
            expect(searchField.props("type")).toEqual("inputNumber");
        });
    });

    describe("Reactivity", () => {
        test("fields dynamic change triggers regeneration", async () => {
            const wrapper = createWrapper();
            expect(wrapper.findAllComponents({ name: "SearchField" })).toHaveLength(2);

            const newFields: SearchFormField[] = [{ name: "newField1", label: "新字段1", type: "input" }];
            await wrapper.setProps({ fields: newFields });
            expect(wrapper.findAllComponents({ name: "SearchField" })).toHaveLength(1);
        });

        test("buttons dynamic change triggers regeneration", async () => {
            const wrapper = createWrapper();
            // 初始: mockButtons(1) + 查询 + 重置 + 收起 = 4
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(4);

            const newButtons: SearchFormButton[] = [
                { handleCode: "BTN1", contents: "按钮1" },
                { handleCode: "BTN2", contents: "按钮2" }
            ];
            await wrapper.setProps({ buttons: newButtons });
            // newButtons(2) + 查询 + 重置 + 收起 = 5
            expect(wrapper.findAllComponents({ name: "ElButton" })).toHaveLength(5);
        });

        test("defaultValue is applied on field generation", () => {
            const fieldsWithDefault: SearchFormField[] = [{ name: "keyword", label: "关键词", type: "input", defaultValue: "hello" }];
            const wrapper = mount(SearchForm, {
                props: { fields: fieldsWithDefault },
                global: { plugins: [ElLoading] }
            });
            expect(wrapper.vm.getValue()).toEqual({ keyword: "hello" });
        });
    });

    describe("Reset Behavior", () => {
        test("reset restores defaultValue and triggers search", async () => {
            const fieldsWithDefault: SearchFormField[] = [
                { name: "keyword", label: "关键词", type: "input", defaultValue: "initial" },
                { name: "status", label: "状态", type: "select", defaultValue: 1, data: [{ label: "Active", value: 1 }] }
            ];
            const wrapper = mount(SearchForm, {
                props: { fields: fieldsWithDefault, isShowCollapse: false },
                global: { plugins: [ElLoading] }
            });

            // 修改值
            const searchFields = wrapper.findAllComponents({ name: "SearchField" });
            await searchFields[0].vm.$emit("update:modelValue", "modified");

            // 点击重置按钮（第二个按钮：查询=0, 重置=1）
            const buttons = wrapper.findAllComponents({ name: "ElButton" });
            await buttons[1].trigger("click");

            // 验证值恢复到 defaultValue
            expect(wrapper.vm.getValue()).toEqual({ keyword: "initial", status: 1 });
            // 验证触发了 search 事件
            expect(wrapper.emitted("search")).toBeTruthy();
        });

        test("reset sets value to null when no defaultValue", async () => {
            const fieldsNoDefault: SearchFormField[] = [{ name: "keyword", label: "关键词", type: "input" }];
            const wrapper = mount(SearchForm, {
                props: { fields: fieldsNoDefault, isShowCollapse: false },
                global: { plugins: [ElLoading] }
            });

            // 修改值
            const searchField = wrapper.findComponent({ name: "SearchField" });
            await searchField.vm.$emit("update:modelValue", "modified");

            // 点击重置按钮
            const buttons = wrapper.findAllComponents({ name: "ElButton" });
            await buttons[1].trigger("click");

            // 没有 defaultValue 时值应为 null
            expect(wrapper.vm.getValue()).toEqual({ keyword: null });
        });
    });
});

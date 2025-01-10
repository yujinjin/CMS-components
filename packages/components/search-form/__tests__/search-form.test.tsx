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
    });
});

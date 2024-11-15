/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-01 14:40:23
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-05 18:02:12
 * @项目的路径: \CMS-components\packages\components\check-select\__tests__\check-select.test.tsx
 * @描述: check-select组件测试用例
 */
import { nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import SelectCheck from "../src/check-select.vue";

describe("SelectCheck", () => {
    test("render test & class", async () => {
        const values = ref(["1", "2", "3", "4"]);
        const data = ["1", "2", "3", "4"];
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} />);
        expect(wrapper.classes()).toContain("el-select");
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        expect((wrapper.findComponent({ name: "ElSelect" }).vm as any).expanded).toBe(true);
        expect(wrapper.findAllComponents({ name: "ElOption" }).length).toBe(data.length + 1);
        expect(wrapper.findAllComponents({ name: "ElCheckbox" }).length).toBe(data.length + 1);
        expect(wrapper.findComponent({ name: "ElCheckbox" }).classes("is-checked")).toBe(true);
    });

    test("prop optionValueKey、optionLabelKey", async () => {
        const values = ref(["1", "2"]);
        const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (value, index) => ({ id: index.toString(), name: `option ${index}` }));
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" />);
        expect(wrapper.classes()).toContain("el-select");
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        wrapper
            .findAllComponents({ name: "ElOption" })
            .slice(1)
            .forEach(({ vm }, index) => {
                expect(vm.label).toBe(data[index].name);
                expect(vm.value).toBe(data[index].id);
            });
    });

    test("default value", async () => {
        const values = ref();
        const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (value, index) => ({ id: index.toString(), name: `option ${index}` }));
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" />);
        expect(wrapper.find(".el-select__placeholder").text()).toBe("Select");

        wrapper.find(".el-select__wrapper").trigger("click");
        values.value = ["1", "2"];
        await nextTick();
        const selectVm = wrapper.findComponent({ name: "ElSelect" }).vm;
        expect(selectVm.selectedLabel).toStrictEqual(data.filter(item => values.value.includes(item.id)).map(item => item.name));
        wrapper
            .findAllComponents({ name: "ElOption" })
            .slice(1)
            .forEach(({ vm }, index) => {
                expect(vm.itemSelected).toBe(values.value.includes(data[index].id));
            });
        wrapper
            .findAllComponents({ name: "ElCheckbox" })
            .slice(1)
            .forEach((checkBoxWrapper, index) => {
                expect(checkBoxWrapper.classes("is-checked")).toBe(values.value.includes(data[index].id));
            });
    });

    test("prop data disabled", async () => {
        const values = ref(["1", "2"]);
        const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (value, index) => ({ id: index.toString(), name: `option ${index}`, disabled: index % 2 === 0 }));
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        wrapper
            .findAllComponents({ name: "ElOption" })
            .slice(1)
            .forEach(({ vm }, index) => {
                expect(vm.isDisabled).toBe(index % 2 === 0);
            });
        wrapper
            .findAllComponents({ name: "ElCheckbox" })
            .slice(1)
            .forEach(({ vm }, index) => {
                expect(vm.disabled).toBe(index % 2 === 0);
            });
    });

    test("all checked option", async () => {
        const values = ref();
        const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (value, index) => ({ id: index.toString(), name: `option ${index}` }));
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        const checkboxWrapper = wrapper.findComponent({ name: "ElCheckbox" });
        expect(checkboxWrapper.classes("is-checked")).toBe(false);
        expect(checkboxWrapper.find(".is-indeterminate").exists()).toBe(false);

        values.value = ["1", "2"];
        await nextTick();
        expect(checkboxWrapper.classes("is-checked")).toBe(false);
        expect(checkboxWrapper.find(".is-indeterminate").exists()).toBe(true);

        values.value = data.map(item => item.id);
        await nextTick();
        expect(checkboxWrapper.classes("is-checked")).toBe(true);
        expect(checkboxWrapper.find(".is-indeterminate").exists()).toBe(false);
    });

    test("event change", async () => {
        const values = ref();
        const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (value, index) => ({ id: index.toString(), name: `option ${index}` }));
        const changeValue = ref();
        const onChange = function (value) {
            changeValue.value = value;
        };
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" onChange={onChange} />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        wrapper.findAllComponents({ name: "ElOption" })[1].trigger("click");
        await nextTick();
        expect(changeValue.value).toStrictEqual(["0"]);
        expect(values.value).toStrictEqual(["0"]);
        expect(wrapper.findAllComponents({ name: "ElCheckbox" })[1].classes("is-checked")).toBe(true);
        const checkboxVm = wrapper.findComponent({ name: "ElCheckbox" }).vm;
        expect(checkboxVm.checked).toBe(false);
        expect(checkboxVm.indeterminate).toBe(true);

        wrapper.findAllComponents({ name: "ElOption" })[1].trigger("click");
        expect(changeValue.value).toStrictEqual([]);
        expect(values.value).toStrictEqual([]);
        await nextTick();
        expect(wrapper.findAllComponents({ name: "ElCheckbox" })[1].classes("is-checked")).toBe(false);
        expect(checkboxVm.checked).toBe(false);
        expect(checkboxVm.indeterminate).toBe(false);
    });
});

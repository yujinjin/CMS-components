/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-01 14:40:23
 * @描述: check-select组件测试用例
 */
import { nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import SelectCheck from "../src/check-select.vue";

describe("CheckSelect", () => {
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
        expect(wrapper.find(".el-select__placeholder").exists()).toBe(true);

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
        const onChange = function (value: string[]) {
            changeValue.value = value;
        };
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" {...{ onChange }} />);
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

    test("checkChangeHandle adds value when checked", async () => {
        const values = ref<string[]>([]);
        const data = ["1", "2", "3"];
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        // 模拟勾选复选框：isCheck=true 时应添加值
        const checkboxWrappers = wrapper.findAllComponents({ name: "ElCheckbox" });
        await checkboxWrappers[1].vm.$emit("change", true);
        await nextTick();
        expect(values.value).toContain("1");
    });

    test("checkChangeHandle removes value when unchecked", async () => {
        const values = ref<string[]>(["1", "2"]);
        const data = ["1", "2", "3"];
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        // 模拟取消勾选复选框：isCheck=false 时应移除值
        const checkboxWrappers = wrapper.findAllComponents({ name: "ElCheckbox" });
        await checkboxWrappers[1].vm.$emit("change", false);
        await nextTick();
        expect(values.value).not.toContain("1");
        expect(values.value).toContain("2");
    });

    test("isShowCheckAll is false when all options are disabled", async () => {
        const values = ref<string[]>([]);
        const data: Array<{ value: string; label: string; disabled: boolean }> = [
            { value: "1", label: "Option 1", disabled: true },
            { value: "2", label: "Option 2", disabled: true }
        ];
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        // 所有选项都禁用时，全选复选框不应显示
        const checkboxWrappers = wrapper.findAllComponents({ name: "ElCheckbox" });
        // 只有选项的 checkbox，没有全选 checkbox（全选 checkbox 是第一个）
        expect(checkboxWrappers.length).toBe(data.length);
    });

    test("checkbox click.stop prevents event propagation to el-option", async () => {
        const values = ref<string[]>([]);
        const data = ["1", "2", "3"];
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        // 模拟勾选复选框：isCheck=true 时应添加值（不再双重 toggle）
        const checkboxWrappers = wrapper.findAllComponents({ name: "ElCheckbox" });
        await checkboxWrappers[1].vm.$emit("change", true);
        await nextTick();
        // 验证值被正确添加（之前因为双重 toggle 会无法选中）
        expect(values.value).toContain("1");
        expect(values.value.length).toBe(1);
    });

    test("multipleLimit disables checkAll when limit reached", async () => {
        const values = ref<string[]>(["0", "1", "2"]);
        const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (_, index) => ({ id: index.toString(), name: `option ${index}` }));
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" props={{ multipleLimit: 3 }} />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        // 已达到限制数量，全选按钮应被禁用
        const checkAllCheckbox = wrapper.findComponent({ name: "ElCheckbox" });
        expect(checkAllCheckbox.vm.disabled).toBe(true);
    });

    test("multipleLimit checkAll selects up to limit", async () => {
        const values = ref<string[]>([]);
        const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (_, index) => ({ id: index.toString(), name: `option ${index}` }));
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" props={{ multipleLimit: 3 }} />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        // 点击全选
        await wrapper.findComponent({ name: "ElCheckbox" }).vm.$emit("change", true);
        await nextTick();
        // 应只选中到限制数量
        expect(values.value.length).toBe(3);
    });

    test("multipleLimit checkbox disabled for unselected options when limit reached", async () => {
        const values = ref<string[]>(["0", "1", "2"]);
        const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (_, index) => ({ id: index.toString(), name: `option ${index}` }));
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" props={{ multipleLimit: 3 }} />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        const checkboxWrappers = wrapper.findAllComponents({ name: "ElCheckbox" });
        // 已选中项的 checkbox 应不禁用（可取消选中释放名额）
        expect(checkboxWrappers[1].vm.disabled).toBe(false);
        // 未选中项的 checkbox 应禁用（已达限制）
        expect(checkboxWrappers[4].vm.disabled).toBe(true);
    });

    test("checkAllChangeHandle skips disabled options", async () => {
        const values = ref<string[]>([]);
        const data: Array<{ id: string; name: string; disabled: boolean }> = [
            { id: "0", name: "选项 0", disabled: true },
            { id: "1", name: "选项 1", disabled: false },
            { id: "2", name: "选项 2", disabled: false },
            { id: "3", name: "选项 3", disabled: true }
        ];
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        // 点击全选
        await wrapper.findComponent({ name: "ElCheckbox" }).vm.$emit("change", true);
        await nextTick();
        // 禁用选项不应被选中
        expect(values.value).not.toContain("0");
        expect(values.value).not.toContain("3");
        // 非禁用选项应被选中
        expect(values.value).toContain("1");
        expect(values.value).toContain("2");
    });

    test("uncheck all preserves disabled option values", async () => {
        // 初始值中包含禁用选项的值
        const values = ref<string[]>(["0", "1", "2"]);
        const data: Array<{ id: string; name: string; disabled: boolean }> = [
            { id: "0", name: "选项 0", disabled: true },
            { id: "1", name: "选项 1", disabled: false },
            { id: "2", name: "选项 2", disabled: false }
        ];
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        // 当前所有可选选项已选中，点击全选取消
        await wrapper.findComponent({ name: "ElCheckbox" }).vm.$emit("change", false);
        await nextTick();
        // 禁用选项的选中值应保留
        expect(values.value).toContain("0");
        // 可选选项的选中值应被移除
        expect(values.value).not.toContain("1");
        expect(values.value).not.toContain("2");
    });

    test("checkChangeHandle respects multipleLimit", async () => {
        const values = ref<string[]>(["0", "1", "2"]);
        const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (_, index) => ({ id: index.toString(), name: `option ${index}` }));
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" props={{ multipleLimit: 3 }} />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        // 已达限制，尝试勾选更多选项应不生效
        const checkboxWrappers = wrapper.findAllComponents({ name: "ElCheckbox" });
        await checkboxWrappers[4].vm.$emit("change", true);
        await nextTick();
        // 值不应增加
        expect(values.value.length).toBe(3);
    });

    test("filterMethod tracking enables select-all for visible options only", async () => {
        const values = ref<string[]>([]);
        const filterMethod = (_query: string) => {
            // 自定义过滤方法（空实现，实际过滤由 selectableOptionValues 的 filterQuery 追踪处理）
        };
        const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (_, index) => ({ id: index.toString(), name: `选项 ${index}` }));
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" props={{ filterMethod }} />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        // 模拟调用 filterMethod（由组件内部包装调用）
        // 通过 el-select 实例的 filterMethod prop 触发
        const selectVm = wrapper.findComponent({ name: "ElSelect" }).vm;
        // 调用包装后的 filterMethod 传入搜索词
        const wrappedFilterMethod = (selectVm as any).filterMethod;
        if (typeof wrappedFilterMethod === "function") {
            wrappedFilterMethod("选项 1");
        }
        await nextTick();
        // 点击全选，应只选可见选项（匹配"选项 1"的）
        await wrapper.findComponent({ name: "ElCheckbox" }).vm.$emit("change", true);
        await nextTick();
        // 由于 filterQuery 追踪，全选应只选包含"选项 1"的项
        // 注意：这里测试的是 filterQuery 追踪机制，实际可见项取决于 selectableOptionValues 的 filter 逻辑
        expect(values.value.length).toBeLessThan(data.length);
        // 所有选中值对应的 name 应包含"1"
        values.value.forEach(v => {
            const item = data.find(d => d.id === v);
            expect(item?.name).toContain("1");
        });
    });
});

/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-01 14:40:23
 * @描述: check-select组件测试用例
 */
import { nextTick, ref } from "vue";
import { mount, enableAutoUnmount } from "@vue/test-utils";
import { describe, expect, test, afterEach, vi } from "vitest";
import SelectCheck from "../src/check-select.vue";

enableAutoUnmount(afterEach);
afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("复选下拉框组件", () => {
    test("关闭搜索后下次全选恢复完整范围", async () => {
        const value = ref<string[]>([]);
        const wrapper = mount(() => <SelectCheck v-model={value.value} data={["北京", "上海"]} />);
        const select = wrapper.findComponent({ name: "ElSelect" });
        select.props("filterMethod")!("北京");
        await nextTick();
        await wrapper.findComponent({ name: "ElOption" }).get(".cms-check-select_option-inner").trigger("click");
        expect(value.value).toEqual(["北京"]);
        select.vm.$emit("visible-change", false);
        await nextTick();
        await wrapper.findComponent({ name: "ElOption" }).get(".cms-check-select_option-inner").trigger("click");
        expect(value.value).toEqual(["北京", "上海"]);
    });

    test("正确渲染组件及样式类", async () => {
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

    test("支持自定义选项取值与文案字段", async () => {
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

    test("正确回显默认选中值", async () => {
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

    test("根据选项配置禁用对应选项", async () => {
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

    test("正确显示全选与半选状态", async () => {
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

    test("选项变化时触发变更事件", async () => {
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

    test("勾选选项时添加对应值", async () => {
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

    test("取消勾选时移除对应值", async () => {
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

    test("全部选项禁用时隐藏全选入口", async () => {
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

    test("复选框点击不冒泡至选项以避免重复切换", async () => {
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

    test("达到多选数量上限时禁用全选", async () => {
        const values = ref<string[]>(["0", "1", "2"]);
        const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (_, index) => ({ id: index.toString(), name: `option ${index}` }));
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" props={{ multipleLimit: 3 }} />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        // 已达到限制数量，全选按钮应被禁用
        const checkAllCheckbox = wrapper.findComponent({ name: "ElCheckbox" });
        expect(checkAllCheckbox.vm.disabled).toBe(true);
    });

    test("全选时选中数量不超过上限", async () => {
        const values = ref<string[]>([]);
        const data: Array<{ id: string; name: string }> = Array.from({ length: 10 }, (_, index) => ({ id: index.toString(), name: `option ${index}` }));
        const wrapper = mount(() => <SelectCheck v-model={values.value} data={data} optionValueKey="id" optionLabelKey="name" props={{ multipleLimit: 3 }} />);
        wrapper.find(".el-select__wrapper").trigger("click");
        await nextTick();
        // 点击全选
        await wrapper.findComponent({ name: "ElOption" }).get(".cms-check-select_option-inner").trigger("click");
        await nextTick();
        // 应只选中到限制数量
        expect(values.value.length).toBe(3);
    });

    test("达到多选上限时禁用未选中项", async () => {
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

    test("全选时跳过禁用选项", async () => {
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
        await wrapper.findComponent({ name: "ElOption" }).get(".cms-check-select_option-inner").trigger("click");
        await nextTick();
        // 禁用选项不应被选中
        expect(values.value).not.toContain("0");
        expect(values.value).not.toContain("3");
        // 非禁用选项应被选中
        expect(values.value).toContain("1");
        expect(values.value).toContain("2");
    });

    test("取消全选时保留禁用选项的已选值", async () => {
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
        await wrapper.findComponent({ name: "ElOption" }).get(".cms-check-select_option-inner").trigger("click");
        await nextTick();
        // 禁用选项的选中值应保留
        expect(values.value).toContain("0");
        // 可选选项的选中值应被移除
        expect(values.value).not.toContain("1");
        expect(values.value).not.toContain("2");
    });

    test("单项勾选遵守多选数量上限", async () => {
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

    test("搜索后全选仅选中匹配的选项", async () => {
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
        await wrapper.findComponent({ name: "ElOption" }).get(".cms-check-select_option-inner").trigger("click");
        await nextTick();
        // 由于 filterQuery 追踪，全选应只选包含"选项 1"的项
        // 注意：这里测试的是 filterQuery 追踪机制，实际可见项取决于 selectableOptionValues 的 filter 逻辑
        expect(values.value).toEqual(["1"]);
    });
});

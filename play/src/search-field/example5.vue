<!--
 * @创建者: yujinjin-jk
 * @创建时间: 2026-06-11
 * @最后修改作者: yujinjin-jk
 * @最后修改时间: 2026-06-11
 * @描述: search-field 组件 - 自定义插槽与 optionKey 示例
-->
<template>
    <div class="example-page">
        <!-- 自定义插槽 -->
        <section class="demo-section">
            <h3>slot 自定义插槽</h3>
            <p class="demo-desc">通过 slot 属性启用自定义内容渲染</p>
            <div class="demo-block">
                <span class="field-label">slot="customSearch"：</span>
                <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
                <search-field slot="customSearch" v-model="customValue">
                    <template #customSearch>
                        <el-input v-model="customValue" placeholder="自定义搜索输入" clearable>
                            <template #append>
                                <el-button :icon="Search" />
                            </template>
                        </el-input>
                    </template>
                </search-field>
            </div>
        </section>

        <!-- 自定义 optionKey -->
        <section class="demo-section">
            <h3>自定义 optionValueKey / optionLabelKey</h3>
            <p class="demo-desc">当数据对象的键名不是默认的 value/label 时，可通过 optionValueKey 和 optionLabelKey 指定</p>
            <div class="demo-block">
                <span class="field-label">select（id/name）：</span>
                <search-field v-model="selectValue" type="select" :data="customKeyData" option-value-key="id" option-label-key="name" placeholder="请选择" />
            </div>
            <div class="demo-block">
                <span class="field-label">checkSelect（code/text）：</span>
                <search-field v-model="checkSelectValue" type="checkSelect" :data="codeTextData" option-value-key="code" option-label-key="text" placeholder="请选择" />
            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { SearchField } from "@yujinjin/cms-components-main/index";

const customValue = ref("");
const selectValue = ref("");
const checkSelectValue = ref<string[]>([]);

const customKeyData = [
    { id: "A001", name: "北京" },
    { id: "A002", name: "上海" },
    { id: "A003", name: "广州" },
    { id: "A004", name: "深圳" }
];

const codeTextData = [
    { code: "active", text: "激活" },
    { code: "inactive", text: "未激活" },
    { code: "pending", text: "待审核" }
];
</script>
<style lang="scss" scoped>
.demo-block {
    display: flex;
    align-items: center;
    gap: 12px;

    .field-label {
        min-width: 120px;
        font-size: 14px;
        color: #606266;
    }
}
</style>

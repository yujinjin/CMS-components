<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-30 10:16:17
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-02 09:35:43
 * @项目的路径: \CMS-components\packages\components\data-table\src\table-column-number.vue
 * @描述: 数字数据列
-->
<template>
    <div class="table-column-number">{{ numberText }}</div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { numberFormat } from "@yujinjin/utils";

defineOptions({
    name: "TableColumnNumber"
});

const props = defineProps({
    // 日期值
    value: {
        type: [String, Number],
        default: null
    },
    // 日期格式化字符串
    digit: {
        type: Number,
        default: 0
    }
});

const numberText = computed(() => {
    if (props.value === null || props.value === undefined || String(props.value).trim() === "") {
        return "-";
    }
    return numberFormat(props.value, props.digit);
});
</script>

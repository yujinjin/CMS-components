<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-30 09:51:01
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 17:13:23
 * @项目的路径: \CMS-components\packages\components\data-table\src\table-column-date.vue
 * @描述: 日期格式化数据列
-->
<template>
    <div class="cms-table-column-date">{{ dateText }}</div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { dateFormat } from "@yujinjin/utils";

defineOptions({
    name: "TableColumnDate"
});

const props = defineProps({
    // 日期值
    value: {
        type: [String, Number, Array],
        default: null
    },
    // 日期格式化字符串
    formate: {
        type: String,
        default: "YYYY-MM-DD"
    },
    // 分隔符，value是数组时时用到
    separator: {
        type: String,
        default: " ~ "
    }
});

const dateText = computed(() => {
    if (!props.value) {
        return "-";
    }
    if (Array.isArray(props.value)) {
        if (props.value.length === 0) {
            return "-";
        }
        return props.value.map(item => (item ? dateFormat(item as string | number, props.formate) : "")).join(props.separator);
    }
    return dateFormat(props.value as string | number, props.formate);
});
</script>

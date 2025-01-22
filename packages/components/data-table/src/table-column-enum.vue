<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-30 10:09:59
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 17:13:59
 * @项目的路径: \CMS-components\packages\components\data-table\src\table-column-enum.vue
 * @描述: 枚举数据列
-->
<template>
    <div class="cms-table-column-enum">{{ enumText }}</div>
</template>
<script setup lang="ts">
import { type PropType, computed } from "vue";

defineOptions({
    name: "TableColumnEnum"
});

const props = defineProps({
    value: {
        type: [String, Number, Boolean],
        default: null
    },
    data: {
        type: Array as PropType<Record<string, any>[]>,
        default: function () {
            return [];
        },
        required: true
    },
    // 分隔符，value值用','隔开时
    separator: {
        type: String,
        default: ","
    },
    valueKey: {
        type: String,
        default: "value"
    },
    textKey: {
        type: String,
        default: "label"
    }
});

const enumText = computed(() => {
    if (typeof props.value === "number" || typeof props.value === "boolean") {
        const findItem = props.data.find(dateItem => dateItem[props.valueKey] === props.value);
        return findItem ? findItem[props.textKey] : props.value;
    }
    if (!props.value) {
        return "-";
    }
    return props.value
        .split(props.separator)
        .map(item => {
            if (!item) {
                return "";
            }
            const findItem = props.data.find(dateItem => dateItem[props.valueKey] === item || dateItem[props.valueKey] === parseInt(item, 10));
            if (findItem) {
                return findItem[props.textKey];
            }
            return item;
        })
        .join(props.separator);
});
</script>

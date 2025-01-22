<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-30 10:11:12
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 17:15:17
 * @项目的路径: \CMS-components\packages\components\data-table\src\table-column-image.vue
 * @描述: 图片数据列
-->
<template>
    <div class="cms-table-column-img">
        <div v-if="!previewImgList || previewImgList.length === 0" class="no-image">没有图片</div>
        <template v-else>
            <el-image
                v-for="(img, index) in previewImgList"
                :key="img + '_' + index"
                :src="img"
                :initial-index="initialIndex"
                :preview-src-list="previewImgList"
                fit="contain"
                :preview-teleported="true"
                @click="initialIndex = index"
            >
                <template #error>
                    <div class="error-box">
                        <el-icon><Picture /></el-icon>
                    </div>
                </template>
            </el-image>
        </template>
    </div>
</template>
<script setup lang="ts">
import { type PropType, ref, computed } from "vue";
import { ElImage, ElIcon } from "element-plus";
import { Picture } from "@element-plus/icons-vue";

defineOptions({
    name: "TableColumnImgage"
});

// TODO: 支持SVGA 图片格式
const props = defineProps({
    value: {
        type: [String, Array] as PropType<string | Array<string>>,
        default: null
    },
    // value 是string,分隔符传值才有效
    separator: {
        type: String,
        default: null
    }
});

// 图片预览列表
const previewImgList = computed<string[]>(() => {
    if (!props.value) return [];
    if (Array.isArray(props.value)) {
        return props.value;
    }
    return props.separator ? props.value.split(props.separator) : [props.value];
});

// 初始预览图像索引
const initialIndex = ref(0);
</script>

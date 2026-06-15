<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-20 14:55:48
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-02-21 10:54:16
 * @项目的路径: \CMS-components\packages\components\web-editor\src\web-editor.vue
 * @描述: web-editor 富文本框
-->
<template>
    <div class="cms-web-editor-container">
        <div ref="webEditorRef" class="web-editor">
            <p v-if="!isBrowser">当前环境不支持</p>
        </div>
        <input v-show="false" ref="inputFileRef" type="file" accept="image/*" @change="imgFileChangeHandle" />
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, inject, computed, type Ref } from "vue";
import { type FormItemContext, type FormContext, formItemContextKey, formContextKey } from "element-plus";
import Quill from "quill";
import { debounce } from "@yujinjin/utils";
import { webEditorProps, webEditorEmits } from "./web-editor";

defineOptions({
    name: "WebEditor"
});

defineSlots<{
    default(): any;
}>();

const props = defineProps(webEditorProps);

const emits = defineEmits(webEditorEmits);

// web 编辑器ref
const webEditorRef: Ref<HTMLElement | null> = ref(null);

// inputFile ref
const inputFileRef: Ref<HTMLInputElement | null> = ref(null);

// 当前elForm实例
const elForm = inject(formContextKey, {} as FormContext);

// 当前elFormItem实例
const elFormItem = inject(formItemContextKey, {} as FormItemContext);

const isBrowser = computed(() => typeof window !== "undefined");

// quill富文本框编辑器实例
let quillInstance: Quill | null = null;

// 默认工具栏配置
const defaultToolbar = ["bold", "italic", "underline", { header: 1 }, { header: 2 }, "blockquote", "code-block", "code", "link", { list: "ordered" }, { list: "bullet" }, "image", ["clean"]];

// 输入内容变化操作
const textChangeHandle = debounce(() => {
    if (!quillInstance) {
        return;
    }
    // Quill 的 text-change 触发频率很高，防抖后再同步 v-model 和表单校验。
    emits("update:modelValue", quillInstance.getSemanticHTML());
    elFormItem?.validate?.("change");
}, 300);

// 图片文件选择变化
const imgFileChangeHandle = async function (e: Event) {
    if (!props.onImgUpload || !quillInstance) {
        return;
    }
    const files = (e.target as HTMLInputElement).files;
    if (!files || files.length === 0) {
        return;
    }
    const img = (await props.onImgUpload(files[0])) as string;
    // 图片上传成功之后的回调
    let range = quillInstance.getSelection();
    if (!range) {
        // 上传文件会让焦点离开编辑器，必要时恢复焦点后再获取插入位置。
        quillInstance.focus();
        range = quillInstance.getSelection();
    }
    if (range) {
        quillInstance.insertEmbed(range.index, "image", img); // 将上传好的图片，插入到富文本的range.index（当前光标处）
    }
};

// 初始化quill
const initQuill = function () {
    if (!webEditorRef.value) {
        return;
    }
    quillInstance = new Quill(webEditorRef.value, {
        modules: {
            toolbar: {
                container: props.toolbar || defaultToolbar,
                handlers: {
                    // 只有传入 onImgUpload 时才拦截图片按钮，否则保留 Quill 默认行为。
                    image: props.onImgUpload ? () => inputFileRef.value?.click() : undefined
                }
            }
        },
        theme: "snow",
        readOnly: props.disabled === true || (elForm?.disabled === true && props.disabled !== false),
        placeholder: "输入内容..."
    });
    if (props.modelValue) {
        // 用 clipboard.convert 让外部 HTML 进入 Quill 的 Delta 模型，避免直接写 innerHTML 破坏编辑器状态。
        quillInstance.setContents(quillInstance.clipboard.convert({ html: props.modelValue }));
    }
    quillInstance.on("text-change", function () {
        textChangeHandle();
    });
};

// 销毁 Quill 实例，防止内存泄漏
const destroyQuill = function () {
    if (quillInstance) {
        quillInstance.off("text-change");
        // Quill 没有提供 destroy 方法，但需要清除事件监听和引用
        quillInstance = null;
    }
};

watch(
    () => props.modelValue,
    value => {
        if (!quillInstance || value === quillInstance.getSemanticHTML()) return;
        // 外部 v-model 变化时同步到编辑器；相同 HTML 跳过，避免与 text-change 形成回写循环。
        quillInstance.setContents(quillInstance.clipboard.convert({ html: props.modelValue }));
    }
);

watch(
    () => props.disabled === true || (elForm?.disabled === true && props.disabled !== false),
    value => {
        if (!quillInstance) return;
        quillInstance.enable(!value);
    }
);

onMounted(() => {
    if (isBrowser.value) {
        initQuill();
    }
});

onUnmounted(() => {
    destroyQuill();
});
</script>

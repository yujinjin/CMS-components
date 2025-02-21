<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-12-20 14:55:48
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 17:40:42
 * @项目的路径: \CMS-components\packages\components\web-editor\src\web-editor.vue
 * @描述: web-editor 富文本框
 *  由于docs:build模式情况下，web-editor依赖的quill插件使用了document对象，在Node.js 环境构建会提示：“ReferenceError: document is not defined”问题。
 *  这里只能折中一下使用动态导入 quill的方式。
 *  本来是打算web-editor全写成动态导入 quill的方式，但这种情况下不支持umd build了，提示错误：Error: UMD and IIFE output formats are not supported for code-splitting builds。
 *  所以不得已采取了两者并存的方案来解决。
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
import { onMounted, ref, watch, inject, computed, type Ref } from "vue";
import { type FormItemContext, type FormContext, formItemContextKey, formContextKey } from "element-plus";
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
const webEditorRef = ref(null);

// inputFile ref
const inputFileRef: Ref<HTMLInputElement | null> = ref(null);

// 当前elForm实例
const elForm = inject(formContextKey, {} as FormContext);

// 当前elFormItem实例
const elFormItem = inject(formItemContextKey, {} as FormItemContext);

const isBrowser = computed(() => typeof window !== "undefined");

// quill富文本框编辑器实例
let quillInstance;

// 输入内容变化操作
const textChangeHandle = debounce(() => {
    emits("update:modelValue", quillInstance.getSemanticHTML());
    elFormItem?.validate?.("change", quillInstance.getSemanticHTML());
}, 300);

// 图片文件选择变化
const imgFileChangeHandle = async function (e) {
    const img = (await props.onImgUpload!(e.target.files[0])) as string;
    //图片上传成功之后的回调
    let range = quillInstance.getSelection();
    if (!range) {
        quillInstance.focus();
        range = quillInstance.getSelection();
    }
    quillInstance.insertEmbed(range.index, "image", img); //将上传好的图片，插入到富文本的range.index（当前光标处）
};

// 初始化quill
const initQuill = async function () {
    const Quill = (await import("quill")).default;
    quillInstance = new Quill!(webEditorRef.value!, {
        modules: {
            toolbar: {
                container: ["bold", "italic", "underline", { header: 1 }, { header: 2 }, "blockquote", "code-block", "code", "link", { list: "ordered" }, { list: "bullet" }, "image", ["clean"]],
                handlers: {
                    image: props.onImgUpload ? () => inputFileRef.value!.click() : undefined
                }
            }
        },
        theme: "snow",
        readOnly: props.disabled === true || (elForm?.disabled === true && props.disabled !== false),
        placeholder: "输入内容..."
    });
    if (props.modelValue) {
        // quillInstance.pasteHTML(props.modelValue);
        quillInstance.setContents(quillInstance.clipboard.convert({ html: props.modelValue }));
    }
    // if (elForm?.disabled === true && props.disabled !== false) {
    //     quillInstance.enable(false);
    // }
    quillInstance.on("text-change", function () {
        textChangeHandle();
    });
};

watch(
    () => props.modelValue,
    value => {
        if (!quillInstance || value === quillInstance.getSemanticHTML()) return;
        // quillInstance.pasteHTML(props.modelValue);
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
</script>

<template>
    <div class="web-editor-container">
        <div ref="webEditorRef" class="web-editor"></div>
        <input v-show="false" ref="inputFileRef" type="file" accept="image/*" @change="imgFileChangeHandle" />
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, inject, type Ref } from "vue";
import { type FormItemContext, type FormContext, formItemContextKey, formContextKey } from "element-plus";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { debounce } from "@yujinjin/utils";
import { webEditorProps, webEditorEmits } from "./web-editor";

defineOptions({
    name: "WebEditor"
});

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

// quill富文本框编辑器实例
let quillInstance;

// 输入内容变化操作
const textChangeHandle = debounce(() => {
    emits("update:modelValue", quillInstance.getSemanticHTML());
    elFormItem?.validate?.("change");
}, 300);

// 图片文件选择变化
const imgFileChangeHandle = async function (e) {
    const img = (await props.onImgUpload!({ file: e.target.files[0] })) as string;
    //图片上传成功之后的回调
    let range = quillInstance.getSelection();
    if (!range) {
        quillInstance.focus();
        range = quillInstance.getSelection();
    }
    quillInstance.insertEmbed(range.index, "image", img); //将上传好的图片，插入到富文本的range.index（当前光标处）
};

// 初始化quill
const initQuill = function () {
    quillInstance = new Quill(webEditorRef.value!, {
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
    initQuill();
});
</script>
<style lang="less" scoped>
.web-editor-container {
    width: 100%;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    position: relative;

    .web-editor {
        width: 100%;
        flex: 1;
    }

    .ql-toolbar.ql-snow {
        width: 100%;
    }
}
</style>

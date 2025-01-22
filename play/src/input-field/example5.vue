<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:42:21
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 21:02:16
 * @项目的路径: \CMS-components\play\src\input-field\example5.vue
 * @描述: input-field组件的其他一些类型等示例
-->
<template>
    <div class="example-page">
        <h3>其他一些类型等</h3>
        <div class="demo-block">
            <input-field v-model="value1" type="label" />
            <input-field v-model="value2" type="colorPicker" />
            <input-field v-model="value3" type="cascader" :options="options" placeholder="请输入" />
            <input-field v-model="value4" type="switch" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { InputField } from "@yujinjin/cms-components/index";

const value1 = ref("label标签");
const value2 = ref("");
const value3 = ref("");
const value4 = ref();

const options = ref([
    {
        value: "guide",
        label: "Guide",
        children: [
            {
                value: "disciplines",
                label: "Disciplines",
                children: [
                    {
                        value: "consistency",
                        label: "Consistency"
                    },
                    {
                        value: "feedback",
                        label: "Feedback"
                    },
                    {
                        value: "efficiency",
                        label: "Efficiency"
                    },
                    {
                        value: "controllability",
                        label: "Controllability"
                    }
                ]
            },
            {
                value: "navigation",
                label: "Navigation",
                children: [
                    {
                        value: "side nav",
                        label: "Side Navigation"
                    },
                    {
                        value: "top nav",
                        label: "Top Navigation"
                    }
                ]
            }
        ]
    },
    {
        value: "component",
        label: "Component",
        children: [
            {
                value: "basic",
                label: "Basic",
                children: [
                    {
                        value: "layout",
                        label: "Layout"
                    },
                    {
                        value: "color",
                        label: "Color"
                    },
                    {
                        value: "typography",
                        label: "Typography"
                    },
                    {
                        value: "icon",
                        label: "Icon"
                    },
                    {
                        value: "button",
                        label: "Button"
                    }
                ]
            },
            {
                value: "form",
                label: "Form",
                children: [
                    {
                        value: "radio",
                        label: "Radio"
                    },
                    {
                        value: "checkbox",
                        label: "Checkbox"
                    },
                    {
                        value: "input",
                        label: "Input"
                    },
                    {
                        value: "input-number",
                        label: "InputNumber"
                    },
                    {
                        value: "select",
                        label: "Select"
                    },
                    {
                        value: "cascader",
                        label: "Cascader"
                    },
                    {
                        value: "switch",
                        label: "Switch"
                    },
                    {
                        value: "slider",
                        label: "Slider"
                    },
                    {
                        value: "time-picker",
                        label: "TimePicker"
                    },
                    {
                        value: "date-picker",
                        label: "DatePicker"
                    },
                    {
                        value: "datetime-picker",
                        label: "DateTimePicker"
                    },
                    {
                        value: "upload",
                        label: "Upload"
                    },
                    {
                        value: "rate",
                        label: "Rate"
                    },
                    {
                        value: "form",
                        label: "Form"
                    }
                ]
            },
            {
                value: "data",
                label: "Data",
                children: [
                    {
                        value: "table",
                        label: "Table"
                    },
                    {
                        value: "tag",
                        label: "Tag"
                    },
                    {
                        value: "progress",
                        label: "Progress"
                    },
                    {
                        value: "tree",
                        label: "Tree"
                    },
                    {
                        value: "pagination",
                        label: "Pagination"
                    },
                    {
                        value: "badge",
                        label: "Badge"
                    }
                ]
            },
            {
                value: "notice",
                label: "Notice",
                children: [
                    {
                        value: "alert",
                        label: "Alert"
                    },
                    {
                        value: "loading",
                        label: "Loading"
                    },
                    {
                        value: "message",
                        label: "Message"
                    },
                    {
                        value: "message-box",
                        label: "MessageBox"
                    },
                    {
                        value: "notification",
                        label: "Notification"
                    }
                ]
            },
            {
                value: "navigation",
                label: "Navigation",
                children: [
                    {
                        value: "menu",
                        label: "Menu"
                    },
                    {
                        value: "tabs",
                        label: "Tabs"
                    },
                    {
                        value: "breadcrumb",
                        label: "Breadcrumb"
                    },
                    {
                        value: "dropdown",
                        label: "Dropdown"
                    },
                    {
                        value: "steps",
                        label: "Steps"
                    }
                ]
            },
            {
                value: "others",
                label: "Others",
                children: [
                    {
                        value: "dialog",
                        label: "Dialog"
                    },
                    {
                        value: "tooltip",
                        label: "Tooltip"
                    },
                    {
                        value: "popover",
                        label: "Popover"
                    },
                    {
                        value: "card",
                        label: "Card"
                    },
                    {
                        value: "carousel",
                        label: "Carousel"
                    },
                    {
                        value: "collapse",
                        label: "Collapse"
                    }
                ]
            }
        ]
    },
    {
        value: "resource",
        label: "Resource",
        children: [
            {
                value: "axure",
                label: "Axure Components"
            },
            {
                value: "sketch",
                label: "Sketch Templates"
            },
            {
                value: "docs",
                label: "Design Documentation"
            }
        ]
    }
]);
</script>
<style lang="scss" scoped>
.example-page {
    padding: 12px;
}
.demo-block {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>

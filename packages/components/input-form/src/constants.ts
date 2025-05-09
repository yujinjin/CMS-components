/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-06 10:20:51
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-06 10:22:22
 * @项目的路径: \CMS-components\packages\components\input-form\src\constants.ts
 * @描述: input-form组件常量集合
 */
// 数据输入表单中的组件默认属性
export const INPUT_FORM_FIELD_DEFAULT_ATTRIBUTES = {
    // input 输入框默认配置选项(具体见element plus Input 输入框文档)
    input: {
        placeholder: "请输入",
        clearable: true
    },
    // autocomplete 自动补全输入框默认配置选项(具体见element plus Autodcomplete 输入框文档)
    autocomplete: {
        placeholder: "请输入",
        clearable: true
    },
    // select 选择器默认配置选项（具体见element plus Select 选择器文档）
    select: {
        clearable: true,
        collapseTags: true,
        collapseTagsTooltip: true,
        filterable: true,
        placeholder: "请选择"
    },
    // Cascader 级联选择器默认配置选项（具体见element plus Cascader 选择器文档）
    cascader: {
        clearable: true,
        collapseTags: true,
        filterable: true,
        placeholder: "请选择"
    },
    // Checkbox 多选框默认配置选项（具体见element plus Checkbox 文档）
    checkbox: {},
    // Radio 单选框默认配置选项（具体见element plus Radio文档）
    radio: {},
    // ColorPicker 颜色选择器默认配置选项（具体见element plus ColorPicker 文档）
    colorPicker: {},
    // date-picker 日期时间选择器（具体见element plus date-picker文档）
    datePicker: {
        //year/month/date/dates/datetime/week/datetimerange/daterange/monthrange
        year: {
            type: "year",
            placeholder: "请选择"
        },
        month: {
            type: "month",
            placeholder: "请选择",
            valueFormat: "YYYY-MM"
        },
        date: {
            type: "date",
            placeholder: "请选择",
            valueFormat: "YYYY-MM-DD",
            disabledDate: function (time) {
                return time.getTime() > Date.now();
            }
        },
        dates: {
            type: "dates",
            placeholder: "请选择一个或者多个日期",
            valueFormat: "YYYY-MM-DD"
        },
        datetime: {
            type: "datetime",
            placeholder: "请选择日期和时间",
            valueFormat: "YYYY-MM-DD HH:mm:ss"
        },
        week: {
            type: "week",
            placeholder: "请选择",
            format: "[第]ww[周]"
        },
        datetimerange: {
            type: "datetimerange",
            startPlaceholder: "开始日期时间",
            endPlaceholder: "结束日期时间",
            valueFormat: "YYYY-MM-DD HH:mm:ss",
            rangeSeparator: "-"
        },
        daterange: {
            type: "daterange",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
            valueFormat: "YYYY-MM-DD",
            rangeSeparator: " - "
        },
        monthrange: {
            type: "monthrange",
            startPlaceholder: "开始月份",
            endPlaceholder: "结束月份",
            valueFormat: "YYYY-MM",
            rangeSeparator: "-"
        }
    },
    // TimePicker 时间选择器默认配置选项（具体见element plus TimePicker文档）
    timePicker: {
        placeholder: "请选择"
    },
    // TimeSelect 时间选择默认配置选项（具体见element plus TimeSelect文档）
    timeSelect: {
        placeholder: "请选择"
    },
    // Input Number 数字输入框默认配置选项（具体见element plus Input Number文档）
    inputNumber: {
        placeholder: "请输入",
        valueOnClear: null
    },
    // Slider 滑块默认配置选项（具体见element plus Slider文档）
    slider: {},
    // Switch 开关默认配置选项（具体见element plus Switch文档）
    switch: {},
    // 图片上传配置选项
    imgUpload: {},
    // web 富文本框编辑器
    webEditor: {
        style: {
            width: "100%"
        }
    }
};

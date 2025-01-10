/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-07 10:52:30
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-07 11:08:58
 * @项目的路径: \CMS-components\packages\components\search-form\src\constants.ts
 * @描述: search-form组件常量集合
 */
// 查询表单中的组件默认属性
export const SEARCH_FORM_FIELD_DEFAULT_ATTRIBUTES = {
    // input 输入框默认配置选项(具体见element Input 输入框文档)
    input: {
        placeholder: "请输入",
        clearable: true
    },
    // Input Number 数字输入框默认配置选项(具体见element plus Input Number 输入框文档)
    inputNumber: {
        placeholder: "请输入",
        controls: false,
        valueOnClear: null
    },
    // select 选择器默认配置选项（具体见element Select 选择器文档）
    select: {
        clearable: true,
        collapseTags: true,
        filterable: true,
        placeholder: "请选择"
    },
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
    }
};

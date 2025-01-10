/*
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-09-02 10:32:28
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-10 11:30:35
 * @项目的路径: \CMS-components\packages\main\components.ts
 * @描述: 组件列表
 */
import { type Component } from "vue";
import { SvgIcon } from "@yujinjin/cms-components-modules/svg-icon";
import { CheckSelect } from "@yujinjin/cms-components-modules/check-select";
import { ImgUpload } from "@yujinjin/cms-components-modules/img-upload";
import { WebEditor } from "@yujinjin/cms-components-modules/web-editor";
import { InputField } from "@yujinjin/cms-components-modules/input-field";
import { ActionBar } from "@yujinjin/cms-components-modules/action-bar";
import { SearchField } from "@yujinjin/cms-components-modules/search-field";
import { DataTable } from "@yujinjin/cms-components-modules/data-table";
import { InputForm } from "@yujinjin/cms-components-modules/input-form";
import { SearchForm } from "@yujinjin/cms-components-modules/search-form";
import { DialogForm } from "@yujinjin/cms-components-modules/dialog-form";
import { SearchPage } from "@yujinjin/cms-components-modules/search-page";

export default [SvgIcon, CheckSelect, ImgUpload, WebEditor, InputField, SearchField, ActionBar, DataTable, InputForm, SearchForm, DialogForm, SearchPage] as Component[];

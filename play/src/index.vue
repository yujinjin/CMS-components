<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-04 17:14:06
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-21 10:22:31
 * @项目的路径: \CMS-components\play\src\index.vue
 * @描述: 首页
-->
<template>
    <div class="container">
        <div class="menu-bar">
            <el-menu :default-active="menuNameActived" :collapse="isCollapse">
                <template v-for="item in menuDataList" :key="item.name">
                    <el-sub-menu v-if="item.children && item.children.length > 0" :key="item.name" :index="item.name">
                        <template #title>
                            <el-icon><component :is="item.icon" /></el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="childItem in item.children" :key="childItem.name" :index="childItem.name">
                            <router-link :to="childItem.path">{{ childItem.title }}</router-link>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item v-else :index="item.name">
                        <el-icon><component :is="item.icon" /></el-icon>
                        <router-link v-if="item.path" :to="item.path">{{ item.title }}</router-link>
                        <span v-else>{{ item.title }}</span>
                    </el-menu-item>
                </template>
                <!--  -->
            </el-menu>
        </div>
        <div class="main-wrapper">
            <div class="breadcrumb-row">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="item in menuNames" :key="item">{{ item }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" class="page-view" />
                </keep-alive>
            </router-view>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { CircleCheck, Notification, PictureFilled, EditPen, Grid, SetUp, Document, Search, Collection, Memo } from "@element-plus/icons-vue";

const route = useRoute();

const menuDataList = [
    {
        name: "svg-icon",
        title: "svg-icon组件",
        icon: Notification,
        path: "/svg-icon"
    },
    {
        name: "check-select",
        title: "check-select组件",
        icon: CircleCheck,
        children: [
            {
                name: "check-select-example1",
                title: "基础用法",
                path: "/check-select/example1"
            },
            {
                name: "check-select-example2",
                title: "禁用选项",
                path: "/check-select/example2"
            },
            {
                name: "check-select-example3",
                title: "可清空可最多限制",
                path: "/check-select/example3"
            },
            {
                name: "check-select-example4",
                title: "自定义宽度",
                path: "/check-select/example4"
            }
        ]
    },
    {
        name: "img-upload",
        title: "img-upload组件",
        icon: PictureFilled,
        children: [
            {
                name: "img-upload-example1",
                title: "基础用法",
                path: "/img-upload/example1"
            },
            {
                name: "img-upload-example2",
                title: "限制上传数量",
                path: "/img-upload/example2"
            },
            {
                name: "img-upload-example3",
                title: "图片裁剪",
                path: "/img-upload/example3"
            },
            {
                name: "img-upload-example4",
                title: "自定义裁剪参数",
                path: "/img-upload/example4"
            },
            {
                name: "img-upload-example5",
                title: "拖拽排序",
                path: "/img-upload/example5"
            }
        ]
    },
    {
        name: "web-editor",
        title: "web-editor组件",
        icon: Document,
        children: [
            {
                name: "web-editor-example1",
                title: "基础用法",
                path: "/web-editor/example1"
            },
            {
                name: "web-editor-example2",
                title: "自定义高度",
                path: "/web-editor/example2"
            },
            {
                name: "web-editor-example3",
                title: "图片上传",
                path: "/web-editor/example3"
            },
            {
                name: "web-editor-example4",
                title: "只读模式",
                path: "/web-editor/example4"
            }
        ]
    },
    {
        name: "input-field",
        title: "input-field组件",
        icon: EditPen,
        children: [
            {
                name: "input-field-example1",
                title: "基础用法",
                path: "/input-field/example1"
            },
            {
                name: "input-field-example2",
                title: "输入框类型",
                path: "/input-field/example2"
            },
            {
                name: "input-field-example3",
                title: "选择类型",
                path: "/input-field/example3"
            },
            {
                name: "input-field-example4",
                title: "日期时间类型",
                path: "/input-field/example4"
            },
            {
                name: "input-field-example5",
                title: "其他一些类型等",
                path: "/input-field/example5"
            },
            {
                name: "input-field-example6",
                title: "不同尺寸",
                path: "/input-field/example6"
            }
        ]
    },
    {
        name: "search-field",
        title: "search-field组件",
        icon: Search,
        children: [
            {
                name: "search-field-example1",
                title: "基础用法",
                path: "/search-field/example1"
            },
            {
                name: "search-field-example2",
                title: "不同尺寸",
                path: "/search-field/example2"
            },
            {
                name: "search-field-example3",
                title: "不同类型",
                path: "/search-field/example3"
            },
            {
                name: "search-field-example4",
                title: "事件监听",
                path: "/search-field/example4"
            }
        ]
    },
    {
        name: "input-form",
        title: "input-form组件",
        icon: Collection,
        children: [
            {
                name: "input-form-example1",
                title: "基础用法",
                path: "/input-form/example1"
            },
            {
                name: "input-form-example2",
                title: "不同类型的表单项",
                path: "/input-form/example2"
            },
            {
                name: "input-form-example3",
                title: "表单验证",
                path: "/input-form/example3"
            },
            {
                name: "input-form-example4",
                title: "动态表单",
                path: "/input-form/example4"
            },
            {
                name: "input-form-example5",
                title: "联动表单",
                path: "/input-form/example5"
            },
            {
                name: "input-form-example6",
                title: "自定义布局",
                path: "/input-form/example6"
            }
        ]
    },
    {
        name: "search-form",
        title: "search-form组件",
        icon: Collection,
        children: [
            {
                name: "search-form-example1",
                title: "基础用法",
                path: "/search-form/example1"
            },
            {
                name: "search-form-example2",
                title: "展开收起",
                path: "/search-form/example2"
            },
            {
                name: "search-form-example3",
                title: "自定义按钮",
                path: "/search-form/example3"
            },
            {
                name: "search-form-example4",
                title: "自定义表单项",
                path: "/search-form/example4"
            },
            {
                name: "search-form-example5",
                title: "联动搜索",
                path: "/search-form/example5"
            }
        ]
    },
    {
        name: "data-table",
        title: "data-table组件",
        icon: Grid,
        children: [
            {
                name: "data-table-example1",
                title: "基础用法",
                path: "/data-table/example1"
            },
            {
                name: "data-table-example2",
                title: "自定义列类型",
                path: "/data-table/example2"
            },
            {
                name: "data-table-example3",
                title: "表格操作",
                path: "/data-table/example3"
            },
            {
                name: "data-table-example4",
                title: "分页和加载",
                path: "/data-table/example4"
            },
            {
                name: "data-table-example5",
                title: "设置隐藏列",
                path: "/data-table/example5"
            },
            {
                name: "data-table-example6",
                title: "展开行",
                path: "/data-table/example6"
            },
            {
                name: "data-table-example7",
                title: "复杂用例",
                path: "/data-table/example7"
            }
        ]
    },
    {
        name: "action-bar",
        title: "action-bar组件",
        icon: SetUp,
        children: [
            {
                name: "action-bar-example1",
                title: "基础用法",
                path: "/action-bar/example1"
            },
            {
                name: "action-bar-example2",
                title: "自定义图标",
                path: "/action-bar/example2"
            },
            {
                name: "action-bar-example3",
                title: "自定义布局",
                path: "/action-bar/example3"
            }
        ]
    },
    {
        name: "dialog-form",
        title: "dialog-form组件",
        icon: SetUp,
        children: [
            {
                name: "dialog-form-example1",
                title: "基础用法",
                path: "/dialog-form/example1"
            },
            {
                name: "dialog-form-example2",
                title: "编辑模式",
                path: "/dialog-form/example2"
            },
            {
                name: "dialog-form-example3",
                title: "自定义表单验证",
                path: "/dialog-form/example3"
            },
            {
                name: "dialog-form-example4",
                title: "自定义内容和按钮",
                path: "/dialog-form/example4"
            },
            {
                name: "dialog-form-example5",
                title: "分步表单",
                path: "/dialog-form/example5"
            },
            {
                name: "dialog-form-example6",
                title: "动态表单项",
                path: "/dialog-form/example6"
            }
        ]
    },
    {
        name: "search-page",
        title: "search-page组件",
        icon: Memo,
        children: [
            {
                name: "search-page-example1",
                title: "基础用法",
                path: "/search-page/example1"
            },
            {
                name: "search-page-example2",
                title: "自定义工具栏",
                path: "/search-page/example2"
            },
            {
                name: "search-page-example3",
                title: "自定义搜索项",
                path: "/search-page/example3"
            },
            {
                name: "search-page-example4",
                title: "表格操作",
                path: "/search-page/example4"
            },
            {
                name: "search-page-example5",
                title: "自定义布局",
                path: "/search-page/example5"
            }
        ]
    }
];

const isCollapse = ref(false);

const menuNameActived = ref();

watch(
    () => route.name,
    () => {
        menuNameActived.value = route.name;
    },
    {
        once: true
    }
);

const menuNames = computed(() => {
    const routeName = route.name;
    const names: string[] = [];
    menuDataList.find(item => {
        if (item.name === routeName) {
            names.push(item.title);
            return true;
        }
        if (item.children) {
            const child = item.children.find(childItem => childItem.name === routeName);
            if (child) {
                names.push(item.title, child.title);
                return true;
            }
        }
        return false;
    });
    return names;
});
</script>
<style lang="scss">
* {
    box-sizing: border-box;
    outline: none;
    scrollbar-color: #ddd #fafafa;
    scrollbar-track-color: #fafafa;
    scrollbar-width: thin;
}
body {
    margin: 0px;
    padding: 0px;
    overflow-y: hidden;
}
.container {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    min-width: 1350px;
    min-height: 600px;

    .menu-bar {
        width: 224px;
        height: 100%;
        flex-shrink: 0;
        position: relative;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow-y: auto;

        &.collapse {
            width: 58px;
        }

        &::after {
            content: "";
            position: absolute;
            right: 1px;
            top: 0px;
            bottom: 0px;
            width: 1px;
            background-color: #fff;
            box-shadow: 1px 0 0 0 rgba(0, 0, 0, 0.1);
            z-index: 1;
        }

        .el-menu-item {
            a {
                text-decoration: none;
                color: var(--el-menu-text-color);
            }

            &.is-active {
                a {
                    color: var(--el-menu-active-color);
                }
            }
        }
    }
    .main-wrapper {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .breadcrumb-row {
            width: 100%;
            padding: 12px;
        }

        .page-view {
            flex: 1;
            background-color: #fff;
            overflow-x: hidden;
            position: relative;
        }
    }
}

/*滚动条整体样式*/
::-webkit-scrollbar {
    width: 6px; /*竖向滚动条的宽度*/
    height: 6px; /*横向滚动条的高度*/
}
::-webkit-scrollbar-thumb {
    /*滚动条里面的小方块*/
    background: #ddd;
    border-radius: 5px;
}
::-webkit-scrollbar-track {
    /*滚动条轨道的样式*/
    background: #fafafa;
    border-radius: 5px;
}
</style>

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
        <div class="menu-bar" :class="{ collapse: isCollapse }">
            <!-- 品牌区 -->
            <div class="brand-area">
                <div class="brand-logo">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <transition name="brand-fade">
                    <div v-if="!isCollapse" class="brand-text">
                        <span class="brand-title">CMS</span>
                        <span class="brand-subtitle">Components</span>
                    </div>
                </transition>
            </div>

            <!-- 菜单区 -->
            <div class="menu-content">
                <el-menu :default-active="menuNameActived" :collapse="isCollapse" background-color="transparent" text-color="#cbd5e1" active-text-color="#f1f5f9">
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
                </el-menu>
            </div>

            <!-- 折叠按钮 -->
            <div class="collapse-toggle" @click="isCollapse = !isCollapse">
                <el-icon :size="18">
                    <component :is="isCollapse ? Expand : Fold" />
                </el-icon>
            </div>
        </div>
        <div class="main-wrapper">
            <div class="breadcrumb-row">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="item in menuNames" :key="item">{{ item }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <router-view v-slot="{ Component }">
                <transition name="page-fade" mode="out-in">
                    <keep-alive>
                        <component :is="Component" class="page-view" />
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, watch, onErrorCaptured } from "vue";
import { useRoute } from "vue-router";
import { CircleCheck, Notification, PictureFilled, EditPen, Grid, SetUp, Document, Search, Collection, Memo, Operation, Tickets, Fold, Expand } from "@element-plus/icons-vue";

interface MenuItemChild {
    name: string;
    title: string;
    path: string;
}

interface MenuItem {
    name: string;
    title: string;
    icon?: any;
    path?: string;
    children?: MenuItemChild[];
}

const route = useRoute();

/** 页面组件渲染错误处理，防止单个页面错误导致全局路由崩溃 */
onErrorCaptured((err: unknown) => {
    console.error("[CMS Components] 页面渲染错误:", err);
    return false; // 阻止错误继续向上传播，保持应用可用
});

const menuDataList: MenuItem[] = [
    {
        name: "svg-icon",
        title: "svg-icon组件",
        icon: Notification,
        children: [
            {
                name: "svg-icon-example1",
                title: "基础用法",
                path: "/svg-icon/example1"
            },
            {
                name: "svg-icon-example2",
                title: "字符串与Slot",
                path: "/svg-icon/example2"
            },
            {
                name: "svg-icon-example3",
                title: "尺寸对比",
                path: "/svg-icon/example3"
            },
            {
                name: "svg-icon-example4",
                title: "边界情况",
                path: "/svg-icon/example4"
            }
        ]
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
            },
            {
                name: "check-select-example5",
                title: "字符串/数字数据",
                path: "/check-select/example5"
            },
            {
                name: "check-select-example6",
                title: "事件监听",
                path: "/check-select/example6"
            },
            {
                name: "check-select-example7",
                title: "边界情况",
                path: "/check-select/example7"
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
                title: "拖拽上传",
                path: "/img-upload/example5"
            },
            {
                name: "img-upload-example6",
                title: "单图上传",
                path: "/img-upload/example6"
            },
            {
                name: "img-upload-example7",
                title: "数组模式与分隔符",
                path: "/img-upload/example7"
            },
            {
                name: "img-upload-example8",
                title: "禁用与大小限制",
                path: "/img-upload/example8"
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
            },
            {
                name: "web-editor-example5",
                title: "自定义工具栏",
                path: "/web-editor/example5"
            },
            {
                name: "web-editor-example6",
                title: "表单禁用联动",
                path: "/web-editor/example6"
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
            },
            {
                name: "input-field-example7",
                title: "slider/timeSelect/selectV2",
                path: "/input-field/example7"
            },
            {
                name: "input-field-example8",
                title: "自定义插槽",
                path: "/input-field/example8"
            },
            {
                name: "input-field-example9",
                title: "禁用与事件",
                path: "/input-field/example9"
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
            },
            {
                name: "search-field-example5",
                title: "插槽与optionKey",
                path: "/search-field/example5"
            },
            {
                name: "search-field-example6",
                title: "禁用与边界",
                path: "/search-field/example6"
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
            },
            {
                name: "input-form-example7",
                title: "expose方法",
                path: "/input-form/example7"
            },
            {
                name: "input-form-example8",
                title: "禁用与加载",
                path: "/input-form/example8"
            },
            {
                name: "input-form-example9",
                title: "值初始化与事件",
                path: "/input-form/example9"
            }
        ]
    },
    {
        name: "search-form",
        title: "search-form组件",
        icon: Operation,
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
            },
            {
                name: "search-form-example6",
                title: "事件监听",
                path: "/search-form/example6"
            },
            {
                name: "search-form-example7",
                title: "expose方法与隐藏按钮",
                path: "/search-form/example7"
            },
            {
                name: "search-form-example8",
                title: "默认值与自定义标签",
                path: "/search-form/example8"
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
            },
            {
                name: "data-table-example8",
                title: "无分页与查询加工",
                path: "/data-table/example8"
            },
            {
                name: "data-table-example9",
                title: "自定义列插槽",
                path: "/data-table/example9"
            },
            {
                name: "data-table-example10",
                title: "空数据与手动查询",
                path: "/data-table/example10"
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
            },
            {
                name: "action-bar-example4",
                title: "selectRows联动",
                path: "/action-bar/example4"
            },
            {
                name: "action-bar-example5",
                title: "changeButtons方法",
                path: "/action-bar/example5"
            },
            {
                name: "action-bar-example6",
                title: "对齐与空按钮",
                path: "/action-bar/example6"
            }
        ]
    },
    {
        name: "dialog-form",
        title: "dialog-form组件",
        icon: Tickets,
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
            },
            {
                name: "dialog-form-example7",
                title: "expose方法与事件",
                path: "/dialog-form/example7"
            },
            {
                name: "dialog-form-example8",
                title: "dialogProps与阻止关闭",
                path: "/dialog-form/example8"
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
            },
            {
                name: "search-page-example6",
                title: "expose方法",
                path: "/search-page/example6"
            },
            {
                name: "search-page-example7",
                title: "插槽分发与事件",
                path: "/search-page/example7"
            },
            {
                name: "search-page-example8",
                title: "初始加载与外部筛选",
                path: "/search-page/example8"
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
    scrollbar-color: #d0d5dd #f9fafb;
    scrollbar-track-color: #f9fafb;
    scrollbar-width: thin;
}
body {
    margin: 0;
    padding: 0;
    overflow-y: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.container {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    min-width: 1200px;
    background-color: #f5f7fa;

    .menu-bar {
        width: 232px;
        height: 100%;
        flex-shrink: 0;
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: #0f172a;
        border-right: 1px solid rgba(255, 255, 255, 0.06);
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &.collapse {
            width: 64px;
        }

        // 品牌区
        .brand-area {
            height: 64px;
            display: flex;
            align-items: center;
            padding: 0 16px;
            gap: 12px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            flex-shrink: 0;
            overflow: hidden;

            .brand-logo {
                width: 32px;
                height: 32px;
                flex-shrink: 0;
                color: #fff;

                svg {
                    width: 100%;
                    height: 100%;
                }
            }

            .brand-text {
                display: flex;
                align-items: baseline;
                gap: 6px;
                white-space: nowrap;
                overflow: hidden;

                .brand-title {
                    font-size: 18px;
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: -0.5px;
                }

                .brand-subtitle {
                    font-size: 12px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.75);
                    letter-spacing: 0.5px;
                }
            }
        }

        // 品牌文字过渡动画
        .brand-fade-enter-active {
            transition: opacity 0.2s ease 0.1s;
        }
        .brand-fade-leave-active {
            transition: opacity 0.1s ease;
        }
        .brand-fade-enter-from,
        .brand-fade-leave-to {
            opacity: 0;
        }

        // 菜单内容区
        .menu-content {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
        }

        // 折叠按钮
        .collapse-toggle {
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #64748b;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            transition: all 0.2s ease;
            flex-shrink: 0;

            &:hover {
                color: #e2e8f0;
                background: rgba(99, 102, 241, 0.08);
            }
        }

        // 菜单样式 - 深色主题
        .el-menu {
            border-right: none !important;
            padding: 4px 8px;
            background-color: transparent !important;

            .el-sub-menu {
                .el-sub-menu__title {
                    height: 44px;
                    line-height: 44px;
                    border-radius: 8px;
                    margin: 2px 0;
                    font-weight: 500;
                    font-size: 14px;
                    color: #cbd5e1;
                    transition: all 0.2s ease;

                    .el-icon {
                        font-size: 18px;
                        color: #64748b;
                        transition: color 0.2s ease;
                    }

                    &:hover {
                        background-color: rgba(99, 102, 241, 0.08) !important;
                        color: #f1f5f9;

                        .el-icon {
                            color: #818cf8;
                        }
                    }
                }

                &.is-active {
                    .el-sub-menu__title {
                        color: #f1f5f9;

                        .el-icon {
                            color: #818cf8;
                        }
                    }
                }
            }

            .el-menu-item {
                height: 40px;
                line-height: 40px;
                border-radius: 8px;
                margin: 1px 0;
                font-size: 13px;
                color: #94a3b8;
                padding-left: 52px !important;
                transition: all 0.2s ease;

                a {
                    text-decoration: none;
                    color: inherit;
                    transition: color 0.2s ease;
                }

                &:hover {
                    background-color: rgba(99, 102, 241, 0.08) !important;
                    color: #f1f5f9;
                }

                &.is-active {
                    background-color: rgba(99, 102, 241, 0.15) !important;
                    color: #f1f5f9;
                    font-weight: 500;

                    a {
                        color: #f1f5f9;
                    }

                    &::before {
                        content: "";
                        position: absolute;
                        left: 8px;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 3px;
                        height: 18px;
                        background: #818cf8;
                        border-radius: 2px;
                    }
                }
            }
        }
    }

    .main-wrapper {
        flex: 1;
        min-width: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: #f8fafc;

        .breadcrumb-row {
            width: 100%;
            padding: 14px 24px;
            background: #fff;
            border-bottom: 1px solid #e2e8f0;
            position: relative;

            // 底部渐变装饰线
            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, #6366f1, #8b5cf6, transparent);
            }

            .el-breadcrumb {
                font-size: 13px;

                .el-breadcrumb__item {
                    .el-breadcrumb__inner {
                        color: #94a3b8;
                        font-weight: 400;
                        transition: color 0.2s ease;
                    }

                    &:last-child .el-breadcrumb__inner {
                        color: #334155;
                        font-weight: 500;
                    }
                }

                .el-breadcrumb__separator {
                    color: #cbd5e1;
                }
            }
        }

        .page-view {
            flex: 1;
            min-height: 0;
            margin: 16px;
            background: #fff;
            border-radius: 10px;
            overflow-x: hidden;
            overflow-y: auto;
            position: relative;
            box-shadow:
                0 1px 3px 0 rgba(0, 0, 0, 0.04),
                0 1px 2px -1px rgba(0, 0, 0, 0.03);
            border: 1px solid #e2e8f0;
        }
    }
}

// 页面过渡动画
.page-fade-enter-active {
    transition: all 0.25s ease-out;
}
.page-fade-leave-active {
    transition: all 0.2s ease-in;
}
.page-fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
}
.page-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

/* 滚动条整体样式 */
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}
::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;

    &:hover {
        background: #94a3b8;
    }
}
::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
}

/* ═══════════════════════════════════════════════
   Demo 页面通用样式系统 - Modern Refined 风格
   ═══════════════════════════════════════════════ */
.example-page {
    padding: 24px;

    // 标题 - 渐变底边框
    h3 {
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 16px 0;
        padding-bottom: 12px;
        border-bottom: 2px solid;
        border-image: linear-gradient(90deg, #6366f1, #8b5cf6, transparent) 1;
    }

    // 描述文本
    .demo-desc {
        font-size: 14px;
        color: #64748b;
        line-height: 1.7;
        margin-bottom: 16px;
    }

    // 演示容器（带卡片效果）
    .demo-block {
        padding: 20px;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        background: #ffffff;
        box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.04),
            0 1px 2px rgba(99, 102, 241, 0.06);
        margin-bottom: 20px;
    }

    // 段落分组
    .demo-section {
        margin-bottom: 32px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    // 按钮面板
    .button-panel {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-bottom: 16px;
    }

    // 事件日志区
    .event-log {
        margin-top: 20px;
        padding: 16px;
        border-radius: 10px;
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        border: 1px solid #e2e8f0;

        h4 {
            font-size: 14px;
            color: #475569;
            margin: 0 0 12px 0;
            font-weight: 600;
        }
    }

    // 值显示区（用于展示当前 v-model 值）
    .value-display {
        margin-top: 12px;
        padding: 10px 14px;
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        border-radius: 8px;
        font-size: 13px;
        color: #475569;
        border: 1px solid #e2e8f0;
    }

    // 信息展示区
    .info-display {
        margin-top: 12px;
        padding: 10px 14px;
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        border-radius: 8px;
        font-size: 14px;
        color: #475569;
        border: 1px solid #e2e8f0;
    }
}

/* Element Plus 组件全局微调 */
.el-button {
    border-radius: 6px;
}

.el-input__wrapper {
    border-radius: 6px;
}

.el-select__wrapper {
    border-radius: 6px;
}

.el-card {
    border-radius: 8px;
}
</style>

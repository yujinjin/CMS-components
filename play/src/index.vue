<template>
    <div class="container">
        <div class="menu-bar">
            <el-menu :default-active="menuNameActived" :collapse="isCollapse">
                <template v-for="item in menuDataList" :key="item.name">
                    <el-menu-item :index="item.name">
                        <el-icon><component :is="item.icon" /></el-icon>
                        <router-link v-if="item.path" :to="item.path">{{ item.title }}</router-link>
                        <span v-else>{{ item.title }}</span>
                    </el-menu-item>
                </template>
                <!-- <el-sub-menu  :key="item.name" :index="item.name">
                    <template #title>
                        <el-icon><component :is="item.icon" /></el-icon>
                        <router-link v-if="item.path" :to="item.path">{{ item.title }}</router-link>
                        <span v-else>{{ item.title }}</span>
                    </template>
                    <template v-if="item.children?.length > 0">
                        <el-menu-item v-for="childItem in item.children" :key="childItem.name" :index="childItem.name">
                            <router-link :to="childItem.path">{{ childItem.title }}</router-link>
                        </el-menu-item>
                    </template>
                </el-sub-menu> -->
            </el-menu>
        </div>
        <div class="main-wrapper">
            <div class="breadcrumb-row">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>check-select组件</el-breadcrumb-item>
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
import { computed, ref } from "vue";
import { type Router, useRouter } from "vue-router";
import { CircleCheck, Notification } from "@element-plus/icons-vue";

const router: Router = useRouter();

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
        path: "/check-select"
        // children: [
        //     {
        //         name: "check-select-example1",
        //         title: "示例1",
        //         path: "/check-select/example1"
        //     }
        // ]
    }
];

const isCollapse = ref(false);

const menuNameActived = computed(() => {
    return router.currentRoute.value.name;
});
</script>
<style lang="scss">
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
</style>

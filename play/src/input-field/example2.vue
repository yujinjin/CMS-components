<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2025-01-13 10:39:52
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2025-01-16 20:52:35
 * @项目的路径: \CMS-components\play\src\input-field\example2.vue
 * @描述: input-field组件的输入框类型示例
-->
<template>
    <div class="example-page">
        <h3>输入框类型</h3>
        <p class="demo-desc">通过 type 属性切换不同的输入类型，如 input、inputNumber 等</p>
        <div class="demo-block">
            <input-field v-model="value1" :props="{ type: 'password' }" placeholder="密码输入" />
            <input-field v-model="value2" type="inputNumber" placeholder="数字输入" />
            <input-field v-model="value3" :props="{ type: 'textarea' }" placeholder="文本域输入" />
            <input-field v-model="value4" type="autocomplete" :fetch-suggestions="querySearch" placeholder="自动补全输入框" />
            <input-field v-model="value5" type="webEditor" placeholder="富文本框输入" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { InputField } from "@yujinjin/cms-components-main/index";

interface RestaurantItem {
    value: string;
    link: string;
}

const value1 = ref("");
const value2 = ref();
const value3 = ref("");
const value4 = ref("");
const value5 = ref("");

const restaurants = ref<RestaurantItem[]>([
    { value: "vue", link: "https://github.com/vuejs/vue" },
    { value: "element", link: "https://github.com/ElemeFE/element" },
    { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
    { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
    { value: "vuex", link: "https://github.com/vuejs/vuex" },
    { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
    { value: "babel", link: "https://github.com/babel/babel" }
]);

const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    };
};

const querySearch = (queryString: string, cb: any) => {
    const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value;
    // 调用回调函数返回建议结果
    cb(results);
};
</script>
<style lang="scss" scoped>
.demo-block {
    display: flex;
    flex-direction: column;
    gap: 12px;

    :deep(.el-input) {
        width: 350px;
    }
}
</style>

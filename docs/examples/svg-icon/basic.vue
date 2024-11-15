<!--
 * @创建者: yujinjin9@126.com
 * @创建时间: 2024-11-08 10:41:21
 * @最后修改作者: yujinjin9@126.com
 * @最后修改时间: 2024-11-08 17:37:18
 * @项目的路径: \CMS-components\docs\examples\svg-icon\base.vue
 * @描述: 基础示例
-->
<template>
    <div class="demo-box">
        <svg-icon value="exit-full-screen" />
        <svg-icon value="full-screen" />
        <svg-icon value="fold" />
    </div>
</template>
<script lang="ts">
import "./svgs/exit-full-screen.svg";
import "./svgs/fold.svg";
import "./svgs/full-screen.svg";
</script>
<style lang="scss" scoped>
.demo-box {
    max-width: 600px;

    i {
        margin-right: 10px;
    }
}
</style>

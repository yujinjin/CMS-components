<template>
    <div class="demo-box">
        <svg-icon value="exit-full-screen" />
        <svg-icon value="full-screen" />
        <svg-icon value="fold" />
    </div>
</template>
<script lang="ts" setup>
import "./svgs/exit-full-screen.svg";
import "./svgs/fold.svg";
import "./svgs/full-screen.svg";
</script>
<style scoped>
.demo-box {
    max-width: 600px;
}

.demo-box i {
    margin-right: 10px;
}
</style>

<template>
    <div class="demo-box">
        <input-field v-bind="fieldProps">
            <el-rate v-model="value" />
        </input-field>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const fieldProps = ref({ slot: true });

const value = ref(0);
</script>

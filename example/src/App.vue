<template>
  <ElConfigProvider :locale="zhCn">
    <HelloWorld />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import HelloWorld from './views/hello-world.vue'
</script>

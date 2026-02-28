<template>
  <ElConfigProvider :locale="zhCn">
    <HelloWorld c-primary p-10 h-10 w-10 msg="基础模板" />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import HelloWorld from './views/hello-world.vue'

// 故意添加一个未使用的变量来测试ESLint
</script>

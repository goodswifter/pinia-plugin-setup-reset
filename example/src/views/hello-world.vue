<template>
  <div mx-auto my-12 p-6 max-w-1080>
    <h1 text-10xl font-bold mb-6>Pinia 2.0 Reset Plugin 测试</h1>

    <!-- 当前状态展示 -->
    <ElCard mb-4>
      <template #header>
        <span text-lg font-bold>当前 Store 状态</span>
      </template>
      <ElDescriptions :column="1" border>
        <ElDescriptionsItem label="count">{{ store.count }}</ElDescriptionsItem>
        <ElDescriptionsItem label="name">{{ store.name }}</ElDescriptionsItem>
        <ElDescriptionsItem label="items">{{ JSON.stringify(store.items) }}</ElDescriptionsItem>
        <ElDescriptionsItem label="nested">{{ JSON.stringify(store.nested) }}</ElDescriptionsItem>
      </ElDescriptions>
    </ElCard>

    <!-- 修改状态 -->
    <ElCard mb-4>
      <template #header>
        <span text-lg font-bold>修改状态</span>
      </template>
      <div flex flex-wrap gap-3>
        <ElButton type="primary" @click="store.increment()">count +1</ElButton>
        <ElButton type="primary" @click="store.decrement()">count -1</ElButton>
        <ElButton type="warning" @click="store.name = '已修改'">修改 name</ElButton>
        <ElButton type="warning" @click="store.items = [10, 20, 30]">修改 items</ElButton>
        <ElButton type="warning" @click="store.nested = { a: { b: 999 }, c: 888 }">
          修改 nested
        </ElButton>
        <ElButton type="danger" @click="modifyAll">修改全部</ElButton>
      </div>
    </ElCard>

    <!-- 重置操作 -->
    <ElCard mb-4>
      <template #header>
        <span text-lg font-bold>重置操作</span>
      </template>
      <div flex flex-wrap gap-3>
        <ElButton type="success" @click="resetAll">$reset() 全量重置</ElButton>
        <ElButton @click="store.$reset('count')">$reset('count')</ElButton>
        <ElButton @click="store.$reset('name')">$reset('name')</ElButton>
        <ElButton @click="store.$reset('items')">$reset('items')</ElButton>
        <ElButton @click="store.$reset('nested')">$reset('nested')</ElButton>
        <ElButton type="info" @click="store.$reset('count', 'name')">
          $reset('count', 'name')
        </ElButton>
      </div>
    </ElCard>

    <!-- 操作日志 -->
    <ElCard>
      <template #header>
        <div flex-x-between>
          <span text-lg font-bold>操作日志</span>
          <ElButton size="small" text @click="logs = []">清空</ElButton>
        </div>
      </template>
      <div max-h-60 overflow-auto>
        <div v-for="(log, i) in logs" :key="i" text-sm py-1 bd-bottom>
          <span c-desc mr-2>{{ log.time }}</span>
          <ElTag :type="log.type" size="small" mr-2>{{ log.action }}</ElTag>
          <span>{{ log.detail }}</span>
        </div>
        <ElEmpty v-if="logs.length === 0" description="暂无日志" :image-size="60" />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

type TagType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

interface LogItem {
  time: string
  action: string
  type?: TagType
  detail: string
}

const logs = ref<LogItem[]>([])

function addLog(action: string, type?: TagType) {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  const detail = `count=${store.count}, name="${store.name}", items=${JSON.stringify(store.items)}, nested=${JSON.stringify(store.nested)}`
  logs.value.unshift({ time, action, type, detail })
}

function modifyAll() {
  store.count = 100
  store.name = '已修改'
  store.items = [10, 20, 30]
  store.nested = { a: { b: 999 }, c: 888 }
  addLog('修改全部', 'danger')
}

function resetAll() {
  store.$reset()
  addLog('全量重置', 'success')
}

watch(
  () => store.count,
  (val, old) => {
    if (val !== old) addLog(`count: ${old} → ${val}`, 'warning')
  },
)
</script>

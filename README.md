# pinia-plugin-setup-reset

[![NPM version](https://img.shields.io/npm/v/pinia-plugin-setup-reset?color=a1b858&label=)](https://www.npmjs.com/package/pinia-plugin-setup-reset)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

为 Pinia **Setup Store** 提供 `$reset()` 方法，支持全量重置和选择性重置。

## 为什么需要这个插件？

Pinia 的 Options Store 自带 `$reset()` 方法，但 Setup Store（Composition API 风格）默认不支持。调用时会抛出错误：

```
🍍: Store "xxx" is built using the setup syntax and does not implement $reset().
```

本插件为 Setup Store 自动注入 `$reset()` 方法，并额外支持**选择性重置**指定的 state 属性。

## 安装

```bash
pnpm add pinia-plugin-setup-reset
```

## 使用

```typescript
import { createPinia } from 'pinia'
import { resetPlugin } from 'pinia-plugin-setup-reset'

const pinia = createPinia()
pinia.use(resetPlugin)

app.use(pinia)
```

### 全量重置

```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
  const name = ref('Alice')
  const age = ref(25)
  const tags = ref(['admin'])

  return { name, age, tags }
})

const userStore = useUserStore()

userStore.name = 'Bob'
userStore.age = 30
userStore.tags = ['user']

// 重置全部状态到初始值
userStore.$reset()
// name → 'Alice', age → 25, tags → ['admin']
```

### 选择性重置

```typescript
userStore.name = 'Bob'
userStore.age = 30

// 只重置 name，保留 age 的修改
userStore.$reset('name')
// name → 'Alice', age → 30

// 同时重置多个属性
userStore.$reset('name', 'age')
// name → 'Alice', age → 25
```

## TypeScript 支持

插件自动扩展了 Pinia 的类型定义，`$reset()` 的参数会根据 store 的 state 类型自动推导，提供属性名补全：

```typescript
const userStore = useUserStore()

userStore.$reset() // 全量重置
userStore.$reset('name') // 只重置 name
userStore.$reset('name', 'age') // 重置 name 和 age
userStore.$reset('xxx') // TS 报错：类型不存在
```

## 兼容性

| 依赖  | 版本要求 |
| ----- | -------- |
| pinia | >= 3.0.0 |
| vue   | >= 3.0.0 |

## License

[MIT](./LICENSE)

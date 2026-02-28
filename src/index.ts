import type { PiniaPluginContext } from 'pinia'
import { cloneDeep } from './utils/clone-deep'

/**
 * Pinia 重置插件
 * 为 Setup 风格的 store 提供 $reset 方法
 */
export function resetPlugin({ store }: PiniaPluginContext) {
  // 保存初始状态的深拷贝
  const initialState = cloneDeep(store.$state)

  // 添加 $reset 方法
  store.$reset = () => {
    store.$patch(cloneDeep(initialState))
  }
}

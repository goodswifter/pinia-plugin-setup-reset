import type { _ActionsTree, _GettersTree, PiniaPluginContext, StateTree } from 'pinia'
import { cloneDeep } from './utils/clone-deep'

declare module 'pinia' {
  /* eslint-disable unused-imports/no-unused-vars */
  export interface PiniaCustomProperties<
    Id extends string = string,
    S extends StateTree = StateTree,
    G = _GettersTree<S>,
    A = _ActionsTree,
  > {
    /**
     * 重置 store 状态到初始值
     * 不传参数时重置全部状态，传入 key 时只重置指定的状态属性
     */
    $reset: (...keys: Array<keyof S & string>) => void
  }
  /* eslint-enable unused-imports/no-unused-vars */
}

/**
 * Pinia 重置插件
 * 为 Setup 风格的 store 提供 $reset 方法，支持全量和选择性重置
 */
export function resetPlugin({ store }: PiniaPluginContext) {
  const initialState = cloneDeep(store.$state)

  store.$reset = (...keys: string[]) => {
    if (keys.length === 0) {
      store.$patch(cloneDeep(initialState))
      return
    }

    const partialState: StateTree = {}
    for (const key of keys) {
      if (key in initialState) {
        partialState[key] = cloneDeep((initialState as StateTree)[key])
      }
    }
    store.$patch(partialState)
  }
}

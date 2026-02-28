import { createPinia, defineStore, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp, ref } from 'vue'
import { resetPlugin } from '../index'

const useSetupStore = defineStore('setup', () => {
  const name = ref('initial')
  const count = ref(0)
  const items = ref([1, 2, 3])
  const nested = ref({ a: { b: 1 }, c: 2 })

  function increment() {
    count.value++
  }

  return { name, count, items, nested, increment }
})

function setupPinia() {
  const app = createApp({ template: '<div/>' })
  const pinia = createPinia()
  pinia.use(resetPlugin)
  app.use(pinia)
  setActivePinia(pinia)
}

describe('resetPlugin', () => {
  beforeEach(() => {
    setupPinia()
  })

  it('should reset all state to initial values', () => {
    const store = useSetupStore()

    store.name = 'changed'
    store.count = 99
    store.items = [4, 5, 6]

    store.$reset()

    expect(store.name).toBe('initial')
    expect(store.count).toBe(0)
    expect(store.items).toEqual([1, 2, 3])
  })

  it('should reset only specified keys', () => {
    const store = useSetupStore()

    store.name = 'changed'
    store.count = 99
    store.items = [4, 5, 6]

    store.$reset('name', 'items')

    expect(store.name).toBe('initial')
    expect(store.count).toBe(99)
    expect(store.items).toEqual([1, 2, 3])
  })

  it('should reset a single key', () => {
    const store = useSetupStore()

    store.name = 'changed'
    store.count = 99

    store.$reset('count')

    expect(store.name).toBe('changed')
    expect(store.count).toBe(0)
  })

  it('should ignore non-existent keys', () => {
    const store = useSetupStore()

    store.name = 'changed'
    store.count = 99

    store.$reset('nonExistent' as keyof typeof store.$state)

    expect(store.name).toBe('changed')
    expect(store.count).toBe(99)
  })

  it('should deep clone nested objects on reset', () => {
    const store = useSetupStore()

    store.nested = { a: { b: 100 }, c: 200 }
    store.$reset()

    expect(store.nested).toEqual({ a: { b: 1 }, c: 2 })

    store.nested.a.b = 999
    store.$reset()

    expect(store.nested.a.b).toBe(1)
  })

  it('should deep clone arrays on reset', () => {
    const store = useSetupStore()

    store.items.push(4)
    store.$reset()

    expect(store.items).toEqual([1, 2, 3])
  })

  it('should allow multiple resets', () => {
    const store = useSetupStore()

    store.count = 10
    store.$reset()
    expect(store.count).toBe(0)

    store.count = 20
    store.$reset()
    expect(store.count).toBe(0)
  })
})

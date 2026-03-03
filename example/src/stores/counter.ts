import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('初始值')
  const items = ref([1, 2, 3])
  const nested = ref({ a: { b: 1 }, c: 2 })

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  return { count, name, items, nested, increment, decrement }
})

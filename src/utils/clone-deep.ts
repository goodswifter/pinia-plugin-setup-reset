/**
 * 深拷贝工具函数
 * 支持对象、数组、基本类型等，并处理循环引用
 */
export function cloneDeep<T>(value: T, visited = new WeakMap<object, T>()): T {
  // 处理基本类型和 null/undefined
  if (value === null || value === undefined) {
    return value
  }

  // 处理原始类型（string, number, boolean, symbol, bigint, function）
  if (typeof value !== 'object') {
    return value
  }

  // 处理 Date 对象
  if (value instanceof Date) {
    return new Date(value?.getTime()) as T
  }

  // 处理 RegExp 对象
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T
  }

  // 处理 Map
  if (value instanceof Map) {
    // 检查是否已经访问过（处理循环引用）
    if (visited.has(value)) {
      return visited.get(value)!
    }

    const clonedMap = new Map()
    visited.set(value, clonedMap as T)

    value.forEach((val, key) => {
      clonedMap.set(cloneDeep(key, visited), cloneDeep(val, visited))
    })
    return clonedMap as T
  }

  // 处理 Set
  if (value instanceof Set) {
    // 检查是否已经访问过（处理循环引用）
    if (visited.has(value)) {
      return visited.get(value)!
    }

    const clonedSet = new Set()
    visited.set(value, clonedSet as T)

    value.forEach(val => {
      clonedSet.add(cloneDeep(val, visited))
    })
    return clonedSet as T
  }

  // 处理数组
  if (Array.isArray(value)) {
    // 检查是否已经访问过（处理循环引用）
    if (visited.has(value)) {
      return visited.get(value)!
    }

    const clonedArray: unknown[] = []
    visited.set(value, clonedArray as T)

    for (const item of value) {
      clonedArray.push(cloneDeep(item, visited))
    }
    return clonedArray as T
  }

  // 处理普通对象
  // 检查是否已经访问过（处理循环引用）
  if (visited.has(value as object)) {
    return visited.get(value as object)!
  }

  const cloned: T = { ...(value as T) }
  visited.set(value as object, cloned)

  // 复制所有自有属性
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      ;(cloned as Record<string, unknown>)[key] = cloneDeep(
        (value as Record<string, unknown>)[key],
        visited,
      )
    }
  }

  // 复制 Symbol 属性
  const symbolKeys = Object.getOwnPropertySymbols(value)
  for (const symbolKey of symbolKeys) {
    ;(cloned as Record<symbol, unknown>)[symbolKey] = cloneDeep(
      (value as Record<symbol, unknown>)[symbolKey],
      visited,
    )
  }

  return cloned
}

import type { Component } from 'vue'
import { h } from 'vue'
import KBase from './shared/base'
import KButton from './components/button'
import KInput from './components/input'

type ComponentKeys = 'button' | 'input'

type ComCollecTionType = {
  [K in ComponentKeys]: Component
}
const COMP_COLLECTION: ComCollecTionType = {
  button: KButton,
  input: KInput
}

export function createItem (name: ComponentKeys, options: object) {
  // 这里不关心传入 h 函数的组件类型是字符串、组件实例、或是js，直接定义为any。
  const comp: any = COMP_COLLECTION[name] ? COMP_COLLECTION[name] : name
  return {
    render: () =>
      h(KBase,
        { options },
        {
          default: (fn: (...args: any) => void) => h(comp, { options, fn })
        }),
    options
  }
}

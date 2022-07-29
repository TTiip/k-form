import type { Component } from 'vue'
import { h } from 'vue'
import KBaseCollection from './shared/base'
import KDefaultCollection from './components/default'

type ComponentKeys = 'default'

type ComCollecTionType = {
  [K in ComponentKeys]: Component
}

const COMP_COLLECTION: ComCollecTionType = {
  default: KDefaultCollection
}

export function createCollection (name: ComponentKeys, items: object, options: object) {
  const comp: any = COMP_COLLECTION[name] ? COMP_COLLECTION[name] : name
  return {
    render: () =>
      h(KBaseCollection as any,
        {
          items,
          options
        },
        {
          default: (items: object, options: object) =>
            h(comp, {
              items,
              options
            })
        }),
    items,
    options
  }
}

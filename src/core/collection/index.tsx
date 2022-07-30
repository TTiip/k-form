import type { Component } from 'vue'
import { h } from 'vue'
import KBaseCollection from './shared/base'
import KFormItemCollection from './components/form-item'
import KDefaultCollection from './components/default'

type ComponentKeys = 'form-item' | 'default'

type ComCollecTionType = {
  [K in ComponentKeys]: Component
}

const COMP_COLLECTION: ComCollecTionType = {
  'form-item': KFormItemCollection,
  'default': KDefaultCollection
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
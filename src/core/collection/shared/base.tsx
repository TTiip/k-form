import { Fragment, defineComponent, inject, provide, ref, watch } from 'vue'

export default defineComponent({
  name: 'KBaseCollection',
  props: {
    items: { type: Array, default: () => [] },
    options: { type: Object, default: () => {} }
  },
  setup (props, { slots }) {
    const { options } = props
    const form = inject('form')
    const items = ref(props.items)

    const collectionInstance = {
      getItems: () => items.value,
      setItem: (vals: any) => {
        const keys = items.value.map((item: any) => item.options.key)
        vals.map((val: any) => {
          if (!keys.includes(val.options.key)) {
            items.value.push(val)
          }
          return null
        })
      },
      delItem: (vals: any) => {
        const keys = items.value.map((item: any) => item.options.key)
        vals.map((val: any) => {
          const idx = keys.indexOf(val.options.key)
          if (idx > -1) {
            items.value.splice(idx, 1)
          }
          return null
        })
      },
      ...Object.assign({}, inject('formInstance'))
    }

    provide('collectionInstance', collectionInstance)

    if (props.options?.hook?.onFormChange) {
      watch(() => form,
        () => {
          props.options?.hook?.onFormChange(collectionInstance)
        },
        { deep: true })
    }

    return () => <Fragment {...(options?.collectionSetting ?? {})}>{slots?.default?.(items.value, options)}</Fragment>
  }
})

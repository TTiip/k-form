export default defineComponent({
  name: 'KBaseCollection',
  props: {
    items: { type: Array, default: () => [] },
    options: { type: Object, default: () => {} }
  },
  setup (props, { slots }) {
    const { options } = props
    const items = ref(props.items)

    const collectionInstance = {
      getItems: () => items.value,
      setItem: () => {},
      delItem: () => {},
      ...Object.assign({}, inject('formInstance'))
    }

    provide('collectionInstance', collectionInstance)

    return () => <div {...(options?.compSetting ?? {})}>{slots?.default?.(items.value, options)}</div>
  }
})

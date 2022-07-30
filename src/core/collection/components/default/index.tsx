import { Transition, computed, defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'KDefaultCollection',
  props: {
    items: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) }
  },
  setup (props) {
    const form = inject('form')

    const orderCompare = (a: any, b: any) => {
      const aOrder = a.options.order ?? 0
      const bOrder = b.options.order ?? 0
      return aOrder - bOrder
    }

    const sortedItems = computed(() => {
      return props.items.slice().sort((a, b) => orderCompare(a, b))
    })

    const renderItem = (item: any) => {
      return (
        <div>{ item.render() }</div>
      )
    }

    return () =>
      sortedItems.value.map((item: any, index) => {
        return (
          <Transition
            key={index}
            name="motion"
            mode="out-in"
          >
            {item?.options?.computed?.show
              ? item?.options?.computed?.show(form)
                ? renderItem(item)
                : null
              : renderItem(item)}
          </Transition>
        )
      })
  }
})

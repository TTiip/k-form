import './index.css'
import { Transition, computed, defineComponent, inject } from 'vue'
import { ElFormItem } from 'element-plus'

export default defineComponent({
  name: 'KFormItemCollection',
  props: {
    items: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) }
  },
  setup (props) {
    const { options } = props
    const collectionInstance = inject('collectionInstance')
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
        <ElFormItem
          class="fade"
          key={item.key}
          label={item.options?.label}
          {...options.collectionSetting}
          v-slots={{
            default: item.render,
            label: item.options?.customLabel
              ? () => {
                return (
                  item.options?.customLabel({
                    ...Object.assign({}, collectionInstance)
                  }) || item.options?.label
                )
              }
              : () => null
          }}/>
      )
    }

    return () =>
      sortedItems.value.map((item: any, index) => {
        console.log(item, 'item1111')
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

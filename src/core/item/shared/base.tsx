import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'KBaseItem',
  props: {
    options: { type: Object, default: () => {} }
  },
  setup (props, { slots }) {
    const { options } = props
    // const form = inject('form')
    const itemInstance: any = {
      ...Object.assign({}, inject('collectionInstance'))
    }
    const fn = {
      onClick: () => {
        // 如果存在 onClick 事件，则返回 onClick 事件，并且传入参数。
        if (options?.hook?.onClick) {
          return () => options.hook.onClick(itemInstance)
        }
      },
      onChange: (val: any) => itemInstance.setForm({ [props.options.key]: val }),
      onInput: (val: any) => itemInstance.setForm({ [props.options.key]: val })
    }
    return () => slots?.default && slots?.default(fn)
  }
})

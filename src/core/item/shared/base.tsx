import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KBaseItem',
  props: {
    options: { type: Object, default: () => {} }
  },
  setup (props, { slots }) {
    const { options } = props
    const fn = {
      onClick: () => {
        // 如果存在 onClick 事件，则返回 onClick 事件，并且传入参数。
        if (options?.hook?.onClick) {
          return () => options.hook.onClick('onClick～123')
        }
      },
      onChange: () => {
        // 如果存在 onChange 事件，则返回 onChange 事件，并且传入参数。
        if (options?.hook?.onChange) {
          return () => options.hook.onChange('onChange～123')
        }
      },
      onInput: () => {
        // 如果存在 onInput 事件，则返回 onInput 事件，并且传入参数。
        if (options?.hook?.onInput) {
          return (value: any) => options.hook.onInput(value)
        }
      }
    }
    return () => slots?.default && slots?.default(fn)
  }
})

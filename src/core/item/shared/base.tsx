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
        // 如果存在onClick事件，则返回onClick事件，并且传入参数。
        if (options?.hook?.onClick) {
          return () => props.options.hook.onClick('aaaaa')
        }
      }
    }
    return () => slots?.default && slots?.default(fn)
  }
})

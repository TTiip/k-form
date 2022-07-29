import { defineComponent, inject } from 'vue'
import { ElInput } from 'element-plus'

export default defineComponent({
  name: 'KInput',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} }
  },
  setup (props) {
    const form: any = inject('form')
    const { fn, options } = props
    return () => (
      <ElInput
        {...options.compSetting}
        model-value = { form?.[options?.key] ?? '' }
        // 此处 fn?.onInput 一定存在，所以改变写法，判断调用的结果是否存在。不存在则执行 defaultFn。
        onInput = { fn?.onInput }
      />
    )
  }
})

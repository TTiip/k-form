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
        model-value = { form?.[options?.compSetting?.key] ?? '' }
        onInput = { fn?.onInput }
      />
    )
  }
})

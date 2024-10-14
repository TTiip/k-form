import { ElInput } from 'element-plus'
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'KInput',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} },
  },
  setup (props) {
    const form: any = inject('form')
    const { fn, options } = props
    return () => (
      <ElInput
        {...options.compSetting}
        modelValue={form?.[options?.compSetting?.key] ?? ''}
        onInput={fn?.onInput}
      />
    )
  },
})

import { ElCascader } from 'element-plus'
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'KCascader',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} },
  },
  setup (props) {
    const { fn, options } = props
    const form: any = inject('form')

    return () => (
      <ElCascader
        {...options.compSetting}
        modelValue={form?.[options?.compSetting?.key] ?? ''}
        onChange={fn?.onChange}
      />
    )
  },
})

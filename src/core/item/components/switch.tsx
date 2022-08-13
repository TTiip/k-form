import { defineComponent, inject } from 'vue'
import { ElSwitch } from 'element-plus'

export default defineComponent({
  name: 'KSwitch',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} }
  },
  setup (props) {
    const form: any = inject('form')
    const { fn, options } = props
    return () => (
      <ElSwitch
        {...options.compSetting}
        modelValue = { form?.[options?.compSetting?.key] ?? '' }
        onChange = { fn?.onChange }
      />
    )
  }
})

import { defineComponent, inject } from 'vue'
import { ElCheckboxButton } from 'element-plus'

export default defineComponent({
  name: 'KCheckboxButton',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} }
  },
  setup (props) {
    const { fn, options } = props
    const form: any = inject('form')

    return () => (
      <ElCheckboxButton
        {...options.compSetting}
        modelValue={form?.[options.compSetting.key] ?? false}
        onUpdate:modelValue={fn?.onChange}>
        {options.compSetting.text}
      </ElCheckboxButton>
    )
  }
})

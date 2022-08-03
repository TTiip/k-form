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
        model-value={form?.[options.compSetting.key] ?? false}
        {...options.compSetting}
        onChange={fn?.onChange}>
        {options.compSetting.text}
      </ElCheckboxButton>
    )
  }
})

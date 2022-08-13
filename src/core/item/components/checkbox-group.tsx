import { defineComponent } from 'vue'
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'

export default defineComponent({
  name: 'KCheckBoxWithGroup',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} }
  },
  setup (props) {
    const form: any = inject('form')
    const { fn, options } = props
    console.log(fn, 'fn')
    console.log(options, 'options')
    return () => (
      <ElCheckboxGroup
        model-value = { form?.[options?.compSetting?.key] ?? [] }
        onChange = { fn?.onChange }
      >
        {
          options?.compSetting?.options.map((item: any, index: number) => <ElCheckbox key={index} label={item.value}>{item.label}</ElCheckbox>)
        }
      </ElCheckboxGroup>
    )
  }
})

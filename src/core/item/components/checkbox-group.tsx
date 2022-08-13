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
    return () => (
      <ElCheckboxGroup
        model-value = { form?.[options?.compSetting?.key] ?? [] }
        onChange = { fn?.onChange }
        {...options.compSetting}
      >
        {
          options?.compSetting?.options.map((item: any) =>
            <ElCheckbox key={item.label} {...item}/>)
        }
      </ElCheckboxGroup>
    )
  }
})

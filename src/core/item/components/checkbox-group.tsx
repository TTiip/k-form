import { defineComponent } from 'vue'
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'

export default defineComponent({
  name: 'KCheckBoxGroup',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} }
  },
  setup (props) {
    const form: any = inject('form')
    const { fn, options } = props
    // 此处使用 value 当作checkbox 的value值
    // 使用 slot 设置显示的 label
    return () => (
      <ElCheckboxGroup
        modelValue = { form?.[options?.compSetting?.key] ?? [] }
        onChange = { fn?.onChange }
        {...options.compSetting}
        v-slots={{
          default: () => options?.compSetting?.options.map((item: any) =>
            <ElCheckbox
              key={item.value ?? item.label}
              {...item}
              label={item.value}
              v-slots={{
                default: () => item.label
              }}/>)
        }}
      />
    )
  }
})

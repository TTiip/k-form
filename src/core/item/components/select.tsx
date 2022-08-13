import { defineComponent, inject } from 'vue'
import { ElOption, ElSelect } from 'element-plus'

export default defineComponent({
  name: 'KSelect',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} }
  },
  setup (props) {
    const { options, fn } = props
    const form: any = inject('form')

    return () => (
      <ElSelect
        modelValue={form?.[options?.compSetting?.key] ?? ''}
        onChange={fn.onChange}
        {...options.compSetting}>
        {options?.compSetting?.options?.map((option: any, index: number) => (
          <ElOption
            {...option}
            key={index}
          ></ElOption>
        ))}
      </ElSelect>
    )
  }
})

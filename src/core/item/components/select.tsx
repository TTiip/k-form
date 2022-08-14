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
        {...options.compSetting}
        modelValue={form?.[options?.compSetting?.key] ?? ''}
        onUpdate:modelValue={fn.onChange}
      >
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

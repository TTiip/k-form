import { defineComponent } from 'vue'
import { ElRadio, ElRadioGroup } from 'element-plus'

export default defineComponent({
  name: 'KRadioGroup',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} }
  },
  setup (props) {
    const form: any = inject('form')
    const { fn, options } = props
    return () => (
      <ElRadioGroup
        modelValue={form?.[options?.compSetting?.key] ?? ''}
        onChange={ fn?.onChange }
        {...options.compSetting}
        v-slots={{
          default: () => options?.compSetting?.options.map((item: any) =>
            <ElRadio
              key={item.value ?? item.label}
              {...item}
              label={item?.value}
              v-slots={{
                default: () => item.label
              }}
            />)
        }}
      />
    )
  }
})

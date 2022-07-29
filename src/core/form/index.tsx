import { defineComponent, h, provide, reactive } from 'vue'
import { ElForm } from 'element-plus'

const KForm = defineComponent({
  name: 'KForm',
  props: {
    initForm: { type: Object, default: () => ({}) },
    collections: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) }
  },
  setup (props) {
    const { options, collections, initForm } = props
    const form = reactive({
      ...initForm
    })

    const defaultFn = (val: any) => val

    const beforeSubmit = options?.hook?.beforeSubmit ?? defaultFn
    const onSubmit = options?.hook?.onSubmit ?? defaultFn

    const formInstance = {
      getForm: () => form,
      setForm: (val: any) => {
        Object.assign(form, val)
        console.log('[form 变更]', form)
      },
      submit: () => {
        const val = beforeSubmit(form)
        console.log('[form 提交]', form)
        onSubmit(val)
      }
    }

    provide('form', form)
    provide('formInstance', formInstance)

    return () => (
      <ElForm {...options?.compSetting}>
        {collections?.map((collection: any) => collection?.render())}
      </ElForm>
    )
  }
})

export const createForm = (collections: any, initForm?: object, options?: object) => {
  return {
    render: () => h(KForm as any, { collections, initForm, options }),
    options
  }
}

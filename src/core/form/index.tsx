import { defineComponent, h, provide, ref } from 'vue'
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
    const form = initForm
    const formRef: any = ref(null)

    const defaultFn = (val: any) => val

    const beforeSubmit = options?.hook?.beforeSubmit ?? defaultFn
    const onSubmit = options?.hook?.onSubmit ?? defaultFn

    const formInstance = {
      getForm: () => form,
      setForm: (val: any) => {
        Object.assign(form, val)
      },
      submit: () => {
        const coverData = beforeSubmit(form)
        formRef.value?.validate((valid: boolean) => {
          if (valid) {
            onSubmit(coverData)
          } else {
            console.error('表单中存在未填写的必填项~')
          }
        })
      }
    }

    provide('form', form)
    provide('formInstance', formInstance)

    return () => (
      <ElForm ref={ formRef } { ...options?.compSetting }>
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

import { ElConfigProvider, ElForm } from 'element-plus'
import { defineComponent, h, provide, reactive, useTemplateRef } from 'vue'

const KForm = defineComponent({
  name: 'KForm',
  props: {
    initForm: { type: Object, default: () => ({}) },
    collections: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) },
  },
  setup (props) {
    const { options, collections, initForm } = props
    // 切记这里不能使用 结构赋值 form= {...initForm} 这样会失去对原来的数据引用，校验数据时会出现输入框修改了，原值不修改，从而校验失效。
    const form = reactive(initForm)
    const formRef: any = useTemplateRef('formRefStr')

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
      },
    }

    provide('form', form)
    provide('formInstance', formInstance)

    return () => (
      <div>
        <ElConfigProvider {...options?.providerConfig ?? {}}>
          <ElForm ref="formRefStr" {...options?.compSetting}>
            {collections?.map((collection: any) => collection?.render())}
          </ElForm>
        </ElConfigProvider>
      </div>
    )
  },
})

export function createForm (collections: any, initForm?: object, options?: object) {
  return {
    render: () => h(KForm as any, { collections, initForm, options }),
    options,
  }
}

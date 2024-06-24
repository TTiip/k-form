import { defineComponent } from 'vue'
import Form from './form'

export default defineComponent({
  name: 'CaseFormByTsx',
  setup () {
    const submitForm = (formData: any) => {
      console.log(formData, '测试 vue 文件中使用 tsx 文件')
    }
    return () => (
      <>
        测试 vue 文件中使用 tsx 文件
        <Form onSubmit={submitForm} />
      </>
    )
  }
})

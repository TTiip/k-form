import { defineComponent } from 'vue'
import { createCollection, createForm, createItem } from '~/core'

export default defineComponent({
  name: 'CaseInputs',
  setup () {
    // 1. define items
    const FormItems = [
      createItem('input', {
        key: 'name_1',
        label: '姓名',
        customLabel: () => '姓名~~',
        order: 1
      }),
      createItem('input', {
        key: 'name_2',
        label: '曾用名',
        customLabel: () => '',
        computed: {
          show: (form: any) => !!form.name_1
        },
        order: 2
      })
    ]
    const SubmitBtns = [
      createItem('button', {
        text: '提交',
        compSetting: {
          type: 'primary'
        },
        order: 2,
        hook: {
          onClick (instance: any) {
            instance.submit()
          }
        }
      }),
      createItem('button', {
        text: '重置',
        order: 1
      })
    ]
    // 2. define collection
    const Collection1 = createCollection('default', FormItems, {})
    const Collection2 = createCollection('default', SubmitBtns, {})
    // 3. define form
    const Form = createForm([Collection1, Collection2],
      {
        name_1: 1,
        name_2: 2
      },
      {
        hook: {
          beforeSubmit: (originData: any) => {
            return { ...originData, aa: 11 }
          },
          onSubmit: (val: any) => {
            console.log('submit啦~', val)
          }
        }
      })

    return () => (
      Form.render()
    )
  }
})

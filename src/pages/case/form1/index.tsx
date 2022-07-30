import { defineComponent } from 'vue'
import { createCollection, createForm, createItem } from '~/core'

export default defineComponent({
  name: 'CaseInputs',
  setup () {
    const modelData = reactive({
      newName: 1,
      olaName: ''
    })
    // 1. define items
    const FormItems = [
      createItem('input', {
        compSetting: {
          key: 'newName',
          prop: 'newName',
          label: '姓名'
        },
        customLabel: () => '姓名~~',
        order: 1
      }),
      createItem('input', {
        compSetting: {
          key: 'olaName',
          prop: 'olaName',
          label: '曾用名'
        },
        customLabel: () => '',
        computed: {
          show: (form: any) => !!form.newName
        },
        order: 2
      })
    ]
    const SubmitBtns = [
      createItem('button', {
        compSetting: {
          'text': false,
          'text-label': '提交',
          'type': 'primary',
          'class': 'mr-[8px]'
        },
        order: 2,
        hook: {
          onClick (instance: any) {
            instance.submit()
          }
        }
      }),
      createItem('button', {
        compSetting: {
          'text': true,
          'text-label': '重置',
          'class': 'mr-[8px]'
        },
        order: 1
      })
    ]
    // 2. define collection
    const Collection1 = createCollection('form-item', FormItems, {})
    const Collection2 = createCollection('default', SubmitBtns, {
      compSetting: {
        class: 'flex flex-row'
      }
    })
    // 3. define form
    const Form = createForm([Collection1, Collection2],
      modelData,
      {
        compSetting: {
          'label-width': '120px',
          'model': modelData,
          'rules': {
            olaName: [
              { required: true, message: '请输入曾用名~', trigger: ['blur', 'change'] }
            ]
          }
        },
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

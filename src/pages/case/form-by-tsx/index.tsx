import { defineComponent } from 'vue'
import { createCollection, createForm, createItem } from '~/core'

export default defineComponent({
  name: 'CaseInputs',
  setup () {
    const modelData = reactive({
      newName: 1,
      oldName: ''
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
          key: 'oldName',
          prop: 'oldName',
          label: '曾用名'
        },
        customLabel: () => '',
        computed: {
          show: (form: any) => {
            // 这里也可以对 form 中的数据进行操作，隐藏的 form-item 的数据应该被清掉
            form.oldName = ''
            // 此处需要返回一个 bollean 值用来标识是否需要显示该项 !!
            return !!form.newName
          }
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
            oldName: [
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

    return () => Form.render()
  }
})

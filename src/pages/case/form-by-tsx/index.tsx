import { defineComponent } from 'vue'
import { createCollection, createForm, createItem } from '~/core'

export default defineComponent({
  name: 'CaseForm1',
  setup (props, { expose, emit }) {
    const modelData = reactive({
      newName: 1,
      oldName: '',
      gender: '男'
    })
    // 1. define items
    const FormItems = [
      createItem('input', {
        compSetting: {
          key: 'newName',
          prop: 'newName',
          label: '姓名',
          clearable: true
        },
        customLabel: () => '姓名~~',
        order: 1
      }),
      createItem('input', {
        compSetting: {
          key: 'oldName',
          prop: 'oldName',
          label: '曾用名',
          clearable: true
        },
        customLabel: () => '',
        computed: {
          show: (form: any) => !!form.newName
        },
        order: 2
      }),
      createItem('select', {
        compSetting: {
          label: '性别',
          key: 'gender',
          prop: 'gender',
          clearable: true,
          options: [
            { label: '男', value: '男' },
            { label: '女', value: '女' }
          ]
        },
        customLabel: () => '',
        hook: {
          onClose (instance: any) {
            instance.setForm({ gender: '' })
          }
        },
        order: 3
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
            ],
            gender: [
              { required: true, message: '请选择性别~', trigger: ['blur', 'change'] }
            ]
          }
        },
        hook: {
          beforeSubmit: (originData: any) => {
            return { ...originData, aa: 11 }
          },
          onSubmit: (val: any) => {
            emit('submit', val)
            console.log('Form中的 submit 方法~', val)
          }
        }
      })
    // 暴露内部变量，供外部调用实例时获取使用。
    expose({ modelData })
    // 1.直接在setup中导出一个渲染函数
    return () => Form.render()

    // 2.setup函数中，在 render 中调用
    // return {
    //   Form
    // }
  }
  // render () {
  //   console.log(this.Form, 'ss')
  //   return this.Form.render()
  // }
})
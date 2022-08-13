import { defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { createCollection, createForm, createItem } from '~/core'

export default defineComponent({
  name: 'CaseForm1',
  setup (props, { emit }) {
    // 这里定义的对象一定要是一个 reactive 包裹的对象，建立响应式依赖，可以传递一个空对象。
    const modelData = reactive({
      newName: 1,
      oldName: '',
      gender: '男',
      checkbox_group: [],
      radio_group: '',
      switch_value: false,
      data_picker: ''
    })
    const CheckItems = [
      createItem('checkbox-button', {
        compSetting: {
          text: '显示姓名表单',
          key: 'name_1'
        }
      }),
      createItem('checkbox-button', {
        compSetting: {
          text: '显示性别菜单',
          key: 'gender_1'
        }
      }),
      createItem('checkbox-button', {
        compSetting: {
          text: '显示住址表单',
          key: 'name_2'
        }
      })
    ]
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
          style: {
            width: '100%'
          },
          options: [
            { label: '男', value: '男', disabled: false },
            { label: '女', value: '女', disabled: true }
          ]
        },
        customLabel: () => '',
        hook: {
          onClose (instance: any) {
            instance.setForm({ gender: '' })
          }
        },
        order: 3
      }),
      createItem('checkbox-group', {
        compSetting: {
          label: '多选择框~',
          prop: 'checkbox_group',
          key: 'checkbox_group',
          options: [
            { label: 'Option A - label', value: 'Option A - value' },
            { border: true, label: 'Option B - label', value: 'Option B - value', disabled: true }
          ]
        },
        order: 4
      }),
      createItem('radio-group', {
        compSetting: {
          label: '单选择框~',
          prop: 'radio_group',
          key: 'radio_group',
          options: [
            { label: 'Option A - label', value: 'Option A - value' },
            { border: true, label: 'Option B - label', value: 'Option B - value', disabled: true }
          ]
        },
        order: 4
      }),
      createItem('switch', {
        compSetting: {
          'label': 'switch选择框~',
          'prop': 'switch_value',
          'style': '--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949',
          'key': 'switch_value',
          'active-text': 'Pay by month',
          'inactive-text': 'Pay by year',
          'active-value': 100,
          'inactive-value': 0
        },
        order: 4
      }),
      createItem('date-picker', {
        compSetting: {
          'label': '时间选择',
          'prop': 'data_picker',
          'type': 'date',
          'placeholder': '请选择日期',
          'format': 'YYYY/MM/DD',
          'value-format': 'YYYY-MM-DD'
        },
        holidays: [
          '2022-08-01',
          '2022-08-02',
          '2022-08-03',
          '2022-08-04',
          '2022-08-05',
          '2022-08-06',
          '2022-08-07'
        ],
        order: 4
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
    const Collection1 = createCollection('default', CheckItems, {
      compSetting: {
        className: 'flex flex-row'
      }
    })
    const Collection2 = createCollection('form-item', FormItems, {})
    const Collection3 = createCollection('default', SubmitBtns, {
      compSetting: {
        class: 'flex flex-row'
      }
    })
    // 3. define form
    const Form = createForm([Collection1, Collection2, Collection3],
      modelData,
      {
        providerConfig: {
          size: 'large',
          locale: zhCn
        },
        compSetting: {
          'label-width': '120px',
          'model': modelData,
          'rules': {
            oldName: [
              { required: true, message: '请输入曾用名~', trigger: ['blur', 'change'] }
            ],
            gender: [
              { required: true, message: '请选择性别~', trigger: ['blur', 'change'] }
            ],
            checkbox_group: [
              { required: true, message: '请选择多选', trigger: ['blur', 'change'] }
            ],
            radio_group: [
              { required: true, message: '请选择单选', trigger: ['blur', 'change'] }
            ],
            data_picker: [
              { required: true, message: '请选择日期', trigger: ['blur', 'change'] }
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

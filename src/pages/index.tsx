import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { defineComponent, reactive } from 'vue'
import { createCollection, createForm, createItem } from '~/core'
import { rules } from '~/core/utils'

export default defineComponent({
  name: 'CaseForm1',
  emits: ['submit'],
  setup (props, { emit, expose }) {
    // 这里定义的对象一定要是一个 reactive 包裹的对象，建立响应式依赖，可以传递一个空对象。
    const modelData = reactive({
      showName: true,
      showGender: true,
      showAddress: true,
      newName: '',
      oldName: '',
      gender: '男',
      address: '',
      checkbox_group: [],
      radio_group: '',
      switch_value: false,
      data_picker: '2022-08-11',
    })
    type ModelData = typeof modelData

    const CheckItems = [
      createItem('checkbox-button', {
        compSetting: {
          text: '显示姓名表单',
          key: 'showName',
        },
      }),
      createItem('checkbox-button', {
        compSetting: {
          text: '显示性别菜单',
          key: 'showGender',
        },
      }),
      createItem('checkbox-button', {
        compSetting: {
          text: '显示住址表单',
          key: 'showAddress',
          style: {
            'margin-bottom': '10px',
          },
        },
      }),
    ]
    // 1. define items
    const FormItems = [
      createItem('input', {
        compSetting: {
          key: 'newName',
          prop: 'newName',
          label: '姓名',
          clearable: true,
          style: {
            width: '320px',
          },
        },
        customLabel: () => '姓名~~',
        computed: {
          show: (form: ModelData) => !!form.showName,
        },
        order: 1,
      }),
      createItem('input', {
        compSetting: {
          key: 'oldName',
          prop: 'oldName',
          label: '曾用名',
          clearable: true,
          style: {
            width: '320px',
          },
        },
        customLabel: () => '',
        computed: {
          show: (form: ModelData) => !!form.newName && !!form.showName,
        },
        order: 2,
      }),
      createItem('select', {
        compSetting: {
          label: '性别',
          key: 'gender',
          prop: 'gender',
          clearable: true,
          style: {
            width: '320px',
          },
          options: [
            { label: '男', value: '男' },
            { label: '女', value: '女' },
          ],
        },
        customLabel: () => '',
        computed: {
          show: (form: ModelData) => !!form.showGender,
        },
        order: 3,
      }),
      createItem('input', {
        compSetting: {
          label: '住址',
          key: 'address',
          prop: 'address',
          clearable: true,
          style: {
            width: '320px',
          },
        },
        customLabel: () => '',
        computed: {
          show: (form: ModelData) => !!form.showAddress,
        },
        order: 3,
      }),
      createItem('checkbox-group', {
        compSetting: {
          label: '多选择框~',
          prop: 'checkbox_group',
          key: 'checkbox_group',
          options: [
            { label: 'Option A - label', value: 'Option A - value' },
            { border: true, label: 'Option B - label', value: 'Option B - value' },
          ],
        },
        order: 4,
      }),
      createItem('radio-group', {
        compSetting: {
          label: '单选择框~',
          key: 'radio_group',
          prop: 'radio_group',
          options: [
            { label: 'Option A - label', value: 'Option A - value' },
            { border: true, label: 'Option B - label', value: 'Option B - value' },
          ],
        },
        order: 4,
      }),
      createItem('switch', {
        compSetting: {
          'label': 'switch选择框~',
          'key': 'switch_value',
          'prop': 'switch_value',
          'style': '--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949',
          'active-text': 'Pay by month',
          'inactive-text': 'Pay by year',
          'active-value': 100,
          'inactive-value': 0,
        },
        order: 4,
      }),
      createItem('date-picker', {
        compSetting: {
          'label': '时间选择',
          'key': 'data_picker',
          'prop': 'data_picker',
          'type': 'date',
          'placeholder': '请选择日期',
          'format': 'YYYY-MM-DD',
          'value-format': 'YYYY-MM-DD',
        },
        holidays: [
          '2022-10-01',
          '2022-10-02',
          '2022-10-03',
          '2022-10-04',
          '2022-10-05',
          '2022-10-06',
          '2022-10-07',
        ],
        order: 4,
      }),
    ]
    const SubmitBtns = [
      createItem('button', {
        compSetting: {
          'text': false,
          'text-label': '提交',
          'type': 'primary',
          'class': 'mr-[8px]',
        },
        order: 2,
        hook: {
          onClick (instance: any) {
            instance.submit()
          },
        },
      }),
      createItem('button', {
        compSetting: {
          'text': true,
          'text-label': '重置',
          'class': 'mr-[8px]',
        },
        order: 1,
      }),
    ]
    // 2. define collection
    const Collection1 = createCollection('default', CheckItems, {
      compSetting: {
        className: 'flex flex-row',
      },
    })
    const Collection2 = createCollection('form-item', FormItems, {})
    const Collection3 = createCollection('default', SubmitBtns, {
      compSetting: {
        class: 'flex flex-row',
      },
    })

    // 3. define form
    const Form = createForm([Collection1, Collection2, Collection3], modelData, {
      providerConfig: {
        locale: zhCn,
      },
      compSetting: {
        'label-width': '120px',
        'model': modelData,
        rules,
      },
      hook: {
        beforeSubmit: (originData: ModelData) => {
          return { ...originData, aa: 11 }
        },
        onSubmit: (val: ModelData) => {
          console.log(val, 'val in onSubmit')
          emit('submit', val)
        },
      },
    })

    expose({ modelData })
    // 1.直接在setup中导出一个渲染函数
    return () => Form.render()

    // 2.setup函数中，在 render 中调用
    // return {
    //   Form
    // }
  },
  // render () {
  //   console.log(this.Form, 'ss')
  //   return this.Form.render()
  // }
})

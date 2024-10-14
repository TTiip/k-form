import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { createCollection, createForm, createItem } from '~/core'
import { isTargetType } from '~/core/utils'

const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]

function validatePass ({
  value,
  callback,
  message,
}: {
  rule: any
  value: any
  callback: (...arg: any) => void
  message: string
}) {
  if (isTargetType(value, 'boolean')) {
    callback()
  } else if (isTargetType(value, 'number') && (value || value === 0)) {
    callback()
  } else if (isTargetType(value, 'array') && value.length !== 0) {
    callback()
  } else if (isTargetType(value, 'string') && value.trim()) {
    callback()
  } else {
    callback(message)
  }
}

function generateRules (modelData, messageMap = {}) {
  const rules = {}
  Object.keys(modelData).map(dataKey => {
    rules[dataKey] = {
      required: true,
      validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: messageMap[dataKey] ?? '虽然没配置提示信息，但是这里必须要选/填' }),
      trigger: ['blur', 'change'],
    }
  })
  return rules
}

export function useForm (emit) {
  return (defineStore('form', () => {
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
      data_picker: '',
      cascader: [],
    })

    const messageMap = {
      newName: 'newName',
      oldName: 'oldName',
      gender: 'gender',
      address: 'newName',
      checkbox_group: 'checkbox_group',
      radio_group: 'radio_group',
      switch_value: 'switch_value',
      data_picker: 'data_picker',
      cascader: 'cascader',
    }

    const rules = generateRules(modelData, messageMap)

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
      createItem('cascader', {
        compSetting: {
          label: '级联选择器',
          key: 'cascader',
          prop: 'cascader',
          clearable: true,
          props: {
            expandTrigger: 'hover' as const,
          },
          options,
        },
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
        hook: {
          onClick (instance: any) {
            instance.reset()
          },
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
          emit('submit', val)
        },
      },
    })
    return { modelData, Form }
  }))()
}

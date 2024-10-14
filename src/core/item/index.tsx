import { type Component, h } from 'vue'
import KButton from './components/button'
import KCascader from './components/cascader'
import Kcheckbox from './components/checkbox-button'
import KCheckBoxGroup from './components/checkbox-group'
import kDatePicker from './components/date-picker'
import KInput from './components/input'
import KRadioGroup from './components/radio-group'
import Kselect from './components/select'
import KSwitch from './components/switch'
import KBase from './shared/base'

const typeArray = [
  'button',
  'input',
  'select',
  'checkbox-button',
  'checkbox-group',
  'radio-group',
  'switch',
  'date-picker',
  'cascader',
] as const

type ComponentKeys = typeof typeArray[number]

type ComCollecTionType = {
  [K in ComponentKeys]: Component
}
const COMP_COLLECTION: ComCollecTionType = {
  'button': KButton,
  'input': KInput,
  'select': Kselect,
  'checkbox-button': Kcheckbox,
  'checkbox-group': KCheckBoxGroup,
  'radio-group': KRadioGroup,
  'switch': KSwitch,
  'date-picker': kDatePicker,
  'cascader': KCascader,
}

export function createItem (name: ComponentKeys, options: any) {
  // 这里不关心传入 h 函数的组件类型是字符串、组件实例、或是js，直接定义为any。
  const comp: any = COMP_COLLECTION[name] ? COMP_COLLECTION[name] : name
  return {
    render: () =>
      h(KBase, { options }, {
        default: (fn: (...args: any) => void) => h(comp, { options, fn }),
      }),
    options,
  }
}

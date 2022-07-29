import { defineComponent, reactive } from 'vue'
import { createItem } from '~/core'

export default defineComponent({
  name: 'CaseInput',
  setup () {
    const inputVal = reactive({
      name_1: 123
    })
    provide('form', inputVal)
    const Input = createItem('input', {
      key: 'name_1',
      label: '曾用名',
      compSetting: {
        size: 'large',
        placeholder: '请输入东西呀～'
      },
      hook: {
        onInput (val: any) {
          console.log('[val onChange]', val)
          inputVal.name_1 = val
        }
      }
    })
    return () => (
      // <Input />
      Input.render()
    )
  }
})

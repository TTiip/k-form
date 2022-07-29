import { defineComponent, inject } from 'vue'
import { ElInput } from 'element-plus'

export default defineComponent({
  name: 'KButton',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} }
  },
  setup (props) {
    const form: any = inject('form')
    const { fn, options } = props
    const defaultFn = () => console.error('初始化没有设置 onChange 事件~')
    console.log(form, 'form')
    console.log(form[options?.key], 'form[options?.key]')
    console.log(options?.key, 'options?.key')
    return () => (
      <div>
        <div>
          {form[options?.key]}
        </div>
        <ElInput
          {...options.compSetting}
          model-value = { form[options?.key] ?? '' }
          // 此处 fn?.onInput 一定存在，所以改变写法，判断调用的结果是否存在。不存在则执行 defaultFn。
          onInput = { fn?.onInput() ?? defaultFn }
        />
      </div>
    )
  }
})

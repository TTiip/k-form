import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'KButton',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} }
  },
  setup (props) {
    const { fn, options } = props
    const defaultFn = () => console.error('初始化没有设置 click 事件~')
    return () => (
      <ElButton
        {...options.compSetting}
        // 此处 fn?.onClick 一定存在，所以改变写法，判断调用的结果是否存在。不存在则执行 defaultFn。
        onClick={ fn?.onClick() ?? defaultFn }
      >
        { options.text }
      </ElButton>
    )
  }
})

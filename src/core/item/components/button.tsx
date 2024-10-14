import { ElButton } from 'element-plus'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KButton',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} },
  },
  setup (props) {
    const { fn, options } = props
    return () => (
      <ElButton
        {...options.compSetting}
        onClick={fn?.onClick()}
      >
        { options?.compSetting?.['text-label'] }
      </ElButton>
    )
  },
})

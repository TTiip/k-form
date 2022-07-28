import { defineComponent } from 'vue'
import { createItem } from '~/core'

export default defineComponent({
  name: 'CaseButton',
  setup () {
    const Button = createItem('button', {
      text: '提交',
      compSetting: {
        type: 'primary'
      },
      hook: {
        onClick (form: any) {
          console.log('[form click]', form)
        }
      }
    })
    return () => (
      // <Button />
      Button.render()
    )
  }
})

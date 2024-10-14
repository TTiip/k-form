import { defineComponent } from 'vue'
import Form from '~/pages/renderForm'

function submitFn (val) {
  console.log(val, 'submitFn')
}
export default defineComponent({
  name: 'Tndex',
  setup () {
    return () => (<Form onSubmit={submitFn} />)
  },
})

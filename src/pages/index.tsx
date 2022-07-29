import { defineComponent } from 'vue'
import Form1 from './case/form1'

export default defineComponent({
  name: 'PlayGround',
  setup () {
    return () => (
      <div>
        <Form1 />
        <div i-carbon-campsite text-4xl inline-block />
      </div>
    )
  }
})

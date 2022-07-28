import { defineComponent } from 'vue'
import FormInputs from './case/input'

export default defineComponent({
  name: 'PlayGround',
  components: { FormInputs },
  setup () {
    return () => (
      <div>
        <FormInputs />
        <div i-carbon-campsite text-4xl inline-block />
      </div>
    )
  }
})

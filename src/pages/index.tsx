import { defineComponent } from 'vue'
import FormButton from './case/button'
import FormInput from './case/input'

export default defineComponent({
  name: 'PlayGround',
  components: { FormButton },
  setup () {
    return () => (
      <div>
        <FormButton />
        <FormInput />
        <div i-carbon-campsite text-4xl inline-block />
      </div>
    )
  }
})

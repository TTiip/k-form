import { defineComponent } from 'vue'
import FormButton from './case/button'

export default defineComponent({
  name: 'PlayGround',
  components: { FormButton },
  setup () {
    return () => (
      <div>
        <FormButton />
        <div i-carbon-campsite text-4xl inline-block />
      </div>
    )
  }
})

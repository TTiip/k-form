import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TestRender',
  setup () {
    console.log(112233)
    return () => (
      <div>Hello World</div>
    )
    // TestRender
  }
})

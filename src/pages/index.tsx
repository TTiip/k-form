import FormByTsx from './case/form-by-tsx'
// import FormByVue from './case/form-by-vue/index.vue'

export default defineComponent({
  name: 'PlayGround',
  setup () {
    return () => (
      <div>
        <FormByTsx />
        {/* <FormByVue /> */}
        <div i-carbon-campsite text-4xl inline-block />
      </div>
    )
  }
})

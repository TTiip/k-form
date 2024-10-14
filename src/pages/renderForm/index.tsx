import { defineComponent } from 'vue'
import { useForm } from './hooks'

export default defineComponent({
  name: 'CaseForm1',
  setup (props, { emit, expose }) {
    // 这里定义的对象一定要是一个 reactive 包裹的对象，建立响应式依赖，可以传递一个空对象。
    const { modelData, Form } = useForm(emit)

    expose({ modelData })
    // 1.直接在setup中导出一个渲染函数
    return () => Form.render()

    // 2.setup函数中，在 render 中调用
    // return {
    //   Form
    // }
  },
  // render () {
  //   console.log(this.Form, 'ss')
  //   return this.Form.render()
  // }
})

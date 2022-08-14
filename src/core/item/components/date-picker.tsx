import { ElDatePicker } from 'element-plus'
// 引入模块css 在 tsx 中避免 class 类名污染
import classModule from './date-picker.module.css'

export default defineComponent({
  name: 'KDatePicker',
  props: {
    options: { type: Object, default: () => {} },
    fn: { type: Object, default: () => {} }
  },
  setup (props) {
    const form: any = inject('form')
    const { fn, options } = props

    const isHoliday = (cell: any) => {
      return options?.holidays?.includes(cell.dayjs.format('YYYY-MM-DD'))
    }

    return () => (
      <ElDatePicker
        {...options?.compSetting}
        modelValue = { form?.[options?.compSetting?.key] ?? '' }
        onUpdate:modelValue = { fn?.onChange }
        v-slots={{
          default: (cell: any) => {
            return (
              <div className={`${classModule.cell} ${cell?.isCurrent ? classModule.isCurrent : ''}`}>
                <span className={ classModule.text }>{cell.text}</span>
                {
                  isHoliday(cell)
                    ? <span className={classModule.holiday} />
                    : null
                }
              </div>
            )
          }
        }}
      />
    )
  }
})

// 这里必须这么写 具体原因不详，待研究。
import 'vue'

declare module 'vue' {
  // 设置 标签中 的自定义属性，避免类型检测报错。
  interface HTMLAttributes {
    className?: unknown
  }
}

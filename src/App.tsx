import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppComponent',
  setup () {
    const config = {
      size: 'default',
      message: {
        max: 3,
      },
      button: {
        autoInsertSpace: true,
      },
      locale: zhCn,
    }

    return () => (
      <ElConfigProvider {...config}>
        <main class="font-sans text-gray-700 dark:text-gray-200">
          <router-view />
        </main>
      </ElConfigProvider>
    )
  },
})

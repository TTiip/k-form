import { defineComponent } from 'vue'

export default defineComponent({
  name: '404',
  setup () {
    return () => (
      <div class="s-10 bg-box w-300px h-300px">
        路由没找到，如果设置页面重定向，不会跳转到这个页面~
      </div>
    )
  },
})

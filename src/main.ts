import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~/router'
import App from './App'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
// 预加载icon 并且使用icon的时候需要以下步骤之一
// 1.将标签设置为块级标
// 2.父级标签设置flex
// 3.自身标签设置flex
import './unocss-icon'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/dark-css-vars.css'

// console.log(routes, 'routes')

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 这里也可以配置 路由导航
// router.beforeEach((to, from, next) => {
//   if (to.matched.length === 0) {
//     // 如果未匹配到路由
//     from.name ? next({ name: from.name }) : next('/')
//   } else {
//     // 如果匹配到正确跳转
//     next()
//   }
// })

app.use(router)

// 可加上 options { eager: true } 直接引入所有的模块
Object.values(import.meta.glob('./modules/*.ts', { eager: true }))
  .map((module: any) => {
    // 第一个参数为对应的 插件
    // 第二个参数为需要传递的 数据 可以是实例、数据、参数等等
    app.use(module.default, { router })
  })
app.mount('#app')

// https://vitejs.cn/vite3-cn/guide/features.html#glob-import
const pages = import.meta.glob('../pages/**/page.ts', {
  // 匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk。如果你倾向于直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用），你可以传入 { eager: true } 作为第二个参数：
  eager: true,
  // 设置 import 为 default 可以加载默认导出。
  import: 'default',
})

const pageComps = import.meta.glob('../pages/**/index.tsx')

let routes: any[] = Object.entries(pages).map(([path, config]) => {
  const routePath = path.replace('../pages', '').replace('/page.ts', '') || '/index'
  const name = routePath.split('/').filter(Boolean).join('-')
  const compPath = path.replace('page.ts', 'index.tsx')

  return {
    path: routePath,
    name,
    meta: config,
    component: pageComps[compPath],
  }
})

routes = [
  ...routes,
  {
    path: '/:catchAll(.*)',
    meta: {},
    redirect: '/404',
  },
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/404',
    name: '404',
    meta: {},
    component: () => import('~/pages/[...all]'),
  },
]

export default routes

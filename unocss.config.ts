// 预加载icon 并且使用icon的时候需要以下步骤之一!!!
// 1.将标签设置为块级标
// 2.父级标签设置flex
// 3.自身标签设置flex

import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  // 自定义类名
  rules: [
    ['bg-box', { background: '#ff6700' }],
    // 此处报错 d / 4 不用理会
    [/^s-(\d+)$/, ([, d]) => ({ margin: `${d as any / 4}rem` })],
    [/^p-(\d+)$/, match => ({ padding: `${match[1] as any / 4}rem` })],
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: 'var(--el-color-primary)',
        // eslint-disable-next-line no-sequences
        ...Array.from({ length: 9 }).fill('').reduce((a, _, index) => (a[index + 1] = `rgba(var(--el-color-primary-rgb) / ${index + 1}0%)`, a), {}),
      },
    },
  },
  shortcuts: [
    ['btn', 'inline-block cursor-pointer text-base select-none transition duration-200 ease-in-out !hover:text-primary text-gray-500  dark:text-gray-200'],
    ['layout', 'flex flex-col flex-nowrap bg-zinc-100 dark:bg-zinc-800 overflow-hidden'],
    ['main', 'm-3 p-3 pb-2 bg-white dark:bg-zinc-900 shadow rounded flex flex-1 flex-col gap-2 overflow-auto'],
  ],
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  // css 中使用原子化 类名
  // @apply 这种写法
  transformers: [
    transformerDirectives(),
  ],
  // 预加载 class 对应的样式 (配置安全列表)
  safelist: [
    ...[
      'blue-500',
      'teal-500',
      'indigo-500',
      'rose-500',
    ].map(i => `group-hover:bg-${i} text-${i}`).join(' ').split(' '),
  ],
})

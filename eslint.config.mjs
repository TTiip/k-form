import antfu from '@antfu/eslint-config'

export default antfu({
  // .vue 文件不检测
  vue: false,
  typescript: true,
  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,
}, {
  rules: {
    // 禁止使用空对象
    'ts/no-empty-object-type': 'off',
    // 测试文件中 不能使用 test.only
    'test/no-only-tests': 'off',
    // 禁止未使用过的变量
    'unused-imports/no-unused-vars': 'off',
    // 强制排序命名导出(https://perfectionist.dev/rules/sort-named-exports.html)
    'perfectionist/sort-named-exports': [
      'error',
      {
        type: 'line-length', // line-length 按代码行的长度对项目进行排序(较短的行在前)
        order: 'asc', // 排序规则
        ignoreCase: true, // 排序是否区分大小写
        partitionByComment: false, // 允许您使用注释将导出内容分隔到逻辑组中。false 表示注释不用做分隔符
        partitionByNewLine: false, // 如果导出之间有空行，则规则不会对导出进行排序。这对于按定义的顺序保持逻辑上分离的导出组非常有用
        groupKind: 'mixed', // 没看懂啥意思
      },
    ],
    // 测试文件 使用 it 代替 test
    'test/consistent-test-it': 'off',
    // // 导出模块的规范格式化(https://perfectionist.dev/rules/sort-exports)
    // 'perfectionist/sort-exports': [
    //   'error',
    //   {
    //     type: 'alphabetical', // alphabetical 按字母顺序导出
    //     order: 'asc', // 排序规则
    //     ignoreCase: true, // 排序是否区分大小写
    //     partitionByComment: false, // 允许您使用注释将导出内容分隔到逻辑组中。false 表示注释不用做分隔符
    //     partitionByNewLine: false, // 如果导出之间有空行，则规则不会对导出进行排序。这对于按定义的顺序保持逻辑上分离的导出组非常有用
    //     groupKind: 'mixed', // 没看懂啥意思
    //   },
    // ],
    // 这条规则执行了每行允许的最大语句数。
    'style/max-statements-per-line': 'off',
    // 正则使用捕获组
    'regexp/no-unused-capturing-group': 'off',
    // process 全局模块必须导入 声明后才能使用
    'node/prefer-global/process': 'off',
    // 要求使用 Error 对象作为 Promise 拒绝原因
    'prefer-promise-reject-errors': 'off',
    // 用export暴露模块内容时，不应暴露可更改的数据
    'import/no-mutable-exports': 'off',
    // 强制数组方法的回调函数中有 return 语句
    'array-callback-return': 'off',
    // tsx jsx中标签使用className替代class
    'react/no-unknown-property': 'off',
    // JSX、TSX 函数组件必须需要函数名 (可以在JSX、TSX中使用 'name' 属性定义组件名)
    'react/display-name': 'off',
    // 参数仅在 需要 () 包裹 时才包裹
    'style/arrow-parens': ['error', 'as-needed'],
    // 参数仅在 需要 () 包裹 时才包裹
    'arrow-parens': ['error', 'as-needed'],
    // 关闭 let 转换成 const
    'prefer-const': 'off',
    // 强制使用 两个字符 缩进
    'style/indent': ['error', 2, {
      // switch case 开头的缩进 1 * 2
      SwitchCase: 1,
    }],
    // 强制使用 两个字符 缩进
    'indent': ['error', 2, {
      // switch case 开头的缩进 1 * 2
      SwitchCase: 1,
    }],
    // 函数参数 不使用换行
    'function-paren-newline': ['error', 'never'],
    // 函数左括号前一定要加 空格
    'style/space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always',
    }],
    // 函数左括号前一定要加 空格
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always',
    }],
    // 当仅有一个判断的时候，必须使用 {} 包裹
    'curly': ['error', 'all'],
    // 花括号是不是换行
    // 'object-curly-newline': ['error', {
    //   ObjectExpression: {
    //     // 多个换行
    //     multiline: true,
    //     // 超过或等于这个数量就换行
    //     minProperties: 1,
    //     // 如果对象中属性注释或不存在属性换行不报错。
    //     consistent: true
    //   },
    //   ObjectPattern: {
    //     multiline: true,
    //     minProperties: 1
    //   },
    //   ImportDeclaration: {
    //     multiline: true,
    //     minProperties: 2
    //   },
    //   ExportDeclaration: {
    //     multiline: true,
    //     minProperties: 2
    //   }
    // }],
    // 强制将对象的属性放在不同的行上
    // 'object-property-newline': ['error', {
    //   // 对象属性放在同一行(true 不换行) 但是不知道为什么不生效。。。
    //   allowAllPropertiesOnSameLine: false
    // }],
    // 不允许使用tab缩进
    'style/no-tabs': 'off',
    // 不允许使用tab缩进
    'no-tabs': 'off',
    // 不允许使用 console
    'no-console': 'off',
    // 不允许使用 debugger
    'no-debugger': 'off',
    // 禁止使用特定的语法
    'no-restricted-syntax': 'off',
    // {} 括号和 else 换行风格。
    'style/brace-style': ['error', '1tbs', {
      allowSingleLine: true,
    }],
    // {} 括号和 else 换行风格。
    'brace-style': ['error', '1tbs', {
      allowSingleLine: true,
    }],
    // 逗号前面不要空格，后面必须空格
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    // 末尾逗号使用规则配置
    'style/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    // 末尾逗号使用规则配置
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
  },
})
  .renamePlugins({
    'import-x': 'import',
    'n': 'node',
    'yml': 'yaml',
    '@typescript-eslint': 'ts',
    '@stylistic': 'style',
    'vitest': 'test',
  })

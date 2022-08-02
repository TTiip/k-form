<template>
  测试 vue 文件中使用 tsx 文件
  <Form />
</template>

<script lang="ts" setup>
// 这里的组件名一定记得大写开头，否则会被视为自定义标签，不会当作组件解析，也不会报错。
  import Form from './form'
</script>

# 组件参数说明

> 详细使用可以查看 [form-by-vue](../../../../src/pages/case/form-by-vue/) 的在 vue 中使用 tsx 的示例。
## 部分参数说明
```javascript
设计模式思想为，将最小的原子化的东西指定为每一个 form 表单的 item 中的组件（input、select等）
主要核心函数为三个分别为 createItem、createCollection、createForm。

createItem: 创建最小单位的原子化 form-item 组件。

createCollection: 在最小原子化组件单位上，包裹一层集合层，做组件渲染，数据传递、以及组件初始化之前的一些操作使用。

createForm: 利用之前 创建的 表单集合层，生成 form 表单。
```

## createForm 参数说明:
```ts
createItem(elementType: string, componentOptions: object)

example

createItem('select', {
	compSetting: {
		label: '性别',
		key: 'gender',
		prop: 'gender',
		clearable: true,
		style: {
			width: '100%'
		},
		options: [
			{ label: '男', value: '男', disabled: false },
			{ label: '女', value: '女', disabled: true }
		]
	},
	order: 3,
	customLabel: () => '',
	hook: {
		onClose (instance: any) {
			instance.setForm({ gender: '' })
		}
	}
})
```

```ts
createItem 接收两个参数，第一个参数为 创建的组件类型，第二个参数为其对应的 options 配置项。

使用ts限制了 第一个参数的类型 目前支持的参数参考 (@/core/item/index.tsx) 中定义的类型。

第二个参数 componentOptions
{
  compSetting: object,
  customLabel: function, // TODO: 暂时没做直接使用字符串的，后面加上
  computed: {
    show: (form: any) => !!form.newName
  },
  order: number
}

1.compSetting: 类型为对象。所有和 element-plus 组件相关的属性放置在这个里面，包括但不限于（label、key、clearable、options），同时为了方便，表单组件校验的 prop 的也在此处设置。

2.customLabel: 类型为函数，返回用户自己定义的 form-item 显示的 label。

3.computed: 类型为对象。目前只有一个 show 的功能，类型是一个函数，函数的参数为传递的绑定的 form 表单对象值组成的对象。（其实就是用来方便做组件 form-item 之间联动用的。）

4.order: 类型为数字。顾名思义就是排序生成的 form-item 用的。

5.hook: 类型为对象。定义一些函数在组件 某些特定的时间去调用，目前支持 onClick、 onChange、 onInput，分别对应点击、修改、输入框修改事件等，参数为组件实例。点击事件比较特殊，特别处理，有兴趣自己看看源码。

6.holidays: 类型为数组。date-picker组件特有属性，方便设置组件选择时，某些日期的特殊显示，目前是做的假期日期下方出现一个小红点~。
```

## createCollection 参数说明:

```ts
createCollection(collectionType: string, items: object, options: object)

example
createCollection('default', SubmitBtns, {
	compSetting: {
		class: 'flex flex-row'
	}
}
createCollection 接收三个参数，第一个参数为 创建的组件类型，第二个为对应的集合层中的 form-item 组件，第三个参数为其对应的 options 配置项。

使用ts限制了 第一个参数的类型 目前支持的参数参考 (@/core/collection/index.tsx) 中定义的类型。

第一个参数 简单提一下，目前支持两种方式，一种是 默认的格式，就是直接渲染出来的，另一种就是 渲染成 form-item 集合层。

第二个参数 没少好说的。

第三个参数 componentOptions 类型为一个对象
1.compSetting 接收一个对象，目前只设计接收一个 class（className） 去定义集合层的样式。也可以使用 style 去设置~

```

## createForm 参数说明:
```ts
createForm(collections: any, initForm?: object, options?: object)

createCollection 接收三个参数，第一个参数为 集合层组成的数组 ，第二个为 from 表单默认初始化绑定的值，第三个参数为其对应的 options 配置项。

第一个参数 直接过。

第二个参数 提一嘴，需要和 element-plus form 表单绑定的 model 一样设置每个 form-item 对应key的值，使用 reactive 或者 ref 进行包裹，因为校验的时候只能根据收集好依赖的数据进行处理，否则改了数据校验也会有问题。

第三个参数: 类型为一个对象。

1.providerConfig 全局提供的属性，用来修改表单中的统一属性，例如 size 等

2.compSetting 和之前的差不多，也是一些组件能够设置上的属性，全部放置在这里。
	包括但不限于（labe-width、model、rules）

3.hook: form 表单的自定义方法。目前提供两个方法 beforeSubmit & onSubmit。
	beforeSubmit: 类型为一个函数。顾名思义，在提交表单之前做的处理操作。参数为提交时绑定的 form 表单的数据组成的集合。（需要处理数据在这里操作，处理完的数据会传递给内部的 submit 函数。）
	onSubmit: 类型为一个函数。提交时触发的操作。
```

import type { RuleItemType } from '../types'

// Object.prototype[Symbol.toStringTag] = 'Person' -->
// 对象调用 toString 方法时，返回 '[object Person]'

/* ======== 禁用修改 Object.prototype.toString ========
// 保存原始的 toString 方法
const originalToString = Object.prototype.toString;

// 重写 toString 方法
Object.prototype.toString = function() {
  // 临时移除 Symbol.toStringTag 属性
  const hasToStringTag = this && typeof this === 'object' && Symbol.toStringTag in this;
  let originalTag;

  if (hasToStringTag) {
    originalTag = this[Symbol.toStringTag];
    delete this[Symbol.toStringTag];
  }

  // 调用原始的 toString 方法
  const result = originalToString.call(this);

  // 恢复 Symbol.toStringTag 属性
  if (hasToStringTag) {
    this[Symbol.toStringTag] = originalTag;
  }

  return result;
};

// 示例对象
const myObject = {
  [Symbol.toStringTag]: 'MyCustomObject'
};

console.log(Object.prototype.toString.call(myObject)); // "[object Object]" */

function isTargetType (value: unknown, target: string) {
  const valueType = Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()
  const targetType = target.toLocaleLowerCase()
  return valueType === targetType
}

const validatePass = ({
  value,
  callback,
  message
}: {
	rule: any
	value: any
	callback: (...arg: any) => void
	message: string
}) => {
  if (isTargetType(value, 'boolean')) {
    callback()
  } else if (isTargetType(value, 'number') && (value || value === 0)) {
    callback()
  } else if (isTargetType(value, 'array') && value.length !== 0) {
    callback()
  } else if (isTargetType(value, 'string') && value.trim()) {
    callback()
  } else {
    callback(message)
  }
}

export const rules: RuleItemType = {
  newName: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: '请填写姓名' }),
    trigger: ['blur', 'change']
  },
  oldName: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: '请填写曾用名' }),
    trigger: ['blur', 'change']
  },
  gender: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: '请选择性别' }),
    trigger: ['blur', 'change']
  },
  address: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: '请填写地址' }),
    trigger: ['blur', 'change']
  },
  checkbox_group: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: '请选择多选' }),
    trigger: ['blur', 'change']
  },
  radio_group: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: '请选择单选' }),
    trigger: ['blur', 'change']
  },
  switch_value: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: '请选择switch单选' }),
    trigger: ['blur', 'change']
  },
  data_picker: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: '请选择时间' }),
    trigger: ['blur', 'change']
  }
}

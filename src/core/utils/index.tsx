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

export function isTargetType (value: unknown, target: string) {
  const valueType = Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()
  const targetType = target.toLocaleLowerCase()
  return valueType === targetType
}

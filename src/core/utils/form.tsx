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
  if (!value) {
    return callback(new Error(message))
  }
  return callback()
}

interface RuleItemType {
	[propName: string]: {
		required?: boolean
		validator: (...arg: any) => void
		trigger: string | string[]
	}
}

export const rules: RuleItemType = {
  newName: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: 'newName - validate' }),
    trigger: ['blur', 'change']
  },
  oldName: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: 'oldName - validate' }),
    trigger: ['blur', 'change']
  },
  gender: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: 'oldName - validate' }),
    trigger: ['blur', 'change']
  },
  address: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: 'oldName - validate' }),
    trigger: ['blur', 'change']
  },
  checkbox_group: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: 'oldName - validate' }),
    trigger: ['blur', 'change']
  },
  radio_group: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: 'oldName - validate' }),
    trigger: ['blur', 'change']
  },
  switch_value: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: 'oldName - validate' }),
    trigger: ['blur', 'change']
  },
  data_picker: {
    required: true,
    validator: (rule: any, value: any, callback: (...arg: any) => void) => validatePass({ rule, value, callback, message: 'oldName - validate' }),
    trigger: ['blur', 'change']
  }
}

export interface RuleItemType {
	[propName: string]: {
		required?: boolean
		validator: (...arg: any) => void
		trigger: string | string[]
	}
}

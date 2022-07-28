import { h } from 'vue'
import KBase from './shared/base.jsx'
import kButton from './components/button.jsx'

const COMP_COLLECTION = {
  button: kButton
}

export function createItem (name, options) {
  const comp = COMP_COLLECTION[name] ? COMP_COLLECTION[name] : name
  return {
    render: () =>
      h(KBase,
        { options },
        {
          default: fn => h(comp, { options, fn })
        }),
    options
  }
}

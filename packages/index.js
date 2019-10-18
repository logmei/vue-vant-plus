import Line from './directive/line'
import FieldTip from './directive/field-focus-tip'

const directives = {
  Line,
  FieldTip
}

const install = Vue => {
  if(install.installed) return
  install.installed = true
  Object.values(directives).map(directive => {
    Vue.directive(directive.name,directive)
  })
}

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

export default install
export {
  Line,
  FieldTip
}
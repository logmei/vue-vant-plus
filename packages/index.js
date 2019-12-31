import Line from './directive/line'
import FieldTip from './directive/field-focus-tip'

import handleListInfo from './utils/handleListInfo.js'

import VlpButton from './components/button'
import VlpCalendar from './components/calendar'
import VlpSearch from './components/search'
import VlpList from './components/list'
import VlpDetail from './components/detail'
import VlpSteps from './components/steps'
import VlpTouch from './components/touch'
// 自定义指令
const directives = {
  Line,
  FieldTip
}
// 组件
const components = {
  VlpButton,
  VlpCalendar,
  VlpSearch,
  VlpList,
  VlpDetail,
  VlpSteps,
  VlpTouch
}

const install = Vue => {
  if (install.installed) return
  install.installed = true
  Object.values(directives).map(directive => {
    Vue.directive(directive.name, directive)
  })

  Object.values(components).map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
export {
  Line,
  FieldTip,
  VlpButton,
  VlpCalendar,
  VlpSearch,
  VlpList,
  VlpDetail,
  VlpSteps,
  VlpTouch,
  handleListInfo
}

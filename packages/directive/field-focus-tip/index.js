import { showTheTip, deleteTheTip } from './showTip.js'
const FieldShowTip = {
  name: 'fieldTip',
  bind: function(el, binding) {
    showTheTip(el, binding)
  },
  unbind: function(el, binding) {
    deleteTheTip(el, binding)
  }

}

const install = Vue => {
  Vue.directive(FieldShowTip.name, FieldShowTip)
}

if (typeof window !== 'undefined' && window.Vue) {
  window[FieldShowTip.name] = FieldShowTip
  window.Vue.use(install)
}

FieldShowTip.install = install
export default FieldShowTip

import VlpTouch from './index.vue'
const install = Vue => {
  if (install.installed) return
  install.installed = true
  Vue.component(VlpTouch.name, VlpTouch)
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
VlpTouch.install = install
export default VlpTouch

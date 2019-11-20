import VlpSteps from './steps.vue'
const install = Vue => {
  if (install.installed) return
  install.installed = true
  Vue.component(VlpSteps.name, VlpSteps)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
VlpSteps.install = install
export default VlpSteps

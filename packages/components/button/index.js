import VlpButton from './button.vue'
VlpButton.install = Vue => Vue.component(VlpButton.name, VlpButton)
if (typeof window !== 'undefined' && window.Vue) {
  VlpButton.install(window.Vue)
}

export default VlpButton

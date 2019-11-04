import VlpList from './list.vue'
VlpList.install = Vue => Vue.component(VlpList.name, VlpList)
if (typeof window !== 'undefined' && window.Vue) {
  VlpList.install(window.Vue)
}

export default VlpList

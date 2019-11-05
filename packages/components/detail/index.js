import VlpDetail from './detail.vue'
VlpDetail.install = Vue => Vue.component(VlpDetail.name, VlpDetail)
if (typeof window !== 'undefined' && window.Vue) {
  VlpDetail.install(window.Vue)
}

export default VlpDetail

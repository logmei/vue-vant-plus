import VlpPullRefresh from './pullRefresh.vue'
VlpPullRefresh.install = Vue => Vue.component(VlpPullRefresh.name, VlpPullRefresh)
if (typeof window !== 'undefined' && window.Vue) {
  VlpPullRefresh.install(window.Vue)
}

export default VlpPullRefresh

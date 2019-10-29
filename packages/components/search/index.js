import VlpSearch from './search.vue'
VlpSearch.install = Vue => Vue.component(VlpSearch.name, VlpSearch)
if (typeof window !== 'undefined' && window.Vue) {
  VlpSearch.install(window.Vue)
}

export default VlpSearch

import VlpSearch from './search.vue'
const install = Vue => {
  if (install.installed) return
  install.installed = true
  Vue.component(VlpSearch.name, VlpSearch)
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
VlpSearch.install = install
export default VlpSearch

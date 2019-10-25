import { debounce } from '../../utils/index.js'
// class Aspects {
//   // constructor() {}
//   before(target, method, advice) {
//     const original = target[method]
//     target[method] = function() {
//       (advice)()
//       original.apply(target, arguments)
//     }
//     return target
//   }
// }
// const aspect = new Aspects()

// function decorateDebounce(el, func) {
//   console.log('decorateDebounce')
//   // const result = debounce(func, 10000, true)
//   // el.disabled = true
//   return debounce(func, 10000, true)
// }

function bindDebounce(el) {
  console.log('bindDebounce')
  el.onClick = debounce(function(e) {
    console.log('.............')
  }, 1000, true)
  // el.onClick = decorateDebounce(el, el.onClick)
  // el.onTouchstart = decorateDebounce(el, el.onTouchstart)
}

const debounceDirective = {
  name: 'debounce',
  bind: function(el) {
    bindDebounce(el)
  }
}

const install = Vue => {
  if (install.installed) return
  install.installed = true
  Vue.directive(debounceDirective.name, debounceDirective)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(debounceDirective)
}
debounceDirective.install = install

export default debounceDirective

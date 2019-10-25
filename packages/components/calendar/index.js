/**
 * Created by ZWH on 2017/6/22.
 */
import Calendar from './calendar.vue'

const install = Vue => {
  if (install.installed) return
  install.installed = true
  Vue.directive(Calendar.name, Calendar)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(Calendar)
}
Calendar.install = install

export default Calendar

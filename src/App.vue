<template>
  <div id="app">
    <Calendar/>
    <EvaluateInfo/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Debounce from './components/debounce.vue'

import Calendar from './components/calendar.vue'
import EvaluateInfo from './components/evaluateInfo.vue'
export default {
  name: 'App',
  components: {
    Calendar,
    EvaluateInfo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

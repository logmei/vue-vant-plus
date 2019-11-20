<template>
  <div id="app">
    <router-link class="head" to="/list">列表</router-link>|
    <router-link class="head" to="/calendar">calendar</router-link>|
     <router-link class="head" to="/steps">steps</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/list.vue'
// import Debounce from './components/debounce.vue'

// import Calendar from './components/calendar.vue'
// import EvaluateInfo from './components/evaluateInfo.vue'
import { Button } from 'vant'
export default {
  name: 'App',
  components: {
    [Button.name]: Button
    // Calendar,
    // EvaluateInfo
    // HelloWorld
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  .head{
    text-align: center;
    color: #999999
  }
}
</style>

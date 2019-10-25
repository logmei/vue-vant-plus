<template>
  <div id="app">
    <Debounce/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Debounce from './components/debounce.vue'

export default {
  name: 'app',
  components: {
    Debounce
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div class="hello">
    <!-- <vlp-pull-refresh
    :loading.sync="refreshLoading"> -->
      <!-- <vlp-button>查询</vlp-button>
      <van-divider /> -->

      <vlp-search
      v-model="searchValue"
      placeholder="服务单号/客户名称"
      :tipInterface="searchListInterface"
      :params="{id:23}">查询</vlp-search>
    <!-- </vlp-pull-refresh> -->
  </div>
</template>

<script>
import Vue from 'vue'
import VantPlus from '../../packages'
Vue.use(VantPlus)
import { searchList } from '../test/interface.js'
import { Divider } from 'vant'
Vue.use(Divider)

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      loading: false,
      refreshLoading: false,
      searchValue: '',
      searchListInterface: searchList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

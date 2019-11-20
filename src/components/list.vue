<template>
<div>
  <van-sticky>
<van-nav-bar
  title="标题"
  left-text="返回"
  left-arrow

>
  <van-icon name="search" slot="right" @click="searchPage"/>
</van-nav-bar>
</van-sticky>

  <List
  :interface-fun="searchList"
  :columns = "columns"
  ></List>
  <Search
  v-model="searchValue"
  class="search-class"
  :displayVisible.sync="visible"
  :tipInterface="searchListInterface"
  :historyList="historyList"
  @search="searchFun"></Search>
</div>

</template>
<script>
import { NavBar, Icon, Row, Sticky } from 'vant'
import List from '../../packages/components/list/list.vue'
import Search from '../../packages/components/search/search.vue'
import { cardLabel } from './list.js'
import { searchListObj, searchList } from '../api/listPage.js'
export default {
  components: {
    List,
    Search,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Sticky.name]: Sticky
  },
  data() {
    return {
      searchList: searchListObj,
      searchListInterface: searchList,
      columns: cardLabel,
      visible: false,
      searchValue: '',
      historyList: []
    }
  },
  methods: {
    searchFun(v) {
      console.log('searchFun', v)
    },
    searchPage() {
      this.$router.push('/searchPage')
    }
  }
}
</script>
<style lang="less" scoped>
.search-class{
  position: absolute;
}
</style>

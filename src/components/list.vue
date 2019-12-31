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

 <div class="nav-bar-menu">
      <van-tabs v-model="activeMenuCode" @click="chooseMenu">
        <van-tab
        v-for="(menu,key) in menus"
        :name="'menu'+menu.code"
        :key="key">
          <div slot="title" class="menu-title-class">
            {{menu.name}}
            <span v-if="menu.total" v-show="activeMenuCode !== 'menu'+menu.code" class="menu-total-class">{{menu.total}}</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
</van-sticky>
 <div class="nav-bar-filter">
        <span>共<label>{{total}}</label>条记录</span> <span @click="searchShow=true">筛选<van-icon name="filter-o" /></span>
      </div>
  <List
  :interface-fun="searchList"
  :columns = "columns"
  :parameter="parameter"
  :load.sync="listLoad"
  @loaded="listLoaded"
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
import { NavBar, Icon, Row, Sticky, Tab, Tabs } from 'vant'
import List from '../../packages/components/list/list.vue'
import Search from '../../packages/components/search/search.vue'
import { cardLabel } from './list.js'
import { searchListObj, searchList, getMenuListTotal } from '../api/listPage.js'
export default {
  components: {
    List,
    Search,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Sticky.name]: Sticky,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      searchList: searchListObj,
      searchListInterface: searchList,
      columns: cardLabel,
      visible: false,
      searchValue: '',
      historyList: [],
      menus: [
        { name: '全部', code: -1, total: 0 },
        { name: '标签1', code: 0, total: 0 },
        { name: '标签2', code: 1, total: 0 },
        { name: '标签3', code: 2, total: 0 },
        { name: '标签4', code: 3, total: 0 },
        { name: '标签5', code: 4, total: 0 },
        { name: '标签6', code: 5, total: 0 },
        { name: '标签7', code: 6, total: 0 }
      ],
      activeMenuCode: -1,
      listLoad: false,
      total: 0,
      parameter: {}
    }
  },
  created() {
    // 添加总数
    getMenuListTotal().then(response => {
      const totals = response.result
      this.menus = this.menus.map(v => {
        v.total = totals[v.code]
        return v
      })
    })
  },
  methods: {
    searchFun(v) {
      console.log('searchFun', v)
    },
    searchPage() {
      this.$router.push('/searchPage')
    },
    chooseMenu() {
      this.parameter = { ...this.parameter, implStatus: this.activeMenuCode }
    },
    // 列表加载完成
    listLoaded(v) {
      this.total = v.total
    }
  }
}
</script>
<style lang="less" scoped>
.search-class{
  position: absolute;

}
.nav-bar-menu {
       font-size: 15px;
          .van-tab{
            color: #666666;
            max-width: 76px;
        }
        .van-tab--active{
          color: #23C2B7
        }
        .van-tabs__line{
            width: 20px !important;
            background: rgba(35,194,183,1);
            border-radius: 3px !important;
        }
        .van-hairline--top-bottom:after, .van-hairline-unset--top-bottom:after{
          border-width:0
        }
         .menu-title-class{
           position: relative;
            .menu-total-class{
            position: absolute;
            top: 3px;
            right: 0;
            display: inline-block;
            width: 20px;
            height: 20px;
            background: rgba(248, 11, 2, 0.8);
            border-radius: 50%;
            text-align: center;
            line-height: 21px;
            color: #ffffff;
            font-size: 11px;
            transition: background 1s;
         }
         }

     }
     .nav-bar-filter {
        font-size:13px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:18px;
        display: flex;
        justify-content:space-between;
        padding: 11px 15px 0;
        span:first-child{
          label{
            font-size:14px;
            font-weight:600;
            color:rgba(51,51,51,1);
            padding:0 5px;
          }
        }
        span:last-child{
          font-size: 14px;
          color: #666666;
          .van-icon{
            color: #333333;
            font-size: 12px;
            vertical-align: middle;
            padding-left: 5px;
          }
        }
     }
</style>

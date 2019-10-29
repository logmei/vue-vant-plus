<template>
<div class="vlp-search">
   <van-search
    v-model="searchValue"
    :placeholder="placeholder"
    show-action
    shape="round"
    @search="onSearch"
    @clear="onClear"
    @input="showTips"
  >
  <div slot="action" @click="onSearch">{{searchText}}</div>
</van-search>
<div class="list">
    <div v-for="(item,index) in list" :key="index" v-html="item" class="item">
    </div>
  </div>
</div>
</template>
<script>
import { Search } from 'vant'
import { debounce, throttle } from '../../utils'
export default {
  name: 'VlpSearch',
  components: {
    [Search.name]: Search
  },
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    realTime: {// 实时查询
      type: Boolean,
      required: false,
      default: false
    },
    searchText: {
      type: String,
      required: false,
      default: '搜索'
    }
  },
  computed: {
    searchValue: {
      set: function(v) {
        this.$emit('input', v)
      },
      get: function() {
        return this.value
      }
    }
  },
  data() {
    return {
      list: [
        '中国撒开绿灯飞机',
        '士大夫中国烧烤',
        '中国'
      ]
    }
  },
  mounted() {
    this.initList()
  },
  methods: {
    initList() {
      this.list = this.list.map(v => {
        v = v.replace(this.searchValue, `<span style="color:red">${this.searchValue}</span>`)
        return v
      })
    },
    onClear() {
      console.log('clear')
    },
    onSearch: debounce(function(evt) {
      this.$emit('search', this.searchValue)
    }, 1000, true),
    showTips: throttle(function(evt) {
      console.log('showTips......', this.searchValue)
    }, 500, { leading: false, trailing: false })

  }

}
</script>
<style lang="less" scoped>
.vlp-search{
  .list{
    border: 1px solid #bfbfbf;
    border-radius: 5px;
    margin: 0 10px;
    height: 250px;
    font-size: 14px;
    .item{
      border-bottom: 1px solid #eeeeee;
      margin-top: 10px;
      width: 95%;
      margin-left: auto;
      margin-right: auto;
      text-align: left;
      text-indent: 16px;

    }
  }
}
</style>

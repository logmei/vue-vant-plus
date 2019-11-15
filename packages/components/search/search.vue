<template>
<div class="vlp-search" v-show="layoutVisible">
  <form action="/">
   <van-search
    v-model.trim="searchValue"
    :placeholder="placeholder"
    show-action
    clearable
    shape="round"
    @search="onSearch"
    @clear="onClear"
    @input="showTips"
    @cancel="onCancel"
    @focus="onFocus"
  >

  <div v-if="!showCancelButton" slot="action" @click="onSearchAction">{{searchText}}</div>
</van-search>
 </form>
<div class="list" v-show="visible">
    <div
    v-for="(item,index) in list"
    :key="index"
    v-html="item"
    class="item"
    @click="chooseOne(item)">
    </div>
  </div>
  <div class="history" v-show="historyVisible">
    <div class="history-top"><span>搜索历史</span><van-icon name="delete" @click="deleteHistory"/></div>
    <div class="history-content">
      <span
    v-for="(item,index) in historyList"
    :key="index"
    @click="chooseOne(item)">{{item}}</span>
    </div>

  </div>
</div>
</template>
<script>
import { Search, Icon } from 'vant'
import { debounce, throttle } from '../../utils'
/**
 * interface的response返回格式：
 * {
 *    code:0,//返回的都是成功的，失败的统一拦截
 *    msg:'',
 *    result:[
 *      '12345',
 *      'aaaaa'
 *    ]
 * }
 */
export default {
  name: 'VlpSearch',
  components: {
    [Search.name]: Search,
    [Icon.name]: Icon
  },
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },
    alias: {
      type: String,
      required: false,
      default: 'value'
    },
    showCancelButton: {
      type: Boolean,
      required: false,
      default: true
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    searchText: {
      type: String,
      required: false,
      default: '搜索'
    },
    tipInterface: {// 提示接口
      type: Function,
      required: false,
      default: undefined
    },
    params: {
      type: Object,
      required: false,
      default: () => {}
    },
    displayVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    historyList: {
      type: Array,
      required: false,
      default: () => []
    },
    autoHidden: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  watch: {
    displayVisible: function() {
      if (this.displayVisible) {
        this.searchValue = ''
        this.historyVisible = true
      }
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
    },
    layoutVisible: {
      set: function(v) {
        this.$emit('update:displayVisible', v)
      },
      get: function() {
        return this.displayVisible
      }
    }
  },
  data() {
    return {
      list: [],
      visible: false,
      historyVisible: true
    }
  },
  mounted() {
    this.initList()
  },
  methods: {
    deleteHistory() {
      this.$emit('deleteHistory')
      this.historyVisible = false
    },
    initList() {
      this.list = this.list.map(v => {
        v = v.replace(this.searchValue, `<span style="color:red">${this.searchValue}</span>`)
        return v
      })
    },
    // 点击清除触发
    onClear() {
      console.log('clear')
      this.clearTipOrEmit()
    },
    // 回车执行
    onSearch: debounce(function(v) {
      console.log('onSearch...........', v)
      if ((v.trim())) {
        this.initTipListOrEmit(v)
      }
    }, 1000, true),
    // 搜索按钮
    onSearchAction: debounce(function(v) {
      console.log('onSearchAction...........', this.searchValue)
      this.initTipListOrEmit(this.searchValue)
    }, 1000, true),
    // 输入内容后触发
    showTips: throttle(function(v) {
      v === '' && this.historyList.length > 0 ? this.historyVisible = true : this.historyVisible = false
      console.log('showTips...........', v, v.trim())
      if ((v.trim())) this.initTipListOrEmit(v)
      else this.clearTipOrEmit()
    }, 1000),
    // 点击取消触发
    onCancel: debounce(function() {
      console.log('cancel............')
      this.clearTipOrEmit()
      this.$emit('cancel')
      if (this.autoHidden) this.layoutVisible = false
    }, 1000, true),
    chooseOne(v) {
      const ele = document.createElement('span')
      ele.innerHTML = v
      console.log('chooseOne', ele.innerText)
      this.$emit('search', ele.innerText)
      this.list = []
      this.visible = false
      this.historyVisible = false
      if (this.autoHidden) this.layoutVisible = false
    },
    // 搜索提示
    showTipList(v) {
      this.tipInterface &&
      typeof this.tipInterface === 'function' &&
      this.tipInterface(this.getParams(v)).then(response => {
        this.list = response && response.result
        this.initList()
        this.visible = true
      })
    },
    // 获取参数
    getParams(v) {
      return { ...this.params, [this.alias]: v }
    },
    // 初始化列表或emit
    initTipListOrEmit(v) {
      this.tipInterface && this.showTipList(v.trim())
      !this.tipInterface && this.$emit('search', v.trim())
    },
    clearTipOrEmit() {
      console.log('clearTipOrEmit.........')
      this.list = []
      this.visible = false
      !this.tipInterface && this.$emit('search', '')
    },
    onFocus() {
      this.searchValue === '' && this.historyList.length !== 0 ? this.historyVisible = true : this.historyVisible = false
    }
  }

}
</script>
<style lang="less" scoped>
.vlp-search{
    position: absolute;
    width: 100%;
    // height: 100%;
    background: #fff;
    top: 0;
    z-index: 1;
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
      cursor: pointer;
    }
  }
  .van-search__action{
    font-size: 14px;
    color:#666666
  }
  .history{
    color: #999999;
    text-align: left;
    font-size: 14px;
    padding: 15px;
    font-family: PingFangSC-Medium,PingFang SC;
    border-radius: 0 0 5px 5px;
    /* border-bottom: 1px solid #6666; */
    box-shadow: 0 1px 1px #928e8e;
    height: 200px;
    overflow: auto;
    .history-top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;

      span:first-child{
        font-size: 16px;
        font-weight: 500;
        color: rgba(51,51,51,1);
        line-height: 22px;
      }
      .van-icon{
        font-size: 18px;
      }
    }
    .history-content{
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:20px;
      span{
        display: inline-block;
        background: rgba(246,246,246,1);
        border-radius: 16px;
        padding: 6px 15px;
        margin-bottom: 10px;
        margin-right: 15px;
      }
    }

  }
}
</style>

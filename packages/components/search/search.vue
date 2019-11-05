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
</div>
</template>
<script>
import { Search } from 'vant'
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
    [Search.name]: Search
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
      visible: false
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
      console.log('showTips...........', v, v.trim())
      if ((v.trim())) this.initTipListOrEmit(v)
      else this.clearTipOrEmit()
    }, 1000),
    // 点击取消触发
    onCancel: debounce(function() {
      console.log('cancel............')
      this.clearTipOrEmit()
      this.layoutVisible = false
    }, 1000, true),
    chooseOne(v) {
      const ele = document.createElement('span')
      ele.innerHTML = v
      console.log('chooseOne', ele.innerText)
      this.$emit('search', ele.innerText)
      this.list = []
      this.visible = false
      this.layoutVisible = false
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
    }
  }

}
</script>
<style lang="less" scoped>
.vlp-search{
    position: absolute;
    width: 100%;
    height: 100%;
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
}
</style>

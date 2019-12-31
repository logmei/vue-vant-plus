<template>
<van-pull-refresh
    :disabled="refreshDisabled"
    :pulling-text="pullingText"
    :loading-text="loadingText"
    :head-height="headHeight"
    v-model="refreshing"
    @refresh="onRefresh()"
        >
  <van-list
    v-model="loading"
    :finished="finished"
    :finished-text="finishedText"
    :error.sync="error"
    :error-text="errorText"
    :loading-text="loadingText"
    :direction="direction"
    :offset="offset"
    :immediate-check="false"
    @load="onLoad"
  >
  <slot v-bind="list">
    <Card
      v-for="(item,index) in list"
      :key="index"
      :card-data="item"
      :label-columns='columns'>
    </Card>
  </slot>
  </van-list>
  <div>

  </div>
 </van-pull-refresh>
</template>
<script>
import { List, Cell, PullRefresh } from 'vant'
import Card from './card.vue'
export default {
  name: 'VlpList',
  props: {
    interfaceFun: {
      type: Function,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    pageSize: {// 每页条数
      type: Number,
      required: false,
      default: 10
    },
    finishedText: {
      type: String,
      required: false
    },
    errorText: {
      type: String,
      required: false,
      default: '请求失败，点击重新加载'
    },
    loadingText: {
      type: String,
      required: false,
      default: '加载中...'
    },
    offset: {
      type: Number,
      required: false,
      default: 5
    },
    direction: {
      type: String,
      required: false,
      default: 'down'
    },
    refreshDisabled: {// 刷新不可用
      type: Boolean,
      required: false,
      default: false
    },
    pullingText: {
      type: String,
      required: false,
      default: '下拉即可刷新...'
    },
    parameter: {
      type: Object,
      required: false,
      default: () => {}
    },
    headHeight: {
      type: Number,
      required: false,
      default: 200
    },
    autoLoad: {
      type: Boolean,
      required: false,
      default: true
    },
    load: {
      type: Boolean,
      required: false,
      default: false
    }

  },
  data() {
    return {
      list: [],
      total: 0, // 总条数
      pageNum: 1, // 当前页
      loading: false,
      finished: false,
      refreshing: false,
      error: false
    }
  },
  watch: {
    parameter: function() {
      this.pageNum = 1
      this.onLoad()
    }
  },
  computed: {
    finishedMsg: function() {
      return this.finishedText || `共找到${this.total}条记录,已无更多`
    },
    listLoad: {
      set(v) {
        if (v) {
          this.pageNum = 1
          this.onLoad()
        }
        this.$emit('update:load', v)
      },
      get() {
        return this.load
      }
    }
  },
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh,
    Card
  },
  mounted() {
    this.autoLoad && this.onLoad()
  },

  methods: {
    onRefresh() {
      setTimeout(() => {
        this.error = false
        this.finished = false
        this.refreshing = false
        this.onLoad(true)
      }, 1000)
    },
    onLoad(isRefresh) {
      if (this.refreshDisabled) return
      // 不可自动加载数据时外部参数没有内容将不查询
      if (!this.autoLoad && Object.keys(this.parameter).length === 0) return
      // const pagenum = this.pageNum + 1
      // if (pagenum > this.total) return
      const params = { pageNum: this.pageNum, pageSize: this.pageSize, ...this.parameter }
      this.interfaceFun(params).then(response => {
        this.listLoad = false
        const result = response.result
        this.total = result.total
        this.list.push(...result.list)
        // 加载状态结束
        this.loading = false
        // 若最后一页将设置完成不再触发加载
        console.log('list...', this.list)
        this.$emit('loaded', { total: result.total, pages: result.pages })
        // this.finished = true
        if (result.pageNum === result.pages) {
          this.finished = true
          this.pageNum = result.pageNum
        } else {
          this.pageNum = result.pageNum + 1
        }
      })
    }

    // onLoad(isRefresh) {
    //   console.log('load.......')
    //   // 异步更新数据
    //   setTimeout(() => {
    //     if (this.isRefresh) {
    //       this.list = []
    //     }
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false
    //     this.finished = true
    //     // 数据全部加载完成
    //     // if (this.list.length >= 100) {
    //     //   this.finished = true
    //     // }
    //   }, 500)
    // }
  }
}
</script>

<template>
  <van-pull-refresh
    v-model="isLoading"
    @refresh="onRefresh"
  >
   <slot></slot>
  </van-pull-refresh>
</template>
<script>
import { PullRefresh } from 'vant'
// import { debounce } from '../../utils'
export default {
  name: 'VlpPullRefresh',
  components: {
    [PullRefresh.name]: PullRefresh
  },
  props: {
    pagination: {// 分页对象
      type: Object,
      required: false,
      default: () => {}
    },
    toastMsg: {
      type: String,
      required: false,
      default: ''
    },
    loading: {
      type: Boolean,
      required: true,
      default: false
    }

  },
  computed: {
    isLoading: {
      set: function(v) {
        this.$emit('update:loading', v)
      },
      get: function() {
        return this.loading
      }
    }
  },
  data() {
    return {
      count: 0
      // isLoading: false
    }
  },
  methods: {
    // onRefresh: debounce(function(evt) {
    //   this.toastMsg && this.$toast(this.toastMsg)
    //   this.isLoading = false
    //   this.count++
    //   this.$emit('onRefresh', this.count)
    //   console.log('onRefresh.................')
    // }, 1000, true)
    onRefresh() {
      setTimeout(() => {
        // this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    }

  }
}
</script>

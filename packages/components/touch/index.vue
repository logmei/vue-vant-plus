<template>
  <div
      class="vlp-touch-class"
      :style="style"
      v-on:touchstart="touchStart"
      v-on:touchmove="touchMove"
      v-on:touchend="touchEnd"
      v-on:touchcancel="touchEnd"
    >
     <slot  v-if="pullDirection==='down'" name="TopText">
       <span class="touch-text">{{loadText}}</span>
      </slot>
      <slot>
      </slot>
       <slot v-if="pullDirection==='up'" name="bottomText">
       <span class="touch-text">{{loadText}}</span>
      </slot>
  </div>
</template>
<script>
import MixinTouch from '../../mixins/touch.js'
import { isBottom, isTop } from './common/scroll.js'
export default {
  name: 'VlpTouch',
  mixins: [
    MixinTouch
  ],
  props: {
    height: {
      type: Number,
      required: false,
      default: 50
    },
    defaultText: {
      type: String,
      required: false,
      default: '上拉加载更多'
    },
    loadingText: {
      type: String,
      required: false,
      default: '加载中....'
    },
    finishedText: {
      type: String,
      required: false,
      default: '已加载完成'
    },
    finished: {
      type: Boolean,
      required: false,
      default: false
    },
    target: [Object, Element],
    pullDirection: {
      type: String,
      required: false,
      default: 'up'
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      style: {
        width: '100%',
        transform: 'translateY(0px)',
        transitionDuration: '0.5s'
      }
    }
  },
  computed: {
    loadText: function() {
      if (this.loading) return this.loadingText
      if (this.finished) return this.finishedText
      return this.defaultText
    },
    touchable: function() {
      return !this.loading && !this.finished
    }
  },
  methods: {
    touchStart(event) {
      console.log('onTouchStart', this.loading)
      this.touchable && this.onTouchStart(event)
    },
    touchMove(event) {
      if (!this.touchable) return
      this.onTouchMove(event)
      if (this.pull()) {
        this.style.transform = `translateY(${this.deltaY}px)`
      }
      // console.log('touchMove', document.getElementById('aa').scrollTop)
    },
    touchEnd(event) {
      if (!this.touchable) return
      // console.log('onTouchEnd', this.upPull())
      this.style.transform = `translateY(0px)`
      this.pull() && this.$emit('load')
    },
    pull() {
      if (this.pullDirection === 'up') {
        return this.upPull()
      } else {
        return this.downPull()
      }
    },
    // 判断是否向上拉
    upPull() {
      return this.direction === 'vertical' && this.deltaY < 0 && isBottom(this.target)
    },
    // 判断是否向下拉
    downPull() {
      return this.direction === 'vertical' && this.deltaY > 0 && isTop(this.target)
    },
    // 判断是否向上拉
    leftPull() {
      return this.direction === 'vertical' && this.deltaY < 0 && isBottom(this.target)
    },
    // 判断是否向下拉
    rightPull() {
      return this.direction === 'vertical' && this.deltaY > 0 && isTop(this.target)
    }
  }

}
</script>
<style lang="less" scoped>
.vlp-touch-class{
  .touch-text{
    font-size:12px;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:17px;
      }
}
</style>

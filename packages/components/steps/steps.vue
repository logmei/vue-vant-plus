<template>
  <div class="vlp-step-class">
    <div class="detail">
      <slot>{{data.title}}</slot>
    </div>
     <div class="line" :style="lineStyle">
    </div>
    <div class="icon">
      <slot name='icon'>
        <van-icon :name="data.icon?data.icon:'warning'"  :style="iconStyle"/>
      </slot>

    </div>

  </div>
</template>
<script>
import { Icon } from 'vant'
export default {
  name: 'VlpSteps',
  components: {
    [Icon.name]: Icon
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    end: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    lineStyle: function() {
      let style = this.end ? { width: 0 } : { width: '1px' }
      if (this.data.style && this.data.style.line) style = { ...style, ...this.data.style.line }
      return style
    },
    iconStyle: function() {
      let style = { fontSize: '20px' }

      switch (this.data.status) {
        case 'wait':
          style = { ...style, color: '#CACACA' }
          break
        case 'pass':
          style = { ...style, color: '#23C2B7' }
          break
        case 'warning':
          style = { ...style, color: '#F77200' }
          break
        default:
          style = { ...style, color: '#CACACA' }
          break
      }
      if (this.data.style && this.data.style.icon)style = { ...style, ...this.data.style.icon }
      return style
    }
  }

}
</script>
<style lang="less" scoped>
.vlp-step-class{
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: left;
  padding: 0 40px 10px;

  .icon{
    display: inline-block;
    position: absolute;
    top: 0px;
    left: 10px;
    z-index: 10;
    .van-icon{
      font-size: 20px;
    }
  }
  .line{
    position: absolute;
    top: 5px;
    left: 20px;
    width: 1px;
    height: 100%;
    background: #ccc;
    z-index: 0;
  }
}
</style>

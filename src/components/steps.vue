<template>
  <div class="vlp-steps-class">
    <vlp-steps :data="item" :end="data.length===(index+1)" v-for="(item,index) in data" :key="index">
      <div class="title">{{item.title}} <span style="color:#23C2B7">{{item.title | filterTitle}}</span></div>
      <div class="detail" v-for="(d,index) in item.list" :key="index">{{d}}</div>
    </vlp-steps>
  </div>
</template>
<script>
import { VlpSteps } from '../../packages'
export default {
  components: {
    VlpSteps
  },
  data() {
    return {
      data: [{
        title: '标题1',
        status: 'warning',
        style: {
          icon: {
            color: '#F77200',
            fontSize: '18px'
          },
          line: {
            background: '#23C2B7'
          }
        },
        list: [
          '告警',
          '2019-03-12 22:12'
        ]
      },
      {
        title: '标题2',
        status: 'pass',
        icon: 'checked',
        style: {
          icon: {
            color: '#23C2B7'
          }
        },
        list: [
          '审核通过',
          '2019-03-15 22:12'
        ]
      },
      {
        title: '标题3',
        checked: 'wait',
        icon: 'warning',
        list: [
          '等待审核',
          '二级审核通过',
          '2019-03-19 22:12'
        ]
      }
      ]
    }
  },
  filters: {
    filterTitle: function(v) {
      return v === '标题1' ? '副标题' : ''
    }
  }
}
</script>
<style lang="less" scoped>
.vlp-steps-class{
  .title{
    font-size:15px;
    font-weight:500;
    color:rgba(102,102,102,1);
    line-height:21px;
    margin-bottom: 10px;
  }
  .detail{
    margin-bottom: 5px;
    font-size: 13px;
    color: #888888
  }
}
</style>

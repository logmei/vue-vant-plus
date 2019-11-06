<template>
  <div class="evaluate_info">
    <div>服务内容确认</div>
    <div class="info_li" v-for="(item,index) in list" :key="index">{{item}}</div>
    <div class="info_switch">以上步骤是否都已完成:</div>
    <div class="info_switch">{{service}}人员是否按约定时间准时到达:</div>
    <div v-if="service==='实施'">
      <div class="info_switch" >备注信息:</div>
      <van-field
        class="info_field"
        v-model="remark"
        rows="2"
        clearable
        autosize
        type="textarea"
        maxlength="500"
        placeholder="请输入备注"
        show-word-limit
      />
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { Field } from 'vant'
Vue.use(Field)
export default {
  name: 'EvaluateInfo',
  props: {
    service: {
      type: String,
      default: '实施'
    }
  },
  data() {
    return {
      remark: '',
      list: ['用户软件安装', '药帮忙账号绑定和控制面板经营需求设置', '系统操作人员及角色设置',
        '原系统数据完整迁移', '设置打印机调整打印方案', '培训系统操作流程', '讲解系统日常注意事项',
        '告知联系方式及问题反馈办法']
    }
  }
}
</script>

<style lang="less" scoped>
.evaluate_info{
  padding: 10px 20px;
}
.info_li{
  font-size: 14px;
  position: relative;
  margin: 5px 0;
  color: #808080;
}
.info_li::before{
  width: 3px;
  height: 3px;
  background: black;
  position: absolute;
  z-index: 9999;
  content: '';
  top: 7px;
  left: -5px;
  border-radius: 5px;
}
.info_switch{
  font-size: 14px;
  margin: 5px 0;
}
.evaluate_info /deep/ .info_field{
  border: 1px solid #ccc;
  padding: 0;
}
</style>

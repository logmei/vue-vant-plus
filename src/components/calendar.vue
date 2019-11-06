<template>
  <div class="mainCalendar">
    <vlp-calendar
    class="calendar"
    ref="Calendar"
    @choseDay="clickDay"
    @isToday="clickToday"
    @changeMonth="changeDate"
    :agoDayHide="limitDate"
    :isShowBtn="isShowBtn"
    :isShowCalendar="isShowCalendar"
    :operatorDate = "operatorDate"
    :markDateMore="markDate"
    >
    <vlp-button class="calBtn">确 定</vlp-button>
    </vlp-calendar>
  </div>
</template>

<script>
import Vue from 'vue'
import VantPlus from '../../packages'
Vue.use(VantPlus)
export default {
  data() {
    return {
      limitDate: '',
      todayDate: '',
      markDate: [],
      isShowBtn: true,
      chDate: '',
      isShowCalendar: true,
      operatorDate: []
    }
  },
  // 时间转10位时间戳
  created() {
    this.limitDate = Math.round((new Date().getTime() - (24 * 60 * 60 * 1000)) / 1000).toString()
  },
  methods: {
    // 调接口获取有待办事项的数据   下期再加mark1
    // getQuery() {
    //   this.markDate = [{ date: '2019/11/01', className: 'mark1' }, { date: '2019/10/29', className: 'mark1' }]
    // },
    clickToday(v) {
      this.todayDate = v
    },
    clickDay(v) {
      if (v.calendarDate !== this.todayDate) {
        this.isShowBtn = true
      } else {
        this.isShowBtn = false
      }
      this.chDate = v.calendarDate
    },
    changeDate(v) {

    }
  }
}
</script>

<style  scoped>
.mainCalendar >>>
  .wh_isToday {
    background-color:#F1F1F1;
    position: relative;
  }
  .mainCalendar >>>
  .wh_isToday::before {
    background-color: transparent;
    content: '今天';
    position: absolute;
    font-size: 2px;
    transform: scale(.8);
    top: -30%;
    color: black;
  }
.mainCalendar >>> .mark1 {
  position: relative;
}
.mainCalendar >>> .mark1::after{
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 100px;
  position: absolute;
  background-color: rgb(255, 217, 0);
  bottom: 24%;
}
.mainCalendar >>> .wh_content_all{
  padding-bottom: 80px;
}
.calendar{
  position: relative;
}
.calBtn{
  position: absolute;
  bottom: 20px;
  left:5%;
  border-radius: 70px;
  width: 90%;
  background: #23C2B7;
  color: #FFFFFF;
}
</style>

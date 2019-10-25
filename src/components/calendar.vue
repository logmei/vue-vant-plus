<template>
  <div>
    <Calendar
      ref="Calendar"
      :markDateMore="arr"
      :markDate="arr2"
      v-on:isToday="clickToday"
      agoDayHide="1530115221"
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
    ></Calendar>
  </div>
</template>
<script>
import Calendar from '../../packages/components/calendar'
export default {
  components: {
    Calendar
  },
  data() {
    return {
      // arr2: ['2018/6/23'],
      arr2: [],
      arr: []
    }
  },
  methods: {
    clickDay(data) {
      console.log('选中了', data) // 选中某天
      this.$toast('选中了' + data)
    },
    clickToday(data) {
      console.log('跳到了本月今天', data) // 跳到了本月
    },
    changeDate(data) {
      this.$toast('切换到的月份为' + data)
      console.log('左右点击切换月份', data) // 左右点击切换月份
    },
    demo() {
      this.$refs.Calendar.ChoseMonth('2018-12-13') // 跳到12月12日选中12月12日
    }
  },
  created() {
    function format(date, index) {
      date = new Date(date)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`
    }
    setTimeout(() => {
      this.arr = [
        { date: '2019/10/28', className: 'mark1' },
        { date: '2019/10/29', className: 'mark1' }
        // {
        //   date: '2019/10/23',
        //   className: 'mark1'
        // },
        // {
        //   date: '2019/10/29',
        //   className: 'mark1'
        // }
      ]
      this.arr.push({
        date: format(new Date(), 15),
        className: 'mark1'
      })
    }, 300)
  }
}

</script>
<style scoped>
h3 {
  text-align: center;
  width: 90%;
  margin: auto;
}
.div {
  margin: auto;
  width: 220px;
  height: 44px;
  line-height: 44px;
  background: #0fc37c;
  color: #fff;
  font-size: 17px;
  text-align: center;
  margin-top: 20px;
}
.wh_container >>> .mark1 {
  /* background-color: orange; */
}
.wh_container >>> .mark2 {
  background-color: blue;
}
.wh_content_item > .wh_isMark {
  background: orange;
}
.wh_container >>> .wh_content_all {
  /* background-color: red; */
}

.wh_container >>> .mark1::after{
  content: '';
  width: 4px;
  height: 4px;
  position: absolute;
  background-color: aqua;
  bottom: 24%;
}
</style>

<template>
  <vlp-touch
  :target="target"
  :loading="loading"
  :finished="finished"
  pullDirection="up"
  @load="load">
    <div
         id="aa"
         style="width:100%;height:500px;overflow:auto">
            <span v-for="(item,index) in data" :key = index>{{item}}<br/>></span>
         </div>
  </vlp-touch>
</template>
<script>
import { VlpTouch } from '../../packages'
export default {
  components: {
    VlpTouch
  },
  data() {
    return {
      target: {},
      data: [],
      loading: false,
      count: 0,
      finished: false
    }
  },
  created() {
    this.data = Array(5).fill('内容')
  },
  mounted() {
    this.target = document.getElementById('aa')
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        console.log('加载。。')
        this.loading = false
        this.count++
        if (this.count === 4) this.finished = true
      }, 1000)
    }
  }
}
</script>

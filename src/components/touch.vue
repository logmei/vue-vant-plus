<template>
  <vlp-touch
  :target="target"
  :loading="loading"
  :finished="finished"
  :error="error"
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
      finished: false,
      error: false
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
      this.error = false
      setTimeout(() => {
        console.log('加载。。')
        this.loading = false
        if (this.count === 3) this.error = true
        this.count++

        if (this.count === 4) this.finished = true
      }, 1000)
    }
  }
}
</script>

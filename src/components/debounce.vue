<template>
  <div>
    <van-button v-debounce type="primary" @click="click">主要按钮</van-button>
  </div>
</template>
<script>
import { Button } from 'vant'
import debounce from '../../packages/directive/debounce'
export default {
  components: {
    [Button.name]: Button
  },
  directives: {
    'debounce': debounce
  },
  methods: {
    click() {
      console.log('button click')
    }
  }
}
</script>

<template>
<div class="buttons-class">
   请输入内容：<input v-model="value" @blur="inputValue" style="width:100px"/>&nbsp;
  <vlp-button type="primary" size="small" :disabled="disabled">默认按钮</vlp-button>
</div>

</template>
<script>
import { VlpButton } from '../../packages'
export default {
  components: {
    VlpButton
  },
  data() {
    return {
      disabled: true,
      value: ''
    }
  },
  methods: {
    inputValue() {
      if (this.value !== '') this.disabled = false
    }
  }
}
</script>
<style lang="less" scoped>
.buttons-class{
  font-size: 15px;
}

</style>

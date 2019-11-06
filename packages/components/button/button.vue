<template>
   <vant-button
   :type="type"
   :size="size"
   :text="text"
   :color="color"
   :icon="icon"
   :tag="tag"
   @click="handleClick"
   @touchstart="handleTouchstart"
   >
     <slot></slot>
   </vant-button>
</template>
<script>
import { Button } from 'vant'
import { debounce } from '../../utils'
export default {
  name: 'VlpButton',
  components: {
    'VantButton': Button
  },
  props: {
    type: {
      type: String,
      require: false,
      default: 'default'
    },
    size: {
      type: String,
      required: false,
      default: 'normal'
    },
    text: {
      type: String,
      required: false,
      default: '111'
    },
    color: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: String,
      required: false,
      default: ''
    },
    tag: {
      type: String,
      required: false,
      default: 'button'
    }

  },
  methods: {
    handleClick: debounce(function(evt) {
      this.$emit('click', evt)
      console.log('click.................')
    }, 1000, true),
    handleTouchstart: debounce(function(evt) {
      this.$emit('touchstart', evt)
      console.log('touchstart.................')
    }, 1000, true)
  }
}
</script>

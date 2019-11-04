<template>
  <List
  :interface-fun="searchList"
  :columns = "columns"
  ></List>
</template>
<script>
import List from '../../packages/components/list/list.vue'
import { cardLabel } from './list.js'
import { searchListObj } from '../api/listPage.js'
export default {
  components: {
    List
  },
  data() {
    return {
      searchList: searchListObj,
      columns: cardLabel
    }
  },
  methods: {
    // 处理数据
    // LabelArray：模板数据结构  DTO：后端返回数据, old:是否使用原来labelArray对象

  }
}
</script>

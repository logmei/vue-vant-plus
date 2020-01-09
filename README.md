# vant-plus
> 针对移动端增加的公共组件库和自定义指令，有些组件是基于vant的增强功能组件
## 安装
```
npm install vant-plus -S
```

### 引入VantPlus
#### 完整引入
```
import Vue from 'vue'
import VantPlus from 'vant-plus'
import 'vant-plus/lib/vant-plus.css'
Vue.use(VantPlus)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

#### 按需引入
  ```
    import {
          Line,//下滑线自定义指令
          FieldTip,//输入框提示上移自定义指令
          VlpButton,//防抖按钮
          VlpCalendar,//日历
          VlpSearch,//增加防抖，节流功能，通过接口自动搜索组件
          VlpList,//下拉刷新，上拉加载，通过接口自动列表组件
          VlpDetail//key:value显示方式组件
    } from 'vant-plus'
    
    Vue.use(Line)
    Vue.use(FieldTip)
    Vue.use(VlpButton)
    Vue.use(VlpCalendar)
    Vue.use(VlpSearch)
    Vue.use(VlpList)
    Vue.use(VlpDetail)
```
## 组件使用说明 
### 搜索组件：vlp-search
 #### 1、引入指令
  ```
  import {VlpSearch} from 'vant-plus'
  ```

   #### 2、局部注册
  ```
  components: {
      VlpSearch
    }
  ```
   #### 3、全局注册
  ```
  Vue.use(VlpSearch)
  ``` 
  #### 4、属性
  | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| value  | 绑定数据  |  | true | |
| alias  | 查询数据时的参数名 | String| false | value |
| showCancelButton  | 是否显示取消 | Boolean  | false | true|
| placeholder | placeholder | String | false | |
| searchText | 不显示取消时的按钮label | String | false | '搜索'|
| tipInterface | 查询接口 | Function | false | |
| params | 查询接口需要的其他参数 | Object | false | |
| displayVisible | 是否显示 | Boolean | false | false|
| historyList | 历史记录 | Array | false | []
| autoShowHistory | 是否默认显示历史记录 | Boolean | false | false
| autoHidden | 是否自动隐藏该搜索框 | Boolean | false | true
 #### 5、事件
  | 事件名 | 说明 | 参数 |
|------|------------|------------|
| search  | 查询  | value |

 #### 6、使用示例
```html
 <vlp-search
   class="search-class"
   v-model="searchValue"
   :tipInterface="searchListInterface"
   placeholder="搜索名称"
  :historyList="historyList"
  :autoHidden="false"
  :displayVisible = "true"
  :autoShowHistory="true"
  @search="searchFun"
  @cancel="cancel"
  @deleteHistory="deleteHistory">
   </vlp-search>
```
```js
import {  VlpSearch } from 'vant-plus'
export default {
  components: {
    VlpSearch
  },
  data() {
    return {
      searchListInterface: searchList,
      searchValue: '',
      visible: false,
      historyList: ['中国', '阿斯利康大家发生的'],
    }
  },
  methods: {
   searchFun(v) {
      this.parameter = { name: v }
      console.log('searchFun', v)
    },
    cancel() {
      this.$router.go(-1)
    },
    deleteHistory() {
      this.historyList = []
    }
  }
}
```
 ### 列表组件：vlp-list
 > 支持下拉刷新，上拉加载，传入接口可以自动查询，list子项中留有插槽，可以设置自定义cart显示list中的内容.
 > 不可自动加载数据时外部参数没有内容将不查询
 #### 1、引入指令
  ```
  import {VlpList} from 'vant-plus'
  ```

   #### 2、局部注册
  ```
  components: {
      VlpList
    }
  ```
   #### 3、全局注册
  ```
  Vue.use(VlpList)
  ``` 
  #### 4、属性
  | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| interfaceFun  | 接口  | Function | true | |
| columns  | 对应列 | Array| true |  |
| pageSize  | 每页条数 | Number  | false | 10 |
| parameter | 接口其他参数 | Object | false | |
| finishedText | 完成提示 | String | false | |
| errorText | 失败提示 | String | false | |
| loadingText | 加载中提示 | String | false | |
| offset | 滚动条与底部距离小于 offset 时触发load事件 | Number | false | 5|
| direction | 滚动触发加载的方向，可选值为up | String | false | 'down' |
| refreshDisabled | 禁用刷新 | Boolean | false | false |
| pullingText | 下拉过程文案 | String | false | |
| autoLoad | 自动加载 | Boolean | false | false |
| load | 触发list重新加载数据(true:重新加载，false:不重新加载) | Boolean | false | false |
* interfaceFun接口返回的数据格式
{
  code:0//返回码
  msg:''//返回的信息
  result:{//返回的结果
    pageNum:1,//当前页
    total:10,//总条数
    list:[],//列表数据
    pages:1//共几页
  }
}
* 搜索时，建议设置：autoLoad=false
#### 5、插槽slot
| 参数 | 说明 |
|------|------------|------------|----------|----|
| list  | 通过接口查询返回的结果 |
 #### 6、使用示例

```html
 <vlp-list
  :interface-fun="searchList"
  :columns = "columns"
  :parameter = "parameter"
  >
   <template v-slot="list">
      <Card v-for="(item,index) in list" :key="index" :card-data="item" :label-columns='columns'>
      </Card>
    </template>
  </vlp-list>
```
```js
import {  VlpList } from 'vant-plus'
import LabelColumns from 'columns'
import Card from '../components/card'
export default {
  components: {
    VlpList,
    Card
  },
  data() {
    return {
      searchListInterface: searchList,
      searchValue: '',
      visible: false,
      columns:LabelColumns,
      parameter:{id:1}
    }
  },
  methods: {
    searchFun(v) {
      console.log('searchFun...', v)
    }
  }
}
```
#### 7、对应字段格式
 
  | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| name  | 对应返回数据的字段名称  | String | false | |
| alias  | 生成新对象的别名 | String| false |  |
| className  | 样式名称 | String  | false |  |
| list | 存在list数据显示成详细，alias为list | Array | false | |
| callback | 回调函数 | Function | false | |
| tip | 提示 | Array | false | |


```js
//columns.js
// card
const cardLabel = [
  { name: 'actiontype', alias: 'tip', className: 'tip1' },
  { name: 'name', alias: 'title' ,tip:[`<span style='color:red'>tip</span>`]},
  { name: 'type', alias: 'subtitle', className: 'subtitle1' },
  { alias: 'list',
    list: [
      { label: '单号', name: 'actiontype' },
      { label: '日期', name: 'date' }
    ]
  },
  { alias: 'buttons',
    list: [
      { label: '去预约',
        callback: function(params){
          this.$router.push({ path: '/HelloWorld', params: params})
        }
      },
      { label: '重新派单',
        callback: function(params) {
          this.$router.push({ path: '/HelloWorld', params: params})
        }
      }
    ] }
]

export default {
  cardLabel
}

export {
  cardLabel
}

```
```js
//interface.js

export function ListObj(params) {
  console.log('searchListObj', params)
  return new Promise(resolve => {
    resolve({
      code: 0,
      msg: 'success',
      result: {
        pageNum: 1,
        pageSize: 10,
        pages: 1,
        total: 5,
        list: [
          {
            actiontype: '任务1',
            name: '安徽牛肉拉面',
            type: '微辣',
            danhao: 'SS2019091100001',
            date: 1572331173000

          },
          {
            actiontype: '维护2',
            name: '大盘鸡鸡蛋面',
            type: '不辣',
            danhao: 'SS2018091100001',
            date: 1572331100000

          },
          {
            actiontype: '任务3',
            name: '大盘鸡鸡蛋面3',
            type: '不辣',
            danhao: 'SS2019091100001',
            date: 1572331173000

          },
          {
            actiontype: '维护4',
            name: '大盘鸡鸡蛋面4',
            type: '微辣',
            danhao: 'SS2018091100001',
            date: 1572331100000

          },
          {
            actiontype: '任务5',
            name: '大盘鸡鸡蛋面5',
            type: '不辣',
            danhao: 'SS2019091100001',
            date: 1572331173000

          },
        ]
      }
    })
  });
}

```

### 搜索组件：vlp-detail
 #### 1、引入指令
  ```
  import {VlpDetail} from 'vant-plus'
  ```

   #### 2、局部注册
  ```
  components: {
      VlpDetail
    }
  ```
   #### 3、全局注册
  ```
  Vue.use(VlpDetail)
  ``` 
  #### 4、属性
  | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| data  | 显示数据  | Array | true | |
#### 5、数据格式
[
  {label:'姓名',name:'name',value:'',tip:['<span style="color:red">tip</span>']}//若存在tip增加tip的html内容
]

 #### 6、使用示例
 ```html
 <vlp-detail :data="data"></vlp-detail>
 ```
 ```js

 import {  VlpDetail } from 'vant-plus'
 export default {
  name: 'VlpCard',
  components: {
    Detail
  },
  data(){
    return {
      data:[
        {label:'姓名',name:'name',value:'姓名',tip:['<span style="color:red">tip</span>']},
        {label:'性别',name:'sex',value:'性别',tip:['<span style="color:red">tip1</span>']}
      ]
    }
  }
 }
 ```
 ### 处理对应字段方法handleListInfo
 
  | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| LabelArray  | 模板数据结构  | Array | true | |
| DTO  | 后端返回数据 | Object| true |  |
> 处理方法
```js
  import {handleListInfo,VlpDetail} from 'vant-plus'
  import LabelColumns from 'cloumns.js'
  const cardData = {
            actiontype: '安装任务1',
            name: '北京房朝阳区一店1',
            type: '药店',
            danhao: 'SS2019091100001',
            date: 1572331173000

          }
  export default {
  components: {
    VlpDetail
  },
  data() {
    return {
      data: {}
    }
  },
  beforeMount() {
    this.data = handleListInfo(LabelColumns, cardData)
    // console.log('beforeMount cardData...', this.data)
  }

}
  handleListInfo(cardLabel,DTO)
```

### 防抖按钮：vlp-button
 #### 1、引入指令
  ```
  import {VlpButton} from 'vant-plus'
  ```

   #### 2、局部注册
  ```
  components: {
      VlpButton
    }
  ```
   #### 3、全局注册
  ```
  Vue.use(VlpButton)
  ``` 
   #### 4、属性
   | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| type  | 类型，可选值为 primary info warning danger  | String | false | 'default' |
| size  | 尺寸，可选值为 large small mini | String| false | 'normal' |
| text  | 按钮文字  | String | false | |
| color  | 按钮颜色，支持传入linear-gradient渐变色 | String| false |  |
| icon  | 左侧图标名称或图片链接  | String | false | |
| tag  | HTML 标签 | String| false |  |
   #### 5、事件
  | 参数 | 说明 | 类型 |
|------|------------|------------|----------|----|
| click  | 点击  | 
 #### 6、插槽
  | 参数 | 说明 | 类型 |
|------|------------|------------|----------|----|
| slot  | 按钮直接的内容 | 

 #### 7、使用示例

```html
<vlp-button @click="click">查询</vlp-button>
```
```js
import {  VlpButton } from 'vant-plus'
export default {
  components: {
    VlpButton
  },
  methods: {
    click() {
      console.log('click...')
    }
  }
}
```
### 日历组件：vlp-calendar
 #### 1、引入指令
  ```
  import {VlpCalendar} from 'vant-plus'
  ```

   #### 2、局部注册
  ```
  components: {
      VlpCalendar
    }
  ```
   #### 3、全局注册
  ```
  Vue.use(VlpCalendar)
  ``` 
   #### 4、属性
   | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| agoDayHide  | 某个日期以前的不允许点击  时间戳10位  | String | false |  |
| isWeek | 是否显示周几 | Boolean | true
| propWord | 可传入内容 (周、星期) | String | '周'
| isShowBtn  | 左上角是否显示'回今天'按钮 | Boolean| false | false |
| todayBack | 可传入按钮显示值，只有isShowBtn为true时支持| String| false|'回今天'
| isShowCalendar  | 控制日历的显示和隐藏  | Boolean | false | false |
| operatorDate  | 入口，可以自定义某个日期，只支持一个日期，格式为'2019-11-24' | String| false | '' |
| markDateMore  | 如果需要某月的几天被标注，传当月的日期数组。如["2018/2/2","2018/2/6"]被会标注（相同的标记） | Array | false | |
| markDate | arr=['2018/4/1','2018/4/3'] 标记4月1日和4月3日 简单标记    | Array| false |  |
   #### 5、事件
  | 参数 | 说明 | 类型 |
|------|------------|------------|----------|----|
| choseDay  | 选中某天调用的方法，返回选中的日期 YY-MM-DD  | 
| isToday  | 切换月份的时候，如果切到当前月份，调用这个方法，返回当前月今天  | 
| changeMonth  | 切换月份调用的方法，返回切换到某月的日期 YY-MM-DD  | 

 #### 6、使用示例

```html
<vlp-calendar
    ref="Calendar"
    @choseDay="clickDay"
    @isToday="clickToday"
    @changeMonth="changeDate"
    :agoDayHide="limitDate"
    :isShowBtn="isShowBtn"
    :isShowCalendar="isShowCalendar"
    :operatorDate = "operatorDate"
    :markDateMore="markDate"
    :todayBack="按钮内容"
    :isWeek="false"
    />
```
```js
import {  VlpCalendar } from 'vant-plus'
export default {
  components: {
    VlpCalendar
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
```

### 步骤组件：vlp-steps
 #### 1、引入指令
  ```
  import {VlpSteps} from 'vant-plus'
  ```

   #### 2、局部注册
  ```
  components: {
      VlpSteps
    }
  ```
   #### 3、全局注册
  ```
  Vue.use(VlpSteps)
  ``` 
  #### 4、属性
  | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| data  | 显示数据  | Object | true | |
| end  | 是否最后一个节点  | Boolean | false | false |
#### 5、data属性说明
  | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| title  | 主标题  | String | true | |
| status  | 当前状态（wait,pass,warning）,也可以自定义style样式来设置状态样式  | String | false | wait |
| icon  | 图标名称  | String | false | 'warning'默认使用vant-icon中的名字 |
| style  | 设置样式  | Object | false | |
* style中可以设置line和icon的样式如：
```js
  style: {
      icon: {
        color: '#F77200',
        fontSize:'18px'
      },
      line: {
        background:'#23C2B7'
      }
  }
```
 #### 6、使用示例
 ```html
    <vlp-steps :data="item" :end="data.length===(index+1)" v-for="(item,index) in data" :key="index">
      <div class="title">{{item.title}} <span style="color:#23C2B7">{{item.title | filterTitle}}</span></div>
      <div class="detail" v-for="(d,index) in item.list" :key="index">{{d}}</div>
    </vlp-steps>
 ```
 ```js

import {  VlpSteps } from 'vant-plus'
 export default {
  name: 'VlpSteps',
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
 }
 ```

### 步骤组件：vlp-touch
> 上下滑动触发加载
 #### 1、引入指令
  ```
  import {VlpTouch} from 'vant-plus'
  ```

   #### 2、局部注册
  ```
  components: {
      VlpTouch
    }
  ```
   #### 3、全局注册
  ```
  Vue.use(VlpTouch)
  ``` 
  #### 4、属性
  | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| target  | 用于判断是否触及顶部或底部的目标对象  | Element | true | |
| loading  | 是否加载中false:未加载，true:加载中  | Boolean | false | false |
| finished  | 是否加载完成：true为加载完成，将不再触发加载  | Boolean | false | false |
| error  | 是否出错  | Boolean | false | false |
| pullDirection  | 滑动方向up:向上滑动，down：向下滑动  | String | false | 'up' |
| defaultText  | 默认提示文字  | String | false | '上拉加载更多' |
| loadingText  | 加载中提示文字  | String | false | '加载中....' |
| finishedText  | 加载完成提示文字  | String | false | '已加载完成' |
| errorText  | 加载完成提示文字  | String | false | '加载失败，请点击重新加载' |
  #### 5、事件
  | 参数 | 说明 | 类型 | 是否必填| 默认值|
|------|------------|------------|----------|----|
| load  | 上拉加载或点击报错时候的信息时触发  | function |  | |

 #### 6、使用示例
 ```html
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
 ```
 ```js

import {  VlpTouch } from 'vant-plus'
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
    this.data = Array(50).fill('内容')
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
        if (this.count === 3) this.error = true
        this.count++
        if (this.count === 4) this.finished = true
      }, 1000)
    }
  }
 }
 ```

<template>
  <div id="app">
    <el-radio-group v-model="radio" @input="router_to">
      <el-radio-button label="观影记录"></el-radio-button>
      <el-radio-button label="详情IMDb/电影大全列表"></el-radio-button>
      <el-radio-button label="我的收藏"></el-radio-button>
      <el-radio-button label="系列电影"></el-radio-button>
      <el-radio-button label="演员电源关系图"></el-radio-button>
    </el-radio-group>
    <el-radio-group v-model="radio" @input="router_to" style="margin-left: 10px;">
      <el-radio-button label="期待事项清单"></el-radio-button>
      <el-radio-button label="GAME游玩记录"></el-radio-button>
      <el-radio-button label="待购买GaneList"></el-radio-button>
    </el-radio-group>
    <!-- 卡片容器（测试） -->
    <!-- <com_test msg="Welcome to Your Vue.js App"/> -->
    <!-- 卡片样式1 -->
    <!-- <card_styleItems></card_styleItems> -->
    <!-- 卡片样式2 -->
    <!-- <card_styleItems_2></card_styleItems_2> -->
    <router-view style="margin-top: 10px;"></router-view>
  </div>
</template>

<script>
// yarn add vue - router@4.*
//   或
// npm install - save vue - router@4.*

// import com_test from './components/com_test.vue'
// import card_styleItems from './components/card_styleItems.vue'
// import card_styleItems_2 from './components/card_styleItems_2.vue'

export default {
  name: 'app',
  components: {
    // com_test,
    // card_styleItems,
    // card_styleItems_2,
    // CardContainer
  },
  data() {
    return {
      radio: '期待事项清单',
    }
  },
  created() {
    this.router_to()
  },
  methods: {
    router_to() {
      let obj = {
        '期待事项清单': 'card_container',
        'GAME游玩记录': 'game_list',
        '待购买GaneList': 'game_shoppingList',
        '观影记录': 'movieCardNew',
        '详情IMDb/电影大全列表': 'moive_list',
        '我的收藏': 'collect',
        '系列电影': 'Marvel',
        '演员电源关系图': 'moive_dag',
      }
      this.$router.push(obj[this.radio] ? obj[this.radio] : 'not_found')
    },
  }
}
</script>

<style></style>
